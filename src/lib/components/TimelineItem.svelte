<script lang="ts">
    import { SquareArrowOutUpRight, ArrowRight } from '@lucide/svelte';
    import { t, type Locale } from '$lib/i18n';
    import { Flex, Stack, Button, Timeline } from 'teletype-ui';

    interface Props {
        item: {
            name: Parameters<typeof t>[0];
            description?: Parameters<typeof t>[0];
            startYear: number;
            startMonth?: number | null;
            endYear?: number | null;
            endMonth?: number | null;
            current?: boolean;
            points?: string[];
            img?: string;
            url?: string;
        };
        locale: Locale;
        date: string;
        end?: boolean;
        noline?: boolean;
        spacing?: string;
    }

    let { item, locale, date, end = false, noline = false, spacing = '' }: Props = $props();

    let isExternal = $derived(item.url?.startsWith('http://') || item.url?.startsWith('https://'));
    
    let linkTarget = $derived(isExternal ? '_blank' : '_self');
    let linkIcon = $derived(isExternal ? SquareArrowOutUpRight : ArrowRight);
</script>

<Timeline name={t(item.name, locale)} {date} {end} {noline}>
    <Flex align="center" gap="s2">
        {#if item.img}
            <a target={linkTarget} href={item.url} aria-label={`Lien vers ${t(item.name, locale)}`}>
                <img src={item.img} loading="lazy" alt="logo" style="height: 9rem;" />
            </a>
        {/if}
        <div style="flex: 1; min-width: 0;">
            {#if item.description}
                <p class="muted">{t(item.description, locale)}</p>
            {/if}
            
            {#if item.points && item.points.length > 0}
                <Stack paddingVertical="s3" paddingHorizontal="zero">
                    <ul>
                        {#each item.points as point}
                            <li class="muted">{@html point}</li>
                        {/each}
                        {#if item.url}
                            <Flex justify="flex-end">
                                <Button icon={linkIcon} target={linkTarget} href={item.url} variant="secondary">
                                    {t('seemore', locale)}
                                </Button>
                            </Flex>
                        {/if}
                    </ul>
                </Stack>
            {/if}
        </div>
    </Flex>
    {#if spacing}
        <div style={`height: ${spacing};`}></div>
    {/if}
</Timeline>

<style>
    .muted {
        color: var(--text-muted);
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
