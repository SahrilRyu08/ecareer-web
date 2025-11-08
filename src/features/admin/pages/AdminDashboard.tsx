import { PageHeader } from '@/shared/ui/PageHeader';
export default function AdminDashboard(){
    return (
        <div className="space-y-3">
            <PageHeader title="Admin Dashboard" />
            <div className="grid md:grid-cols-2 gap-3">
                <div className="card">User Stats (placeholder)</div>
                <div className="card">Job Posting Review (placeholder)</div>
            </div>
        </div>
    );
}