# Báo cáo Review Repo `ai-engineering-harness`

> Người review: Senior AI / Harness Engineer
> Ngày: 2026-06-05
> Phiên bản được review: `v1.0.1` (HEAD `47928b2`)
> Phạm vi: Toàn bộ source code, packaging, CI/CD, test, tài liệu, script cài đặt và bảo mật.

---

## 0. Tóm tắt điều hành (Executive Summary)

`ai-engineering-harness` là một dự án có **ý tưởng tốt và kiến trúc khá rõ ràng** (tách `lib/`, có CLI wizard, có provider adapter, có validate contract, CI đa nền tảng). Tuy nhiên, ở góc nhìn "pro / production-grade", dự án đang có **một số lỗ hổng nghiêm trọng về chất lượng release, packaging, bảo mật cài đặt và độ tin cậy của test/CI**.

Điểm đáng lo nhất: **commit được gắn tag release `v1.0.1` lại KHÔNG vượt qua chính cổng chất lượng (`format:check`) mà repo tự định nghĩa**, đồng thời **một file binary 42MB bị commit thẳng vào git**. Đây là những vấn đề làm giảm uy tín "engineering discipline" — vốn là chính giá trị cốt lõi mà dự án này đang bán.

| Mức độ | Số lượng | Ghi chú |
|--------|----------|---------|
| 🔴 Critical | 4 | Phải sửa trước khi release tiếp theo |
| 🟠 High | 5 | Ảnh hưởng người dùng / độ tin cậy |
| 🟡 Medium | 6 | Nợ kỹ thuật, gây nhiễu |
| 🔵 Low | 4 | Polish |

---

## 1. 🔴 CRITICAL — Vấn đề nghiêm trọng

### 1.1. Release `v1.0.1` KHÔNG pass chính cổng chất lượng của nó (`format:check`)

**Bằng chứng (chạy trên cây commit sạch tại HEAD, đã `git stash` thay đổi local):**

```
$ npm run format:check   # trên HEAD 47928b2
[warn] test/release-version.test.js
[warn] install-cache.js
[warn] install-runtime.js
[warn] runtime-command-catalog.js
[warn] validate.js
[warn] Code style issues found in 5 files.
```

CI (`.github/workflows/ci.yml`) có bước `Check formatting (Prettier)` chạy `prettier --check lib/ bin/ test/ *.js *.md`. Vì các file root `*.js` (shim) và `test/release-version.test.js` đã commit ở trạng thái **chưa format**, nghĩa là một trong hai điều sau đang đúng:

1. **CI trên `main` đang đỏ** (release vẫn được tag bất chấp CI fail), hoặc
2. Quy trình release **bỏ qua / không thực sự gate** trên format.

Cả hai đều mâu thuẫn trực tiếp với định vị "engineering discipline & guardrails" của dự án.

**Khắc phục:**
- Chạy `npm run format` để format lại toàn bộ, commit.
- Bắt buộc CI là **required status check** cho branch `main` (branch protection rule).
- Thêm pre-commit hook (husky / lint-staged hoặc hook có sẵn của dự án) chạy `format:check` + `lint`.

---

### 1.2. File video 42MB (`AI_Engineering_Harness.mp4`) bị commit thẳng vào Git

**Bằng chứng:**
```
$ ls -lh AI_Engineering_Harness.mp4   → 42M
$ du -sh .git                          → 67M   (phần lớn là binary này)
```

Hệ quả:
- Mỗi lần `git clone` đều phải tải toàn bộ blob 42MB → chậm, tốn băng thông, lịch sử git phình to vĩnh viễn (không thể xóa chỉ bằng việc `rm` file, blob đã nằm trong history).
- File không nằm trong `package.json > files` nên **không ship lên npm** — tức nó chỉ làm nặng repo chứ không phục vụ người dùng npm.
- README lại link tới video **local** (xác nhận bởi test `readme-landing-refresh.test.js`), nên người cài qua npm sẽ thấy link hỏng.

**Khắc phục:**
- Đưa video lên hosting ngoài (YouTube / asset CDN / GitHub Release asset) và link bằng URL.
- Gỡ binary khỏi history (`git filter-repo` hoặc BFG) — đây là thao tác phá lịch sử, cần phối hợp team.
- Nếu bắt buộc giữ trong repo, dùng **Git LFS** và thêm rule vào `.gitattributes`.
- Cập nhật README dùng URL tuyệt đối thay vì path local.

