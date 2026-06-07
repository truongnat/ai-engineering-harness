# Project Review — ai-engineering-harness

> Ngày review: 2026-06-07 · Phiên bản: v1.0.1 · Branch: `main`
> Phạm vi: kiến trúc, code (`lib/`, `aih.sh`, hooks), eval/insights/policy subsystems, CI/CD, docs, security, đa nền tảng.
> Phương pháp: đọc mã nguồn trực tiếp + chạy `npm test`, `tsc`, `c8` coverage, trace luồng gọi thực tế.

---

## 1. Tóm tắt điều hành (Executive Summary)

`ai-engineering-harness` là một bộ "guardrail" markdown-first cho AI coding agents, kiến trúc rõ ràng, tài liệu phong phú, test suite chạy xanh (177 pass) và typecheck sạch. Triết lý "không runtime nặng, markdown là database" được thực thi nhất quán và là điểm mạnh thật sự.

Tuy nhiên review sâu phát hiện **một số gap nghiêm trọng giữa "tuyên bố" và "thực tế vận hành"**, tập trung ở 3 chỗ:

1. **CI đang gãy** — workflow gọi một entrypoint đã bị xóa (`node validate.js`).
2. **Coverage gate đang fail** — ngưỡng functions 65% nhưng thực tế 63%; README quảng cáo "65%+".
3. **Hai hệ thống "bằng chứng & enforcement" cốt lõi (evals và policy engine) chưa thực sự chứng minh điều chúng tuyên bố** — eval A/B là fixture dàn sẵn, policy engine TS gần như ngủ đông với người dùng cuối.

Đây là sản phẩm tốt về kỹ thuật nền nhưng đang ở trạng thái "marketing đi trước reality". Ưu tiên số 1 là **sửa CI/coverage** và **trung thực hóa các tuyên bố eval/policy** (hoặc hoàn thiện chúng).

| Hạng mục | Trạng thái |
| --- | --- |
| Build / Typecheck (`tsc -p tsconfig.lib.json`) | ✅ Pass |
| Test suite (`npm test`) | ✅ 177 pass / 0 fail |
| Coverage gate (`npm run test:coverage`) | ❌ **FAIL** (functions 63% < 65%) |
| CI workflow `.github/workflows/ci.yml` | ❌ **Gãy** (gọi `node validate.js` không tồn tại) |
| Eval A/B "bằng chứng" | ⚠️ Fixture dàn sẵn, không đo agent thật |
| Policy engine (TS) end-to-end | ⚠️ Wired nhưng dormant với consumer |
| Phụ thuộc runtime | ✅ Chỉ 1 (`@clack/prompts`) |
| Đa nền tảng | ⚠️ Windows phụ thuộc Git Bash; `aih.ps1` không parity |

---

## 2. Bản đồ kiến trúc thực tế (như đang chạy)

Tài liệu mô tả 8 layer markdown-first. Khi trace luồng thực thi, kiến trúc **runtime** thực sự là một sandwich 3 lớp Node → shell → Node:

```
bin/aih.js
  └─> dist/lib/cli-main.js              (TypeScript CLI: parse args, wizard UI @clack)
        └─> cli-backend.runAihSh()      (spawn `sh aih.sh ...`)
              └─> aih.sh (2167 dòng)    (toàn bộ logic install/update/uninstall/status/doctor)
                    └─> node dist/lib/install-cache.js
                    └─> node dist/lib/install-runtime.js
                    └─> node dist/lib/install-legacy.js
                    └─> node dist/lib/command-surface-report.js
```

**Quan sát:** lệnh `install` đi từ Node (cli-main) → shell (aih.sh) → quay lại Node (install-*.js). `aih.sh` đóng vai "orchestrator" còn logic nghiệp vụ chia đôi giữa shell và TS. Đây là nguồn gốc của phần lớn nợ kỹ thuật bên dưới (xem §4.4).

Các subsystem khác (`eval`, `insights`, `init`) chạy thẳng trong TS, **không** qua `aih.sh` — tức là có hai phong cách dispatch song song trong cùng một CLI.

---

## 3. Điểm mạnh (giữ nguyên, đừng phá)

