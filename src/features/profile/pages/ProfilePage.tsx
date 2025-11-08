import { useAuth } from '@/shared/auth/auth.store';
import { PageHeader } from '@/shared/ui/PageHeader';


export default function ProfilePage(){
    const { session } = useAuth();
    if(!session) return null;
    return (
        <div className="space-y-3">
            <PageHeader title="Profil" />
            <div className="card">
                <div>Nama: {session.user.name}</div>
                <div>Role: {session.user.role}</div>
                <div>User ID: {session.user.id}</div>
            </div>
        </div>
    );
}