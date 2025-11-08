import { useEffect, useState } from 'react';
import { PageHeader } from '@/shared/ui/PageHeader';
import { getJobs } from '../jobs.api';
import type { Job } from '../jobs.types';
import JobCard from '../components/JobCard';


export default function JobsListPage(){
    const [items,setItems] = useState<Job[]>([]);
    const [loading,setLoading] = useState(true);


    useEffect(() => { (async () => {
        try { setItems(await getJobs()); }
        finally { setLoading(false); }
    })(); }, []);


    return (
        <div>
            <PageHeader title="Job Feed" />
            {loading ? <div className="text-muted">Loading…</div> : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map(j => <JobCard key={j.id} job={j} />)}
                </div>
            )}
        </div>
    );
}