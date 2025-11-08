// src/shared/ui/utils.ts

/** Join class names sederhana (mirip clsx). */
export function cn(...parts: Array<string | false | null | undefined>) {
    return parts.filter(Boolean).join(" ");
}

/** Potong string dengan ellipsis. */
export function truncate(text: string, max = 120, ellipsis = "…") {
    if (!text) return "";
    return text.length > max ? text.slice(0, Math.max(0, max - ellipsis.length)) + ellipsis : text;
}

/** Sleep async kecil untuk simulasi loading. */
export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Debounce util (punya .cancel & .flush). */
export function debounce<T extends (...args: any[]) => any>(fn: T, wait = 300) {
    let t: ReturnType<typeof setTimeout> | undefined;
    let latestArgs: any[] = [];
    const debounced = (...args: Parameters<T>) => {
        latestArgs = args;
        if (t) clearTimeout(t);
        t = setTimeout(() => {
            t = undefined;
            fn(...latestArgs);
        }, wait);
    };
    debounced.cancel = () => t && clearTimeout(t);
    debounced.flush = () => {
        if (t) {
            clearTimeout(t);
            t = undefined;
            fn(...latestArgs);
        }
    };
    return debounced as T & { cancel: () => void; flush: () => void };
}

/** Throttle util (leading=true, trailing=true). */
export function throttle<T extends (...args: any[]) => any>(fn: T, wait = 300) {
    let last = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let queuedArgs: any[] | null = null;

    const invoke = (args: any[]) => {
        last = Date.now();
        fn(...args);
    };

    const throttled = (...args: Parameters<T>) => {
        const now = Date.now();
        const remaining = wait - (now - last);

        if (remaining <= 0) {
            if (timer) {
                clearTimeout(timer);
                timer = undefined;
            }
            invoke(args);
        } else {
            queuedArgs = args;
            if (!timer) {
                timer = setTimeout(() => {
                    timer = undefined;
                    if (queuedArgs) {
                        invoke(queuedArgs);
                        queuedArgs = null;
                    }
                }, remaining);
            }
        }
    };

    throttled.cancel = () => timer && clearTimeout(timer);
    return throttled as T & { cancel: () => void };
}

/** Number → IDR (tanpa pecahan default). */
export function formatCurrencyIDR(value: number, withFraction = false) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: withFraction ? 2 : 0,
        maximumFractionDigits: withFraction ? 2 : 0,
    }).format(value);
}

/** Tanggal → string lokal Indonesia. */
export function formatDateID(date: Date | string | number, opts?: Intl.DateTimeFormatOptions) {
    const d = date instanceof Date ? date : new Date(date);
    return new Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        ...opts,
    }).format(d);
}

/** Type guards kecil. */
export const isDefined = <T>(v: T | null | undefined): v is T => v !== null && v !== undefined;
export const isNonEmpty = (s?: string | null) => !!s && s.trim().length > 0;

/** Buat trace/id sederhana (fallback jika tidak pakai nanoid). */
export function generateId(len = 12) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let out = "";
    for (let i = 0; i < len; i++) out += alphabet[(Math.random() * alphabet.length) | 0];
    return out;
}

/** Invariant untuk runtime check. */
export function invariant(cond: any, msg = "Invariant violation") {
    if (!cond) throw new Error(msg);
}

/** Exhaustive check untuk switch-case + union types. */
export function assertNever(x: never, msg = "Unexpected object") {
    throw new Error(`${msg}: ${String(x)}`);
}
