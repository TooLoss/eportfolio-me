<script lang="ts">
    import { SquareArrowOutUpRight } from '@lucide/svelte';
    import { locale, t, type Locale } from '$lib/i18n';
    import { onMount } from 'svelte';

    import Card from '#lib/components/Card.svelte';
    import Social from '#lib/components/Social.svelte';

    import {
        Header,
        Stack,
        Color,
        Flex,
        Button,
        TableOfContents,
        Timeline,
        hackreveal
    } from 'teletype-ui';

    type SocialItem = {
        name: string;
        url: string;
        icon: string;
    };

    let socials = $state<SocialItem[]>([]);

    // load data
    onMount(async () => {
        try {
            const response = await fetch('/data/socials.json');
            socials = await response.json();
        } catch (error) {
            console.error('Failed to load socials:', error);
        }
    });

    function formatDate(year: number, month: number, locale: Locale) {
        const date = new Date(year, month - 1);
        return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
            month: 'short',
            year: 'numeric'
        }).format(date);
    }
</script>

<Header>
    <Stack gap="s2">
        <Flex direction="row" align="center" justify="space-between" style="flex-wrap: wrap-reverse; width: 100%;">
            <Stack style="width: auto; margin: 0;" paddingHorizontal="zero" paddingVertical="zero">
                <h2 use:hackreveal={{ duration: 1500, inViewOptions: { threshold: 0.5 } }}>
                    {t('hero.greeting', $locale)}
                </h2>
                <Flex>
                    {#each socials as s}
                        <Social {...s} />
                    {/each}
                </Flex>
                <Stack gap="s5" paddingVertical="zero">
                    <span>{t('hero.status', $locale)}</span>
                    <a href="https://www.enseeiht.fr/fr/index.html" target="_blank" style="text-decoration: none;">ENSEEIHT</a>
                    <span>{t('hero.location', $locale)}</span>
                </Stack>
            </Stack>
            
            <img class="header-logo" src="/logo-bilele.webp" alt="logo" />
        </Flex>
        <p>
            {t('hero.bio', $locale)}
        </p>
        <Flex>
            <Button variant="default">{t('hero.resume', $locale)}</Button>
        </Flex>
    </Stack>
</Header>

<article>

<Color>
    <Stack>
        <TableOfContents />
    </Stack>
</Color>

<Stack>
    <h2>{t('sections.career', $locale)}</h2>
    <Stack gap="s1">
        <Timeline 
            noline
            name={t('career.net7', $locale)} 
            date={`2025 - ${t('education.current', $locale)}`} 
        >
            <Flex wrap={false} align="center" gap="s2">
                <a target="_blank" href="https://net7.dev" aria-label="Lien vers net7">
                    <img src='/logos/net7-glow.webp' loading="lazy" alt="net7 logo" style="height: 9rem;"/>
                </a>
                <div>
                    <p class="muted">{t('career.net7desc', $locale)}</p>
                    <Stack paddingVertical="s3" paddingHorizontal="zero">
                        <ul>
                            <li class="muted">Full Stack Development (Svelte, SvelteKit)</li>
                            <li class="muted">DevOps (Kubernetes, Docker, &hellip;)</li>
                            <li class="muted">SysAdmin (Linux, Nginx, Proxmox, k8s, &hellip;)</li>
                            <li class="muted">Programming contests (SWERC)</li>
                        </ul>
                        <Flex justify="flex-end">
                            <Button icon={SquareArrowOutUpRight} target="_blank" href="https://net7.dev" variant="secondary">{t('seemore', $locale)}</Button>
                        </Flex>
                    </Stack>
                </div>
            </Flex>
        </Timeline>

        <Timeline
            noline
            name={t('career.stagenet7', $locale)} 
            date={`${formatDate(2026, 6, $locale)} - ${formatDate(2026, 7, $locale)}`}
        >
            <p class="muted">{t('career.stagenet7desc', $locale)}</p>
            <Stack paddingVertical="s3" paddingHorizontal="zero">
                <ul>
                    <li class="muted">Implemented reactive interfaces using Svelte and built backend application logic.</li>
                    <li class="muted">Modeled and queried relational databases using PostgreSQL and the Prisma ORM.</li>
                    <li class="muted">Integrated secure authentication flows via Authentik interfaced with an LDAP directory service.</li>
                    <li class="muted">Deployed and configured services on self-hosted k8s cluster Kubernetes.</li>
                </ul>
                <Flex justify="flex-end">
                    <Button href="#Projets" variant="secondary">{t('seeprojects', $locale)}</Button>
                </Flex>
            </Stack>
        </Timeline>

        <Timeline
            noline
            name={t('career.prof', $locale)} 
            date={`2024 - ${t('education.current', $locale)}`} 
            description={t('career.profdesc', $locale)}
        >
        </Timeline>
    </Stack>
</Stack>

<Stack id="Projets">
    <h2>{t('sections.projects', $locale)}</h2>

    <Flex>
        <Card
            name="Test"
        />
    </Flex>
</Stack>

<Stack>
    <h2>{t('sections.education', $locale)}</h2>
    <Stack gap="zero">
        <Timeline 
            name={t('education.enseeiht', $locale)} 
            date={`2025 - ${t('education.current', $locale)}`} 
            description={t('education.enseeihtdesc', $locale)}
        >
            <Stack paddingVertical="s5" paddingHorizontal="zero" style="padding-bottom: var(--size-s1);">
                <p class="muted">{t('education.enseeihtcourse', $locale)}</p>
                <ul>
                    <li class="muted">Advanced Object-Oriented Programming (OOP)</li>
                    <li class="muted">Advanced Functional Programming</li>
                    <li class="muted">Software Architecture & Design Patterns</li>
                    <li class="muted">Concurrent and Parallel Programming</li>
                </ul>
                <Flex justify="flex-end">
                    <Button variant="secondary">{t('education.enseeihtbutton', $locale)}</Button>
                </Flex>
            </Stack>
        </Timeline>

        <Timeline 
            name={t('education.prepa', $locale)} 
            date="2023 - 2025" 
            description={t('education.prepadesc', $locale)} 
        >
            <br style="height: var(--size-s2)" />
        </Timeline>

        <Timeline 
            end 
            name={t('education.bac', $locale)}
            date="2023" 
        />
    </Stack>
</Stack>

<Stack>
    <h2>{t('sections.interests', $locale)}</h2>
</Stack>

<Color>
    <Stack>
        <h2>{t('sections.contacts', $locale)}</h2>
    </Stack>
</Color>

</article>

<style>
    .header-logo {
        max-width: 200px;
        max-height: 100%;
        width: auto;
        object-fit: contain;
        min-height: 0;
    }

    .muted {
        color: var(--text-muted)
    }

    ul {
        list-style: none;
        padding-left: 0;
    }

    li {
        margin-bottom: 5px;
    }

    li::before {
        content: "- ";
        font-weight: bold;
        margin-left: var(--size-s2);
        margin-right: var(--size-s4);
    }
</style>
