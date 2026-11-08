import type { PageLoad, Entries } from './$types';

export const prerender = true;

export const entries: Entries = async () => {
    try {
        const res = await fetch('/data/projects.json');
        if (!res.ok) return [];
        const projects = await res.json();
        
        return projects.map((p: { id: string | number }) => ({
            id: p.id.toString()
        }));
    } catch {
        return [];
    }
};

export const load: PageLoad = async ({ params, fetch }) => {
    const res = await fetch('/data/projects.json');
    const projects = res.ok ? await res.json() : [];
    
    const project = projects.find((p: { id: string | number }) => p.id.toString() === params.id);

    return {
        project: project || null
    };
};
