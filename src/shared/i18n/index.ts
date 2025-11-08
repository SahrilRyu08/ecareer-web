const dict = {
    id: await import('./id.json'),
    en: await import('./en.json')
};
let lang: 'id'|'en' = (localStorage.getItem('lang') as any) || 'id';


export const t = (key: string) => (dict[lang].default as any)[key] ?? key;
export const setLang = (l:'id'|'en') => { lang = l; localStorage.setItem('lang', l); };