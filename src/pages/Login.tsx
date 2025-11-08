import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/shared/api/http';
import { useAuth } from '@/shared/auth/auth.store';
import { Role } from '@/shared/auth/rbac';


const schema = z.object({ email: z.string().email(), password: z.string().min(6) });


type Form = z.infer<typeof schema>;


export default function Login(){
    const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) });
    const login = useAuth((s) => s.login);
    const onSubmit = async (data: Form) => {
// TODO: call real /auth/login
        await new Promise(r => setTimeout(r, 500));
        login({ accessToken: 'demo', refreshToken: 'demo', user:{ id:'1', name:'Sahril', role: Role.USER } });
    };
    return (
        <div className="max-w-sm">
            <h1 className="text-xl font-semibold mb-3">Masuk</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <div>
                    <label className="block text-sm">Email</label>
                    <input className="w-full rounded border border-border bg-card p-2" {...register('email')} />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block text-sm">Password</label>
                    <input type="password" className="w-full rounded border border-border bg-card p-2" {...register('password')} />
                    {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
                </div>
                <button disabled={isSubmitting} className="px-3 py-2 rounded bg-[var(--accent)] text-black">{isSubmitting? '...' : 'Login'}</button>
            </form>
        </div>
    );
}