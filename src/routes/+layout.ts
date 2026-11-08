import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
    const [socialsRes, careerRes, educationRes, volunteeringRes] = await Promise.all([
        fetch('/data/socials.json'),
        fetch('/data/career.json'),
        fetch('/data/education.json'),
        fetch('/data/volunteering.json')
    ]);

    return {
        socials: socialsRes.ok ? await socialsRes.json() : [],
        career: careerRes.ok ? await careerRes.json() : [],
        education: educationRes.ok ? await educationRes.json() : [],
        volunteering: volunteeringRes.ok ? await volunteeringRes.json() : []
    };
};
