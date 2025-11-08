import { PageHeader } from '@/shared/ui/PageHeader';
export default function Landing(){
    return (
        <div>
            <PageHeader title="Welcome to eCareer"/>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="card">
                    <h3 className="font-semibold mb-1">Job Feed</h3>
                    <p className="text-muted text-sm">Cari pekerjaan yang cocok dengan profilmu.</p>
                </div>
                <div className="card">
                    <h3 className="font-semibold mb-1">Mentor Chat</h3>
                    <p className="text-muted text-sm">Ngobrol dengan mentor secara asinkron.</p>
                </div>
            </div>
        </div>
    );
}