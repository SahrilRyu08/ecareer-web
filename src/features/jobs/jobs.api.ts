import api from '@/shared/api/http';
import type { Job } from './jobs.types';


export async function getJobs(): Promise<Job[]> {
    const { data } = await api.get('/jobs');
    return data;
}
export async function getJob(id: string): Promise<Job> {
    const { data } = await api.get(`/jobs/${id}`);
    return data;
}