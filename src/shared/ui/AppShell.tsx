import { Outlet, NavLink } from "react-router-dom";
import { Suspense } from "react";
import { useAuth } from "@/shared/auth/auth.store";

export const AppShell = () => {
    const { session, logout } = useAuth();
    return (
        <div className="min-h-screen">
            <header className="sticky top-0 z-10 backdrop-blur border-b border-border">
                <div className="container-xx flex items-center gap-4 py-3">
                    <nav className="flex gap-4 text-sm">
                        <NavLink to="/" className="hover:underline">Home</NavLink>
                        <NavLink to="/jobs" className="hover:underline">Jobs</NavLink>
                        <NavLink to="/mentor" className="hover:underline">Mentor</NavLink>
                        <NavLink to="/profile" className="hover:underline">Profile</NavLink>
                    </nav>
                    <div className="ml-auto text-sm">
                        {session ? (
                            <button className="underline" onClick={logout}>Logout ({session.user.name})</button>
                        ) : (
                            <NavLink to="/login" className="underline">Login</NavLink>
                        )}
                    </div>
                </div>
            </header>

            <main className="container-xx py-6">
                <Suspense fallback={<div className="text-muted">Loading…</div>}>
                    <Outlet />
                </Suspense>
            </main>

            <footer className="container-xx py-8 text-muted text-sm border-t border-border">© 2025 eCareer</footer>
        </div>
    );
};
