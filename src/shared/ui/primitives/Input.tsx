import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from './Button';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
    { className, ...props }, ref
){
    return (
        <input
            ref={ref}
            className={cn(
                'w-full rounded-md border border-border bg-card text-[var(--fg)]',
                'px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
                className
            )}
            {...props}
        />
    );
});
