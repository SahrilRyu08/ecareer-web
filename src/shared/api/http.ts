// src/shared/api/http.ts
import axios, { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import { useAuth } from "@/shared/auth/auth.store";
import { getEnv } from "@/shared/config/env";
import { generateId } from "@/shared/ui/utils";

const api = axios.create({
    baseURL: getEnv().VITE_API_BASE,
    timeout: 15000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { session } = useAuth.getState();
    const traceId = generateId(16);

    // Pastikan headers berupa AxiosHeaders supaya aman secara tipe
    const h = new AxiosHeaders(config.headers as any);
    h.set("x-trace-id", traceId);
    if (!h.has("Content-Type")) h.set("Content-Type", "application/json");
    if (session?.accessToken) h.set("Authorization", `Bearer ${session.accessToken}`);

    config.headers = h;
    return config;
});

api.interceptors.response.use(
    (r) => r,
    async (err) => {
        const status = err?.response?.status;
        const { session, logout } = useAuth.getState();
        if (status === 401 && session?.refreshToken) {
            // TODO: refresh token + retry
            logout();
        }
        return Promise.reject(err);
    }
);

export default api;
