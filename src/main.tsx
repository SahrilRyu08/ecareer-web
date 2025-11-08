import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./app/theme.css";
import { Providers } from "./app/providers";
import { App } from "./app/App";

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Suspense fallback={<div className="container-xx p-6 text-muted">Loading…</div>}>
            <Providers>
                <App />
            </Providers>
        </Suspense>
    </React.StrictMode>
);