---

### 1.3. Script cài đặt mặc định (`install.sh`) KHÔNG verify checksum — rủi ro chuỗi cung ứng

**Bằng chứng:**
```sh
# install.sh
curl -fsSL "https://raw.githubusercontent.com/${REPO}/${REF}/aih.sh" -o "$TMP_SCRIPT"
exec sh "$TMP_SCRIPT" "$@"        # ← chạy ngay, KHÔNG đối chiếu sha256
```
```
$ grep -c "sha256" install.sh install-secure.sh
install.sh:0
install-secure.sh:3
```

Repo **có sẵn** `aih.sh.sha256` và **có sẵn** `install-secure.sh` (verify checksum), nhưng `install.sh` — chính là script thường được dùng trong one-liner `curl ... | sh` — lại bỏ qua bước verify. Ngoài ra `--ref` cho phép trỏ tới branch/tag tùy ý rồi `exec sh` trực tiếp, mở rộng bề mặt tấn công.

Đây là điểm rất nhạy cảm: dự án định vị về "discipline/guardrails" nhưng đường cài đặt mặc định lại **kém an toàn hơn** biến thể "secure" của chính nó.

**Khắc phục:**
- Mặc định `install.sh` PHẢI verify `sha256` trước khi `exec` (gộp logic của `install-secure.sh` vào làm mặc định).
- Pin theo tag/commit SHA thay vì `main` mặc định.
- Tài liệu hóa rõ ràng cảnh báo bảo mật cho cơ chế `curl | sh`.

---

### 1.4. `package.json > files` khai báo `TARGET.md` nhưng file KHÔNG tồn tại

**Bằng chứng:**
```
$ grep -n "TARGET.md" package.json   → dòng 73 có
$ ls TARGET.md                        → No such file or directory
```

npm sẽ bỏ qua file thiếu (chỉ warn), nhưng đây là dấu hiệu **manifest packaging không được kiểm chứng**. Nếu một tài liệu bắt buộc bị rename/xóa mà `files` không cập nhật, package phát hành sẽ thiếu nội dung mà không ai phát hiện.

**Khắc phục:**
- Xóa `TARGET.md` khỏi `files`, hoặc khôi phục file.
- Thêm test kiểm tra: mọi entry trong `package.json > files` đều tồn tại trên đĩa (có thể thêm vào `validate.js`).

---

## 2. 🟠 HIGH — Vấn đề mức cao

### 2.1. Test script chỉ chạy 2/4 file test — guard release không được CI enforce

**Bằng chứng:**
```json
"test": "node --test test/run-tests.js test/cli-tests.js"
```
Hai file bị bỏ ra ngoài:
- `test/release-version.test.js` — **chính là test kiểm tra mọi file release trỏ đúng `v1.0.1`** (guard quan trọng nhất khi release!).
- `test/readme-landing-refresh.test.js`.

Cả hai **đều pass khi chạy thủ công**, nhưng vì không nằm trong `npm test` nên **CI không bao giờ chạy chúng**. Test guard release mà không được tự động hóa thì gần như vô dụng.

**Khắc phục:** Dùng glob để gom mọi test:
```json
"test": "node --test test/**/*.test.js test/run-tests.js test/cli-tests.js"
```
hoặc chuẩn hóa đặt tên tất cả thành `*.test.js` và dùng `node --test`.

---

### 2.2. CLI wizard mới (đường khuyến nghị) gần như KHÔNG có test

**Bằng chứng:**
```
$ grep -rn "cli-commands" test/   → (không có kết quả)
```
- `lib/cli-commands/{install,update,uninstall,diagnostics}.js` — đường `npx ai-engineering-harness install ...` được README khuyến nghị — không có test trực tiếp.
- `test/cli-tests.js` chủ yếu test `install.js` (đường **legacy đã deprecated**, dự kiến gỡ ở v1.1.0).

Nghĩa là test đang phủ đường code **sắp bị xóa**, còn đường code **chính** thì không. 85 test nghe nhiều nhưng phần lớn là assert sự hiện diện chuỗi trong file Markdown (xem 3.3), không phải test hành vi của CLI.

**Khắc phục:** Viết integration test cho install/update/uninstall wizard (dùng thư mục tạm, `--yes` non-interactive, kiểm tra file output thực tế).

---

### 2.3. Thiếu trường `engines` trong `package.json`

