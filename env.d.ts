/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE: string; // tambahkan env lain bila perlu
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
