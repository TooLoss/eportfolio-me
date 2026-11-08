// src/lib/i18n.ts
import { writable } from 'svelte/store';

const translations = {
    fr: {
        hero: {
            greeting: "Salut ! C'est Bilèle El Haddadi 👋",
            status: "ÉLÈVE INGÉNIEUR LOGICIEL · 2ÈME ANNÉE",
            location: "TOULOUSE · FRANCE 🇫🇷",
            bio: "J'aime écrire du code et créer de l'art numérique. Cela me permet de donner une forme concrète à mes idées. Quand je code, je me concentre sur la résolution de problèmes spécifiques et la création d'outils qui simplifient les tâches quotidiennes. Le meilleur, c'est de voir que d'autres trouvent mon travail utile ou inspirant. Cela rend la démarche encore plus riche de sens.",
            resume: "Voir le CV"
        },
        sections: {
            education: "Formation",
            projects: "Projets",
            career: "Experience professionnel",
            interests: "Centres d'intérêt",
            contacts: "Contacts"
        },
        education: {
            current: "Actuel",
            enseeiht: "Ingénieur en informatique à l'ENSEEIHT",
            enseeihtdesc: "Étudiant en génie logiciel à l'ENSEEIHT (l'n7), passionné par la conception logicielle, le code propre et l'architecture évolutive. Désireux de mettre à profit de solides bases théoriques et une expérience concrète des projets dans un poste stimulant en développement logiciel.",
            enseeihtcourse: "Cours principaux suivis à l'n7 (Filière Logiciel) :",
            enseeihtbutton: "Voir plus",
            prepa: "Classes préparatoires aux grandes écoles (CPGE) · MPSI/MP",
            prepadesc: "Formation supérieure intensive et pluridisciplinaire en mathématiques, physique et sciences industrielles, préparant aux concours nationaux d'entrée aux Grandes Écoles d'ingénieurs.",
            bac: "Baccalauréat - Mathématiques, Physique-Chimie, NSI · Mention Très Bien",
        }
    },
    en: {
        hero: {
            greeting: "Hi! This is Bilèle El Haddadi 👋",
            status: "SOFTWARE ENGINEER STUDENT · SECOND YEAR",
            location: "TOULOUSE · FRANCE 🇫🇷",
            bio: "I enjoy writing code and creating digital art. It lets me shape ideas into something concrete. When I code, I focus on solving specific problems and building tools that simplify daily tasks. The best part is seeing others find my work useful or inspiring. That makes it even more meaningful.",
            resume: "See resume"
        },
        sections: {
            education: "Education",
            projects: "Projects",
            career: "Career Development",
            interests: "Interest",
            contacts: "Contacts"
        },
        education: {
            current: "Present",
            enseeiht: "Computer Science Engineering Student at ENSEEIHT",
            enseeihtdesc: "Software Engineering Student at ENSEEIHT (l'n7) with a strong passion for software design, clean code, and scalable architecture. Eager to leverage solid theoretical foundations and hands-on project experience in a challenging software development role.",
            enseeihtcourse: "Relevant Coursework at ENSEEIHT (Software Engineering Track):",
            enseeihtbutton: "See more courses",
            prepa: "",
            prepadesc: "",
            bac: "French Baccalaureate Mathematics, Physics-Chemistry, Computer Science · Highest Honors",
        }
    },
} as const;

export type Locale = 'fr' | 'en';
export type TranslationKey = Leaves<typeof translations.fr>;

type Leaves<T, D extends string = ''> = T extends object
    ? { [K in keyof T]-?: Leaves<T[K], D extends '' ? `${K & string}` : `${D}.${K & string}`> }[keyof T]
    : D;

export const locale = writable<Locale>('fr');

export function t(key: TranslationKey, currentLocale: Locale): string {
    const keys = key.split('.') as (keyof typeof translations.fr)[];
    let value: any = translations[currentLocale];

    for (const k of keys) {
        value = value?.[k];
    }

    return value || key;
}