CI test trên Node 18 & 20 nhưng `package.json` **không khai báo `engines`**. Người dùng Node cũ hơn (16, 14) sẽ cài được mà không có cảnh báo, rồi gặp lỗi runtime khó hiểu.

**Khắc phục:**
```json
"engines": { "node": ">=18" }
```

---

### 2.4. Cây làm việc đang "bẩn" 17 file ngay sau khi tag release

`git status` cho thấy 17 file đã sửa (`AGENTS.md`, `README.md`, `lib/runtime-command-catalog.js`, các `workflows/*.md`...) nhưng chưa commit, ngay sau commit "chore: prepare v1.0.1 release". Trạng thái này khiến không rõ đâu là nội dung release thực sự, dễ phát hành nhầm.

**Khắc phục:** Commit hoặc revert có chủ đích; thiết lập quy trình "release từ cây sạch".

---

### 2.5. README link video local → người dùng npm/GitHub nhận link hỏng

Liên quan 1.2. Test `readme-landing-refresh.test.js` đang **đảm bảo README trỏ tới video local** — tức là biến một anti-pattern thành "contract". Người clone/cài npm sẽ không có file 42MB đó.

**Khắc phục:** Đổi sang URL hosting ngoài và cập nhật test tương ứng.

---

## 3. 🟡 MEDIUM — Nợ kỹ thuật & gây nhiễu

### 3.1. Bùng nổ tài liệu (documentation sprawl)

```
docs/ : 157 file .md
  - 21 file v*-release-notes.md
  -  8 file frozen-*-contract.md
  + nhiều cặp trùng chủ đề: install-* (~15 file), runtime-* (~15 file), pack-dogfood-* ...
```
Khối lượng này vượt xa khả năng bảo trì của một dự án ở quy mô ~4.000 dòng code lib. Rất nhiều file là nhật ký quá trình (dogfood reports, readiness, plan) lẽ ra nên nằm trong wiki/PR chứ không phải trong package ship cho người dùng (toàn bộ `docs/` nằm trong `files`).

**Khắc phục:** Tách "docs cho người dùng" (ship) khỏi "docs nội bộ/process" (không ship); cân nhắc archive release-notes cũ; gộp các nhóm `install-*`, `runtime-*` trùng lặp.

### 3.2. Lịch sử version khó hiểu

```
v0.1.0 → v0.2.0 → ... → v0.10.x → v0.11.0 → v1.0.0 → v1.0.1
```
21 bộ release-notes trong vài tuần phát triển, nhảy thẳng từ `v0.11` sang `v1.0`. Với người dùng ngoài, việc đánh số này khó suy ra mức độ ổn định/breaking. Nên có chính sách SemVer rõ ràng (đã có `docs/breaking-change-policy.md` — cần tuân thủ thực tế).

### 3.3. Test phần lớn là "kiểm tra chuỗi trong Markdown" → giòn (brittle)

Các suite như "Provider Rules", "Hooks & Skills Layer", "Daily Dev Report Layer", "Session Start Protocol" chủ yếu assert rằng file docs **có chứa chuỗi X**. Loại test này:
- Pass kể cả khi tính năng thật bị hỏng (chỉ cần text còn đó).
- Fail giả khi đổi câu chữ docs.

**Khắc phục:** Ưu tiên test hành vi (chạy hook thật, chạy generate-report thật rồi assert output) thay vì sự hiện diện chuỗi.

### 3.4. Rác file ở thư mục gốc bị ship lên npm

Root chứa: `COMPLETION_REPORT.md`, `DEMO_PLAN.md`, `DEMO_SCRIPT.md`, `FINAL_REVIEW_SUMMARY.md`, `IMPROVEMENTS.md`, `QUICK_REFERENCE.md`. Đây là artifact quá trình phát triển, không nên nằm ở root của một package công khai (gây nhiễu, một số có thể vô tình lọt vào package).

**Khắc phục:** Chuyển vào `docs/internal/` hoặc xóa; chỉ giữ ở root những file chuẩn (README, LICENSE, CHANGELOG, CONTRIBUTING, SECURITY).

### 3.5. Tồn tại song song shim root + bản thật trong `lib/`

