# Design: Shell → TypeScript Consolidation + Full Report Fixes

> Ngày: 2026-06-07 · Trạng thái: Approved (architecture + scope) · Tác giả: review-driven
> Bối cảnh nguồn: [PROJECT_REVIEW_2026-06-07.md](../../internal/reports/PROJECT_REVIEW_2026-06-07.md)

## 1. Mục tiêu

1. **Xóa toàn bộ shell** (`aih.sh`, `aih.ps1`, `install.sh`, `install-secure.sh`, `aih.sh.sha256`) và hợp nhất toàn bộ logic vào TypeScript chạy in-process trên Node.
2. **Fix toàn bộ** issue P0–P3 từ report review trong cùng đợt.

## 2. Quyết định đã chốt

- **Remote no-npm install**: BỎ. Chỉ giữ `npx`/`npm` (Node đã là bắt buộc vì CLI là TS). Loại bỏ `download_pack_root` và bootstrap `curl|sh`.
- **`aih.ps1`**: XÓA. Windows chạy native qua Node, bỏ `findSh`/`SH_MISSING`/spawn `sh`.
- **Phạm vi**: Migrate shell→TS + fix tất cả P0–P3.

## 3. Tình trạng hiện tại (đã trace)

Luồng install hiện tại là sandwich Node→shell→Node:

```
bin/aih.js → dist/lib/cli-main.js → cli-backend.runAihSh() → sh aih.sh
   → node dist/lib/install-cache.js | install-runtime.js | install-legacy.js | command-surface-report.js
```

Tầng wizard TS (`cli-commands/install.ts`, `update.ts`, `uninstall.ts`, `diagnostics.ts`) ĐÃ lo: validate target, chọn provider, mode/scope/visibility, dựng plan (`buildInstallPlan`), confirm prompts — rồi gọi `aih.sh --yes` (non-interactive) chỉ để thực thi backend.

Phần logic **chỉ có trong `aih.sh`** (cần port):
- Git hygiene: `build_exclude_block_content`, `append_or_update_info_exclude_block`, `remove_info_exclude_block`, `apply_private_ignore`, `print_manual_ignore_instructions`.
- Install orchestration: `run_runtime_native_install`, `run_manual_install`, `run_capability_cache_install` (đa phần spawn `node` gọi TS đã có).
- Uninstall: `runtime_paths_for_uninstall`, `remove_file_if_harness_owned`, `remove_dir_if_requested`, `file_contains_harness_marker`, `run_uninstall`.
- Update: `run_update`, `apply_update_defaults`, `resolve_update_git_hygiene_settings`.
- Status/doctor: `print_status`, `run_doctor`, `workflow_phase_line`, `print_workflow_summary`, `doctor_plan_status`, `doctor_verify_*` (gọi `command-surface-report.js`).
- Harness skeleton: `init_harness_profile`, `harness_skeleton_*` (sinh `.harness/*.md`).

Phần copy-file/deep-merge nặng ĐÃ ở TS: `install-runtime.ts`, `install-legacy.ts`, `install-cache.ts`.

Phần interactive shell (`pick_*_interactive`, `confirm_plan`, `print_install_plan`) là REDUNDANT với wizard TS → xóa, không port.

## 4. Kiến trúc đích

### 4.1 Module backend mới (in-process)

```
lib/backend/
├── git-hygiene.ts          # info/exclude block mgmt + apply/remove private ignore
├── install-orchestrator.ts # gọi installRuntime/install-legacy/install-cache như hàm (không spawn)
├── uninstall.ts            # path resolution, harness-owned marker check, remove file/dir
├── update.ts               # update flow
├── status-doctor.ts        # status + doctor reporting (wrap command-surface-report)
└── harness-skeleton.ts     # init harness profile + skeleton .harness/*.md
```

Mỗi module:
- **Một trách nhiệm rõ ràng**, interface thuần TS (nhận context object, trả result object/throw lỗi có `code`).
- Test độc lập được (không spawn process, dùng tmp dir).

### 4.2 Thay đổi `cli-backend.ts` & `cli-commands/*`

- Xóa `findSh`, `runAihSh`, `SH_MISSING_MSG`, `packRootFromModule` giữ lại.
- `buildInstallArgs`/`buildUpdateArgs`/`buildUninstallArgs` (dựng mảng args cho shell) → đổi thành builder trả **context object** truyền thẳng vào hàm orchestrator.
- `cli-commands/install.ts|update.ts|uninstall.ts|diagnostics.ts`: thay `runAihSh(...)` bằng gọi hàm backend trực tiếp; giữ nguyên tầng UI (`@clack` spinner/plan/confirm).
- Bỏ alias nội bộ `--runtime`; thống nhất `provider`.