- **Triết lý markdown-first nhất quán** — artifacts nằm trong git, review được trong PR, không lock-in. Đây là khác biệt thật so với "prompt pack".
- **Bề mặt phụ thuộc cực nhỏ** — chỉ `@clack/prompts` ở runtime. Rất tốt cho bảo mật chuỗi cung ứng và tốc độ cài.
- **Bootstrap installer có kiểm tra toàn vẹn** — `install.sh` tải `aih.sh` + `aih.sh.sha256` và verify SHA-256 trước khi `exec` (hỗ trợ `sha256sum`/`shasum`/`openssl`). Đây là điểm sáng bảo mật so với `curl | bash` thông thường.
- **Test suite có chiều sâu hành vi** — không chỉ unit; có test "validate phải fail khi tài liệu mất section X", chống regression tài liệu (docs-sprawl, session-start, readme-landing).
- **Migration TypeScript + JSDoc + `index.d.ts`** cho trải nghiệm consumer tốt.
- **Trung thực về provider tiers** — README nói thẳng Claude là path mạnh nhất, các provider khác cần manual setup. Hiếm dự án dám hạ kỳ vọng như vậy.
- **0 `@ts-ignore` "ẩn"**: thực tế có một vài `@ts-ignore` trong `lib/evals/ab-runner.ts` cho cross-module type — có chú thích lý do, chấp nhận được.

---

## 4. Vấn đề nghiêm trọng & Gaps

### 4.1 🔴 CI gọi entrypoint đã bị xóa — workflow gãy

`.github/workflows/ci.yml` (step "Validate pack contracts"):

```yaml
- name: Validate pack contracts
  run: node validate.js
```

Nhưng root shim `validate.js` **đã bị xóa có chủ đích** — `test/root-shim-removal.test.js` assert rằng `validate.js`, `install.js`, `install-cache.js`, `install-runtime.js` **không được tồn tại** ở root. Lệnh đúng hiện tại là `node bin/validate.js` (xem `package.json` script `validate`).

→ Step CI này sẽ fail với "Cannot find module 'validate.js'" trên mọi OS/Node trong matrix. CI badge trong README không phản ánh trạng thái thật.

**Sửa:** đổi CI thành `node bin/validate.js` (hoặc `npm run validate`). Thêm test/guard để CI script luôn trùng với `package.json` scripts.

### 4.2 🔴 Coverage gate đang fail nhưng README quảng cáo "65%+"

`npm run test:coverage` (ngưỡng lines/functions/statements 65%, branches 55%):

```
All files       | 71.22 stmt | 63.54 br | 63.00 func | 71.22 lines
ERROR: Coverage for functions (63%) does not meet global threshold (65%)
```

- Badge README: `coverage-lib 65%+` — **sai sự thật** ở thời điểm hiện tại.
- Vùng trũng: `lib/` (top-level) chỉ **41% functions**, `lib/cli-commands` **32% branches** — vì chúng là wrapper mỏng quanh `aih.sh` nên rất khó test bằng unit.
- CI có step coverage (chỉ chạy trên ubuntu/node20) → step này cũng đang đỏ cùng với 4.1.

**Sửa:** hoặc nâng test cho `cli-commands`/`cli-*` (mock `runAihSh`), hoặc hạ ngưỡng functions xuống đúng thực tế và cập nhật badge. Đừng để badge nói dối.

### 4.3 🟠 Eval A/B: "bằng chứng" là fixture dàn sẵn, không đo agent thật

README quảng cáo điểm bán hàng cốt lõi: *"Deterministic evals (`aih eval`) with A/B reports"* — ngụ ý chứng minh harness cải thiện kết quả.

Trace thực tế (`lib/evals/ab-runner.ts` → `mode-mutations.ts` → `scoring.ts`):

- `runMode("with-harness")` và `runMode("without-harness")` **không chạy AI agent nào**. Provider mặc định là `"deterministic-local"`.
- Sự khác biệt giữa hai mode hoàn toàn đến từ `evals/mutations/registry.json` — các **file kết quả viết tay sẵn**: mode `with-harness` được ghi `src/math.js` đã-sửa-đúng + `final-response.txt` thành công; mode `without-harness` chỉ ghi `final-response.txt` = "Attempted task without harness."
- Metrics "tiết kiệm bước" cũng **hardcode**: `"withHarnessSteps": 3, "withoutHarnessSteps": 7/8` trong registry — không phải đo lường.

→ Kết quả A/B mang tính **vòng lặp tự khẳng định (circular)**: fixture được tạo ra để with-harness luôn thắng. Đây là một *harness/scaffold* để CHẠY eval trong tương lai, **chưa phải bằng chứng** rằng harness cải thiện outcome.

- `lib/evals/llm-judge.ts` có gọi LLM judge thật qua `EVAL_JUDGE_ENDPOINT` (HTTP) — nhưng **mặc định tắt** và chỉ là tầng phụ trợ; deterministic rubric vẫn quyết định.

**Khuyến nghị:** (a) Trung thực hóa README/docs: gọi đây là "eval *framework*" + "regression harness", không phải "proof". (b) Roadmap: nối runner vào agent thật (Claude/Codex API) cho ít nhất 1-2 task để có số liệu thật. (c) Tách rõ "synthetic fixtures" vs "live runs" trong report output.

