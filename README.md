# eCareer Web — Job & Mentor Platform (React + TypeScript)

Platform karier untuk **job feed**, **mentor chat asinkron**, **profil**, dan **admin dashboard**. Frontend modular, siap produksi: **Vite + React + TS**, arsitektur **feature‑sliced**, **RBAC**, **Zustand**, **Axios interceptors**, **Tailwind**.

---

## ✨ Fitur Utama

* 🔐 **Auth & RBAC** — JWT (access/refresh), guard per‑route (USER/ADMIN).
* 🧭 **Routing modern** — `createBrowserRouter` + `RouterProvider`, `React.lazy` + `Suspense`.
* 🧰 **State management** — `zustand` (+ persist untuk session).
* 🌐 **HTTP client** — Axios + interceptors (trace‑id, bearer token, refresh queue & retry).
* 🎨 **UI/UX** — TailwindCSS, AppShell, komponen primitives (Button, Input, Card), theming dasar.
* 🌍 **i18n minimal** — kamus ID/EN; bisa swap ke `react‑i18next`.
* 🧪 **DX/Kualitas** — TypeScript strict, ESLint, Prettier, Vite fast HMR.

---

## 🗂️ Struktur Direktori (ringkas)

```
src/
├─ app/                # App shell, router, providers, theme
├─ pages/              # Landing, Login, NotFound
├─ features/           # Feature‑sliced modules
│  ├─ jobs/            # JobsListPage, JobDetailPage, api & types
│  ├─ mentor/          # MentorChatPage (placeholder async)
│  ├─ profile/         # ProfilePage
│  └─ admin/           # AdminDashboard
├─ shared/
│  ├─ api/             # http.ts, auth.api.ts, endpoints & types
│  ├─ auth/            # auth.store, auth.guard, rbac
│  ├─ config/          # env.ts
│  ├─ i18n/            # id.json, en.json, loader
│  ├─ ui/              # AppShell, PageHeader, primitives, utils
│  └─ lib/             # logger/utils (opsional)
├─ index.css           # Tailwind entry
└─ main.tsx            # app bootstrap
```

---

## 🔧 Prasyarat

* **Node.js** 18+ (disarankan 20+)
* Paket manajer: **npm**/**pnpm**/**yarn**
* Backend tersedia di `http://localhost:8080` (atau set via env)

---

## 🚀 Quickstart

```bash
# 1) Install deps
npm i

# 2) Salin & isi env
cp .env.example .env
# lalu edit: VITE_API_BASE=http://localhost:8080

# 3) Jalankan dev
npm run dev

# 4) Build & preview produksi
npm run build
npm run preview
```

**Environment**

```
VITE_API_BASE=http://localhost:8080
```

> Semua env yang dibaca FE harus berawalan `VITE_`.

---

## 🔐 Autentikasi & RBAC

**Kontrak API (contoh)**

```http
POST /auth/login
{ "email":"user@mail.com", "password":"secret" }
→ 200
{ "accessToken":"...", "refreshToken":"...", "user":{ "id":"u_1","name":"Sahril","role":"USER" } }

POST /auth/refresh
{ "refreshToken":"..." }
→ 200
{ "accessToken":"...", "refreshToken":"..." }
```

**Alur FE**

* `auth.store` menyimpan `session` (persist storage).
* `http.ts` menambah header `Authorization` + `x-trace-id`.
* 401 → **single‑flight refresh** → update token → retry; gagal → **logout**.

**RBAC**

* Enum `Role` = `GUEST | USER | ADMIN`.
* `AuthGuard` menjaga rute: `/admin` hanya `ADMIN`, `/jobs` hanya `USER+`.

---

## 🧭 Routing

* Pakai `createBrowserRouter` + `<RouterProvider>`.
* Lazy routes **wajib** dibungkus `<Suspense>`.
* **Jangan** bungkus `<App />` dengan `<BrowserRouter>` jika sudah memakai `RouterProvider` (hindari Router di dalam Router).

---

## 🎨 Tailwind & UI

* `tailwind.config.ts` → `content: ['./index.html','./src/**/*.{ts,tsx}']`
* `postcss.config.js` → plugin `tailwindcss` + `autoprefixer`
* `src/index.css` → `@tailwind base; @tailwind components; @tailwind utilities;`
* Primitives: `Button`, `Input`, `Card` (bisa ganti ke **shadcn/ui**).

---

## 📡 HTTP & Interceptors (ringkas)

* Request: set `x-trace-id`, `Content-Type`, `Authorization`.
* Response: tangani `401` → refresh queue + retry original request.
* Timeout default 15s.

---

## 🧪 Scripts NPM

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview --host",
  "typecheck": "tsc --noEmit",
  "lint": "eslint .",
  "format": "prettier -w ."
}
```

---

## 🧱 API Kontrak (MVP)

* `POST /auth/login`, `POST /auth/refresh`
* `GET /jobs`, `GET /jobs/:id`
* `GET /profile/me`
* `GET /mentor/threads`, `POST /mentor/threads/:id/messages`

---

## 🛡️ Keamanan Frontend (praktik baik)

* Token di storage FE (persist), **jangan** di‑cookie tanpa strategi CSRF.
* Jangan log token ke console.
* Validasi input dengan `zod`.
* Error 4xx/5xx: tampilkan generik; jangan bocorkan detail server.

---

## 🧭 Roadmap

* [ ] Sempurnakan refresh flow + retry edge cases.
* [ ] Mentor chat: threads, attachments, notifikasi.
* [ ] Admin moderation: approve/reject job posting.
* [ ] i18n penuh + theme toggle.
* [ ] Web‑Vitals/observability (opsional).
* [ ] PWA (opsional).

---

## 🤝 Kontribusi

1. Fork → buat branch `feat/namafitur`
2. Commit konvensional (`feat: ...`, `fix: ...`)
3. PR dengan deskripsi jelas (tujuan, perubahan, cara test)

---

## 📄 Lisensi

Apache‑2.0 (atau sesuai kebijakan organisasi)

---

## ❓ Troubleshooting Cepat

* **Blank/Hitam**: pastikan `<Suspense>` ada; hindari Router ganda.
* **Tailwind tidak jalan**: cek glob `content`, `@tailwind` di `index.css`, dan `postcss.config.js`.
* **`import.meta.env` merah**: buat `src/vite-env.d.ts` → `/// <reference types="vite/client" />`.
* **`config.headers` merah**: gunakan `InternalAxiosRequestConfig` + `AxiosHeaders` (lihat `http.ts`).
* **`Role` merah**: import dari `shared/auth/rbac`.
* **Router error**: “Router inside Router” → hapus `<BrowserRouter>` jika sudah memakai `RouterProvider`.