### 4.3 Files xóa & cập nhật

- **Xóa**: `aih.sh`, `aih.sh.sha256`, `aih.ps1`, `install.sh`, `install-secure.sh`.
- **Cập nhật**: `package.json` `files[]` (bỏ entry shell); `README.md` (Quickstart, Maintainers, Limitations — bỏ curl|sh, làm rõ Windows native); `docs/install-*.md`, `docs/consume-as-pack.md`, `docs/consumption-modes.md` (bỏ remote no-npm).

## 5. Lưới an toàn parity (bắt buộc)

- **Baseline trước migration**: chạy `test/run-tests.js` (spawn `bin/aih.js` trên repo git tạm cho install/uninstall/update/status/doctor) và lưu output tham chiếu.
- **Sau migration**: cùng bộ test phải xanh; output hành vi tương đương (file tạo/xóa, git exclude block, exit codes).
- Test reference `aih.sh` (vd `cli-command-wizards.test.js` "runStatusOrDoctor forwards status to aih.sh") viết lại cho path in-process.
- Điều kiện done đợt A: `npm test` + `tsc -p tsconfig.lib.json` xanh, `grep -rn aih.sh` = 0 (ngoài CHANGELOG lịch sử).

## 6. Bundling fix P0–P3

| ID | Fix | Cách làm |
| --- | --- | --- |
| P0a | CI gãy | `ci.yml`: `node validate.js` → `node bin/validate.js`; bỏ `shell: bash` smoke install; guard test CI-scripts khớp package.json |
| P0b | Coverage gate | Backend in-process → test trực tiếp; nâng test `lib/backend/*` + `cli-commands/*`; đặt lại ngưỡng đúng thực tế + sửa badge README |
| P1a | Eval honesty | "proof" → "regression framework"; report output tách `synthetic-fixture` vs `live`; cập nhật README + docs/evals.md |
| P1b | Policy engine | Gộp `guard-phase-policy.js`→`guard-phase.js`; wire provider settings; provision `.harness/policies.json` mặc định khi init; generate `docs/policies.md` trong CI |
| P2a | Lint lib/ | Thêm `@typescript-eslint`, mở rộng `lint` → `lib/**/*.ts` |
| P2b | Doc GC | Gom v0.x readiness/plan/release-notes vào archive; cập nhật docs install lỗi thời |
| P3 | Windows/thuật ngữ | Giải quyết nhờ migration (native Node); thống nhất `--provider`; ghi chú policies.json trusted input (ReDoS) |

## 7. Chiến lược thực thi (subagent)

**Đợt A — tuần tự, 1 subagent (foundational, đụng file dùng chung):**
Toàn bộ migration shell→TS + cập nhật test parity + xóa file shell + P3.
Gate: `npm test` + `tsc` xanh, 0 shell.

**Đợt B — song song, nhiều subagent (tập file rời nhau):**
- B1: P0a (CI) + P2a (lint lib/) — `.github/`, `.eslintrc`, `package.json`
- B2: P1a (eval honesty) — `README`, `docs/evals.md`, `lib/evals/reporter.ts`
- B3: P1b (policy wiring) — `hooks/`, provider settings, skeleton, CI policy-docs
- B4: P2b (doc GC) — `docs/`

**Chốt cuối:** P0b coverage re-baseline + badge → verification-before-completion (full suite).

```
A → gate(npm test+tsc, 0 shell) → B1‖B2‖B3‖B4 → P0b → verify
```

## 8. Rủi ro & giảm thiểu

- **Mất parity hành vi** (git exclude block format, uninstall marker) → baseline test + so output từng lệnh.
- **Mất đường remote install của user hiện hữu** → ghi rõ breaking change trong CHANGELOG + release notes; npx là thay thế.
- **Subagent B chạm chéo file** → ranh giới file đã phân tách; nếu nghi ngờ, hạ về tuần tự.
- **Coverage tụt do thêm code** → P0b chốt cuối, viết test cho backend mới trong đợt A.

## 9. Out of scope

- Nối eval vào agent API thật (chỉ làm honesty wording + tách synthetic/live; live runner để roadmap sau).
- Refactor không liên quan tới việc xóa shell.
