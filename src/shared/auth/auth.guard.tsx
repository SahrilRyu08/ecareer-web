import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth.store';
import { Role } from './rbac';


export const AuthGuard = ({ roles, children }: PropsWithChildren<{ roles: Role[] }>) => {
    const { session } = useAuth();
    const loc = useLocation();
    if (!session) return <Navigate to="/login" state={{ from: loc }} replace />;
    if (!roles.includes(session.user.role)) return <Navigate to="/" replace />;
    return <>{children}</>;
};