`runtime-command-catalog.js`, `install-cache.js`, `install-runtime.js`, `validate.js`, `install.js` ở root chỉ là shim `require("./lib/...")`. Cách này hợp lý cho backward-compat nhưng đang là nguồn gây lỗi format (mục 1.1) và tăng diện tích bảo trì. Cần lộ trình gỡ rõ ràng (đã ghi "removed in v1.1.0" cho legacy install — tốt, nên áp dụng nhất quán).

### 3.6. `validate.js` kiểm 439 file nhưng không kiểm tính nhất quán của `package.json > files`

Validate rất mạnh về contract (439 mục) nhưng lại bỏ sót đúng cái lỗi ở 1.4 (`TARGET.md` thiếu). Nên bổ sung kiểm tra chéo giữa `files` ↔ đĩa ↔ docs index.

---

## 4. 🔵 LOW — Hoàn thiện

- **4.1** `npm warn Unknown user config "always-auth"` xuất hiện ở mọi lệnh npm — do `.npmrc` (global hoặc repo) còn config lỗi thời. Nên dọn.
- **4.2** Có 1 `TODO/FIXME` trong source (`lib/`, `bin/`, `scripts/`) — ít, nhưng nên truy vết và đóng.
- **4.3** `bin/cli-ui.js` (61 bytes) là shim trùng tên với `lib/cli-ui.js` — gây nhầm lẫn điều hướng, cân nhắc đặt tên rõ ràng hơn.
- **4.4** Chưa thấy badge CI / coverage trong README để minh chứng "green build" — với dự án bán "discipline", đây là tín hiệu tin cậy quan trọng.

---

## 5. Điểm mạnh (ghi nhận khách quan)

- Kiến trúc `lib/` tách module gọn (`cli-*`, `cli-commands/`, `validate/`), file lớn nhất chỉ ~843 dòng.
- Dependencies runtime cực gọn (chỉ `@clack/prompts`) — giảm bề mặt rủi ro.
- CI chạy ma trận đa OS (Ubuntu/macOS/Windows) × Node 18/20 — rất tốt cho công cụ CLI.
- Có `validate.js` kiểm 439 contract — tư duy contract-first đáng khen.
- Có `.gitattributes` chuẩn hóa LF, có ESLint + Prettier, có SECURITY.md, CONTRIBUTING.md.
- Có biến thể `install-secure.sh` với checksum (chỉ tiếc là chưa thành mặc định).

---

## 6. Đề xuất ưu tiên (Action Plan)

### Sprint 0 — Chặn release (làm ngay, trước khi publish bản kế tiếp)
1. `npm run format` toàn repo + bật branch protection yêu cầu CI xanh. *(1.1)*
2. Gỡ video 42MB khỏi history, chuyển sang URL ngoài. *(1.2, 2.5)*
3. Biến `install.sh` mặc định = verify checksum + pin SHA. *(1.3)*
4. Sửa `package.json > files` (`TARGET.md`) + thêm test files↔đĩa. *(1.4, 3.6)*
5. Đưa toàn bộ test vào `npm test` (glob `*.test.js`). *(2.1)*

### Sprint 1 — Độ tin cậy
6. Viết integration test cho CLI wizard install/update/uninstall. *(2.2)*
7. Thêm `engines`, dọn `.npmrc` warning. *(2.3, 4.1)*
8. Dọn root: chuyển artifact process vào `docs/internal/`. *(3.4)*

### Sprint 2 — Bền vững
9. Tái cấu trúc `docs/` (user vs internal), archive release-notes cũ. *(3.1, 3.2)*
10. Chuyển dần test "string-presence" sang test hành vi. *(3.3)*
11. Lộ trình gỡ shim/legacy ở v1.1.0 nhất quán. *(3.5)*

---

## 7. Phương pháp & bằng chứng đã chạy

| Hạng mục | Kết quả thực tế |
|----------|-----------------|
| `npm test` (2 file) | 85 pass / 0 fail |
| 2 test bị loại | 3 pass (nhưng không nằm trong CI) |
| `npm run lint` | Pass |
| `npm run format:check` (working tree) | **FAIL — 7 file** |
| `npm run format:check` (HEAD sạch) | **FAIL — 5 file** |
| `node validate.js` | Pass — 439 contract |
| Files tracked | 592 (node_modules đã gitignore đúng) |
| `.git` size | 67MB (42MB là 1 file mp4) |
| docs/*.md | 157 file |

---

*Hết báo cáo. Mọi phát hiện ở mục 1–2 đều có bằng chứng tái lập được bằng lệnh trong mục 7.*
