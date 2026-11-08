import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const response = await fetch('/data/projects.json');
    if (!response.ok) {
        return { projects: [] };
    }
    
    const data = await response.json();

    const projects = data.map(({ id, name, shortdesc, images, stacks, url }: any) => ({
        id,
        name,
        description: shortdesc,
        src: images?.[0],
        stacks,
        url
    }));

    return { projects };
};
