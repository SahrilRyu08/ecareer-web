export const getEnv = () => {
    const env = import.meta.env as unknown as { VITE_API_BASE?: string };
    return {
        VITE_API_BASE: env.VITE_API_BASE ?? 'http://localhost:8080',
    };
};
