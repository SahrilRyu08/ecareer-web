import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../utils';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'solid'|'outline'|'ghost';
    size?: 'sm'|'md'|'lg';
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
    { className, variant='solid', size='md', ...props }, ref
){
    const base = 'inline-flex items-center justify-center rounded-md border transition-colors disabled:opacity-60 disabled:cursor-not-allowed';
    const variants = {
        solid: 'bg-[var(--accent)] text-black border-border hover:opacity-90',
        outline: 'bg-card text-[var(--fg)] border-border hover:border-[var(--accent)]',
        ghost: 'bg-transparent text-[var(--fg)] border-transparent hover:bg-card'
    } as const;
    const sizes = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-9 px-4 text-sm',
        lg: 'h-10 px-5 text-base'
    } as const;

    return (
        <button
            ref={ref}
            className={cn(base, variants[variant], sizes[size], className)}
            {...props}
        />
    );
});
