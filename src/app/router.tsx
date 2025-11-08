import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '@/shared/ui/AppShell';
import { AuthGuard } from '@/shared/auth/auth.guard';
import { Role } from '@/shared/auth/rbac';


const Landing = lazy(() => import('@/pages/Landing'));
const Login = lazy(() => import('@/pages/Login'));
const NotFound = lazy(() => import('@/pages/NotFound'));


const JobsListPage = lazy(() => import('@/features/jobs/pages/JobsListPage'));
const JobDetailPage = lazy(() => import('@/features/jobs/pages/JobDetailPage'));
const MentorChatPage = lazy(() => import('@/features/mentor/pages/MentorChatPage'));
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'));
const AdminDashboard = lazy(() => import('@/features/admin/pages/AdminDashboard'));


export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppShell />, // header + sidebar
        children: [
            { index: true, element: <Landing /> },
            { path: 'login', element: <Login /> },
            { path: 'jobs', element: <AuthGuard roles={[Role.USER]}><JobsListPage/></AuthGuard> },
            { path: 'jobs/:id', element: <AuthGuard roles={[Role.USER]}><JobDetailPage/></AuthGuard> },
            { path: 'mentor', element: <AuthGuard roles={[Role.USER]}><MentorChatPage/></AuthGuard> },
            { path: 'profile', element: <AuthGuard roles={[Role.USER]}><ProfilePage/></AuthGuard> },
            { path: 'admin', element: <AuthGuard roles={[Role.ADMIN]}><AdminDashboard/></AuthGuard> },
            { path: '*', element: <NotFound /> }
        ]
    }
]);