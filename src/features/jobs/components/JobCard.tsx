import type { Job } from '../jobs.types';
import { Link } from 'react-router-dom';


export default function JobCard({ job }: { job: Job }){
    return (
        <Link to={`/jobs/${job.id}`} className="card block hover:border-[var(--accent)]">
            <div className="font-semibold">{job.title}</div>
            <div className="text-sm text-muted">{job.company} • {job.location}</div>
            <div className="mt-2 flex flex-wrap gap-2">
                {job.tags.map(t => <span key={t} className="badge">{t}</span>)}
            </div>
        </Link>
    );
}