import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getJob } from '../jobs.api';
import type { Job } from '../jobs.types';
import { PageHeader } from '@/shared/ui/PageHeader';


export default function JobDetailPage(){
    const { id } = useParams();
    const [item,setItem] = useState<Job|undefined>();


    useEffect(() => { (async () => { if(id) setItem(await getJob(id)); })(); }, [id]);
    if(!item) return <div className="text-muted">Loading…</div>;
    return (
        <div className="space-y-3">
            <PageHeader title={item.title}/>
            <div className="text-sm text-muted">{item.company} • {item.location}</div>
            <div className="flex flex-wrap gap-2">{item.tags.map(t => <span key={t} className="badge">{t}</span>)}</div>
            <article className="prose prose-invert max-w-none">
                <p>{item.description}</p>
            </article>
            <button className="px-3 py-2 rounded bg-[var(--accent)] text-black">Apply</button>
        </div>
    );
}