### 4.4 🟠 Trùng lặp logic giữa `aih.sh` (2167 dòng) và `lib/` TypeScript

`aih.sh` chứa toàn bộ logic install/uninstall/update/status/doctor (~70 hàm shell), trong khi `lib/install-runtime.ts`, `install-legacy.ts`, `install-cache.ts` cũng chứa logic cài đặt — và `aih.sh` lại gọi chúng qua `node`. Hệ quả:

- **Hai source of truth** cho hành vi cài đặt; dễ lệch nhau (ví dụ định dạng ignore block, danh sách path).
- `lib/` TS **không được lint** — script lint chỉ quét `bin/ test/ *.js` (`eslint bin/ test/ *.js`), bỏ qua toàn bộ `lib/*.ts`. ESLint không bảo vệ phần lớn codebase.
- Round-trip Node→shell→Node làm khó test (xem 4.2) và khó debug trên Windows.

**Khuyến nghị:** Có một plan migration đã ghi nhận (`docs/internal/superpowers/plans/2026-06-06-arch-2-dist-first-typescript-migration.md`). Nên đẩy nhanh: rút logic ra TS, để `aih.sh` chỉ còn là shim mỏng (phát hiện node + ủy quyền), hoặc ngược lại. Đồng thời mở rộng `lint` để bao phủ `lib/` (qua `@typescript-eslint`).

### 4.5 🟡 Policy engine (TS) đã build & test nhưng "ngủ đông" với người dùng cuối

`lib/policy/{engine,schema,generator}.ts` (commit gần đây "policy engine G0-G3") được test kỹ (`lib/policy` coverage 92%). Nhưng đường enforcement thực tế:

- Hook **được wire trong provider example** là `hooks/core/guard-phase.js` (legacy, **không** dùng engine) — xem `hooks/providers/claude/settings.example.json`.
- Hook **có dùng engine** là `guard-phase-policy.js` (load `dist/lib/policy/engine.js` nếu `.harness/policies.json` tồn tại) — nhưng **không** được provider settings example tham chiếu.
- Installer (`aih.sh`, `install-cache.ts`, `install-runtime.ts`) **không sinh `.harness/policies.json`** vào target repo (grep 0 kết quả). `policies.json` chỉ tồn tại trong chính repo này (self-host, 3424 bytes).

→ Với consumer cài qua npm: `policies.json` không có → `guard-phase-policy.js` (kể cả khi được dùng) luôn rơi vào nhánh legacy → **policy engine không bao giờ chạy** ngoài repo gốc.

**Khuyến nghị:** quyết định dứt khoát: hoặc (a) gộp `guard-phase-policy.js` vào `guard-phase.js` và wire nó trong provider settings, đồng thời provision `policies.json` mặc định lúc `init`/`install`; hoặc (b) đánh dấu rõ policy engine là "experimental / next" trong docs để tránh hiểu lầm là đã enforce.

### 4.6 🟡 Phình tài liệu (doc sprawl)

- `docs/` có **229 file `.md`**, trong đó `docs/internal/` chiếm **94 file**. Toàn repo ~2009 file markdown (gồm node_modules templates).
- Đã có ý thức về vấn đề (`test/docs-sprawl.test.js`, nhiều file `frozen-*-contract.md`, archive v0.x), `package.json` `files[]` loại trừ rất nhiều khỏi npm pack — tốt. Nhưng số lượng "frozen contract" + "release-notes/plan/readiness" cho từng v0.x đang tạo gánh nặng bảo trì và rủi ro doc lệch code.

**Khuyến nghị:** gom các v0.x readiness/plan/release-notes vào một CHANGELOG/archive duy nhất; định kỳ chạy "doc GC". Cân nhắc tách tài liệu nội bộ sang thư mục/repo riêng.

### 4.7 🟡 Đa nền tảng: Windows phụ thuộc Git Bash; `aih.ps1` không parity

- `cli-backend.findSh()` trên Windows tìm `sh.exe` của Git Bash/WSL; nếu không có → lỗi `SH_MISSING`. Tức là trải nghiệm Windows "thuần" (không Git Bash) **không cài được**.
- `aih.ps1` chỉ **151 dòng** so với `aih.sh` **2167 dòng** → không phải bản port đầy đủ, dễ gây kỳ vọng sai cho user PowerShell.
- CI matrix có `windows-latest` (tốt) nhưng nhiều step `shell: bash` → vẫn chạy qua bash trên Windows, không test PowerShell path thật.

**Khuyến nghị:** nêu rõ yêu cầu Git Bash/WSL trong README cho Windows; hoặc khi đã migrate logic sang TS (4.4) thì loại bỏ phụ thuộc `sh` và `aih.ps1` luôn.

