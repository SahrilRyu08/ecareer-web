import { useState } from 'react';
import { PageHeader } from '@/shared/ui/PageHeader';


export default function MentorChatPage(){
    const [messages, setMessages] = useState<{ from:'me'|'mentor'; text:string }[]>([
        { from:'mentor', text:'Halo, apa tujuan kariermu 6 bulan ke depan?' }
    ]);
    const [text,setText] = useState('');
    return (
        <div className="space-y-3">
            <PageHeader title="Mentor Chat" />
            <div className="border border-border rounded-2xl p-3 min-h-[200px]">
                {messages.map((m,i)=>(
                    <div key={i} className={m.from==='me'?'text-right':'text-left'}>
                        <span className="inline-block my-1 px-2 py-1 rounded bg-card">{m.text}</span>
                    </div>
                ))}
            </div>
            <form className="flex gap-2" onSubmit={e=>{e.preventDefault(); if(text.trim()){ setMessages([...messages,{from:'me',text}]); setText(''); }}}>
                <input className="flex-1 rounded border border-border bg-card p-2" value={text} onChange={e=>setText(e.target.value)} placeholder="Tulis pesan…" />
                <button className="px-3 py-2 rounded bg-[var(--accent)] text-black">Kirim</button>
            </form>
        </div>
    );
}