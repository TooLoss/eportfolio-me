<script lang="ts">
    import { ArrowRight } from '@lucide/svelte';
    import { locale, t, type Locale } from '$lib/i18n';
    import type { LayoutData } from './$types';
    import type { PageData } from './$types';

    import TimelineItem from '#lib/components/TimelineItem.svelte';
    import Card from '#lib/components/Card.svelte';
    import Social from '#lib/components/Social.svelte';

    import {
        Header,
        Stack,
        Color,
        Flex,
        Button,
        TableOfContents,
        PictureGroup,
        Frame,
        hackreveal,
        typewriter
    } from 'teletype-ui';

    let { data }: { data: LayoutData } = $props();

    const socials = $derived(data.socials);
    const career = $derived(data.career);
    const education = $derived(data.education);
    const volunteering = $derived(data.volunteering);

    type CareerItem = PageData['career'][number];
    type EducationItem = CareerItem;

    function getJsonDate(item: CareerItem | EducationItem, locale: Locale) {
        const start = item.startMonth 
            ? formatDate(item.startYear, item.startMonth, locale) 
            : item.startYear.toString();

        if (item.current) {
            return `${start} - ${t('education.current', locale)}`;
        }

        if (item.endYear) {
            const end = item.endMonth 
                ? formatDate(item.endYear, item.endMonth, locale) 
                : item.endYear.toString();
            return `${start} - ${end}`;
        }

        return start;
    }

    function formatDate(year: number, month: number, locale: Locale) {
        const date = new Date(year, month - 1);
        return new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
            month: 'short',
            year: 'numeric'
        }).format(date);
    }
</script>

<svelte:head>
    <title>Home</title> 
</svelte:head>

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
    <h2 use:typewriter={{ duration: 1500, inViewOptions: { threshold: 0.5 } }}>
        {t('sections.career', $locale)}
    </h2>
    <Stack gap="s1">
        {#each career as c}
            <TimelineItem
                item={c}
                locale={$locale}
                date={getJsonDate(c, $locale)}
                noline
            />
        {/each}
    </Stack>
</Stack>

<Stack id="Projets">
    <h2 use:typewriter={{ duration: 1000, inViewOptions: { threshold: 0.5 } }}>
        {t('sections.projects', $locale)}
    </h2>

    <Stack>
        <Flex>
            <Card
                name="teletype-ui"
                src="showcase/teletype-ui1.webp"
                description="A classic computer-science-inspired UI component library designed for developer portfolios, technical showcases, and minimalist web applications." 
            />
            <Card
                name="Entropix"
                src="showcase/entropix1.webp"
                description="Entropix is a 2D grid-based particle simulation game developed in C++." 
            />
            <Frame style="flex-grow: 1;">
                <Flex direction="column" justify="center" style="flex-grow: 1; height: 100%;">
                    <span><b>{t('seeprojectsdesc', $locale)}</b></span>
                    <Button href="/projects" icon={ArrowRight} variant="variant">
                        {t('seeprojects', $locale)}
                    </Button>
                </Flex>
            </Frame>
        </Flex>
    </Stack>
</Stack>

<Stack>
    <h2 use:typewriter={{ duration: 1000, inViewOptions: { threshold: 0.5 } }}>
        {t('sections.education', $locale)}
    </h2>
    <Stack gap="zero">
        {#each education as e, i}
            <TimelineItem 
                item={e} 
                locale={$locale} 
                date={getJsonDate(e, $locale)} 
                end={i === education.length - 1} 
                spacing="3rem"
            />
        {/each}
    </Stack>
</Stack>

<Stack>
    <h2 use:typewriter={{ duration: 1000, inViewOptions: { threshold: 0.5 } }}>
        {t('sections.interests', $locale)}
    </h2>
    <Stack>
        <h3>Art</h3>

        <p>{@html t('interests.graph', $locale)}</p>

        <p>{@html t('interests.graphnet7', $locale)}</p>

        <div style="width: 70%; margin: auto; margin-top: var(--size-s2)">
            <PictureGroup height="40rem" srcs={["showcase/net7-swerc.webp", "showcase/net7-cdl.webp", "showcase/net7-cdl-2.webp"]} />
        </div>

        <Flex justify="center" style="width: 70%;">
            <div class="sketchfab-embed-wrapper"> <iframe title="Blastech DH-17 Star Wars Blaster" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/d5f8a98ddf1f45cc8dca359c5521d5ab/embed"> </iframe> </div>
            <div class="sketchfab-embed-wrapper"> <iframe title="Star Wars Empire Troop Transport | Andor" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/a33a4d5fceb74b929dbabb3cb5506b29/embed"> </iframe> </div>
            <div class="sketchfab-embed-wrapper"> <iframe title="Blastech B1-NA | Star Wars Blaster" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/a815aa634beb4aba8316b5850c20a00b/embed"> </iframe> </div>
        </Flex>
        
        <h3 style="margin-top: var(--size-s6);">{t('interests.volunteeringtitle', $locale)}</h3>
        <p>{@html t('interests.volunteeringdesc', $locale)}</p>

        <Stack gap="s1" style="margin-top: var(--size-s3);">
            {#each volunteering as v}
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <h4 style="font-size: 2rem; margin: 0;">{v.title}</h4>
                        <span class="muted" style="font-weight: normal; font-size: 0.9rem;">{v.date}</span>
                    </div>
                    <p class="muted">{@html t(v.description as any, $locale)}</p>
                    
                    {#if v.images && v.images.length > 0}
                        <div style="width: 70%; margin: auto; margin-top: var(--size-s2)">
                            <PictureGroup height="20rem" srcs={v.images} />
                        </div>
                    {/if}
                </div>
            {/each}
        </Stack>
    </Stack>
</Stack>

<Color>
    <Stack>
    <h2>
        {t('sections.contacts', $locale)}
    </h2>
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
</style>
