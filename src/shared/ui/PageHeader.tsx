import { PropsWithChildren } from 'react';
export const PageHeader = ({ title, children }: PropsWithChildren<{ title: string }>) => (
    <div className="mb-4 flex items-end justify-between">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex items-center gap-2">{children}</div>
    </div>
);