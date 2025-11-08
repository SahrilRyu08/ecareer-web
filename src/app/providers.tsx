import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';


export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <>
            {children}
            <Toaster richColors position="top-right" />
        </>
    );
};