### 4.8 🟢 Các điểm nhỏ

- `cli-backend.buildInstallArgs` truyền `--runtime` cho `aih.sh` (README nói `--runtime` là alias *deprecated*, ưu tiên `--provider`). Nội bộ vẫn dùng tên deprecated — chưa sai chức năng nhưng nên thống nhất thuật ngữ để tránh nợ ngữ nghĩa.
- `engine.evaluateCommandCondition` dùng `new RegExp(value)` từ policy JSON — nếu policies.json đến từ nguồn không tin cậy thì có rủi ro ReDoS. Hiện policies.json là local/self-authored nên rủi ro thấp, nhưng nên ghi chú "policies.json là trusted input".
- `docs/policies.md` được generate từ `policies.json` (`scripts/generate-policy-docs.js`) nhưng **không** chạy trong CI/prepack → docs policy có thể lệch nếu quên chạy tay.
- `@types/node@^25`, `typescript@^6` trong khi `engines.node >=18`: dùng toolchain rất mới để build cho runtime cũ — ổn, nhưng cần đảm bảo `dist` không phát ra cú pháp JS vượt Node 18.

---

## 5. Cơ hội tối ưu & nâng cấp

| # | Hạng mục | Đề xuất | Lợi ích |
| --- | --- | --- | --- |
| O1 | Lint coverage | Thêm `@typescript-eslint`, mở rộng `lint` sang `lib/**/*.ts` | Bảo vệ ~80% codebase hiện không được lint |
| O2 | Một source of truth | Migrate logic `aih.sh` → TS, để shell làm shim mỏng | Bớt trùng lặp, dễ test, dễ port Windows |
| O3 | Eval thật | Nối 1-2 task vào agent API thật, đánh dấu synthetic vs live | Biến "framework" thành "evidence" thật |
| O4 | Policy end-to-end | Provision `policies.json` khi `init`, wire hook engine | Kích hoạt tính năng đã build nhưng dormant |
| O5 | Doc GC | Gom v0.x docs, tự động generate `docs/policies.md` trong CI | Giảm doc drift, giảm bảo trì |
| O6 | Tests cho CLI | Mock `runAihSh` để test `cli-commands` | Đạt & vượt coverage gate thật |
| O7 | Telemetry opt-in rõ ràng | `insights/remote-upload.ts` POST tới endpoint env — đảm bảo có consent/doc rõ | Tin cậy & quyền riêng tư |

---

## 6. Khuyến nghị ưu tiên (theo thứ tự)

**P0 — Sửa ngay (CI/độ tin cậy đang đỏ):**
1. Sửa `ci.yml`: `node validate.js` → `node bin/validate.js`. *(§4.1)*
2. Giải quyết coverage gate: nâng test CLI hoặc chỉnh ngưỡng + sửa badge README. *(§4.2)*

**P1 — Trung thực hóa tuyên bố (tránh hiểu lầm sản phẩm):**
3. Đổi mô tả eval thành "framework/regression harness"; tách synthetic vs live. *(§4.3)*
4. Quyết định số phận policy engine: kích hoạt end-to-end **hoặc** gắn nhãn experimental. *(§4.5)*

**P2 — Giảm nợ kỹ thuật nền:**
5. Mở rộng ESLint sang `lib/`. *(§4.4, O1)*
6. Thúc đẩy migration dist-first TS, thu nhỏ `aih.sh`. *(§4.4, O2)*
7. Doc GC + generate `docs/policies.md` trong CI. *(§4.6, O5)*

**P3 — Trải nghiệm & nâng cấp:**
8. Làm rõ yêu cầu Windows (Git Bash/WSL) hoặc loại bỏ phụ thuộc `sh`. *(§4.7)*
9. Thống nhất `--provider`/`--runtime` nội bộ; ghi chú trusted input cho policies.json. *(§4.8)*

---

## 7. Phụ lục — Bằng chứng đã chạy

- `npm test` → `tests 177 / pass 177 / fail 0` (`duration ~14.4s`).
- `tsc -p tsconfig.lib.json` → exit 0.
- `npm run test:coverage` → `All files 71.22% lines / 63% functions`; `ERROR: functions 63% < 65%`.
- `ls validate.js` → "No such file"; `test/root-shim-removal.test.js` xác nhận chủ đích xóa.
- `.github/workflows/ci.yml` → step `run: node validate.js`.
- `evals/mutations/registry.json` → step counts hardcode (3 vs 7/8), file kết quả viết sẵn.
- `hooks/providers/claude/settings.example.json` → wire `guard-phase.js` (không phải `guard-phase-policy.js`).
- `.harness/policies.json` tồn tại trong repo gốc; grep installer = 0 kết quả provision cho target.
