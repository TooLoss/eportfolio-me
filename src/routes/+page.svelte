<script lang="ts">
    import { locale, t, type Locale } from '$lib/i18n';
    import { onMount } from 'svelte';

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
    <Stack gap="zero">
    </Stack>
</Stack>

<Stack>
    <h2>{t('sections.projects', $locale)}</h2>
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
