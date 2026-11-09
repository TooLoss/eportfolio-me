<script lang="ts">
    import { locale, t, type Locale } from '$lib/i18n';
    import { Frame, Flex, Button, Skeleton } from 'teletype-ui';
    import { SquareArrowOutUpRight, ArrowRight } from '@lucide/svelte';

    interface Stack {
        text: string;
        icon?: string;
    }

    interface Props {
        name?: string;
        stacks?: Stack[];
        description?: string;
        src?: string;
        href?: string;
        loading?: boolean;
        url?: string;
    }

    let {
        name = '',
        stacks = [],
        description = '',
        src,
        href = '',
        loading = false,
        url
    }: Props = $props();
</script>

<Frame style="padding: 0; flex: 1; min-width: 32%;">
    <Flex gap="zero" direction="column" padding="zero" margin="zero" wrap={false} style="height: 100%;">
        {#if loading}
            <Skeleton style="aspect-ratio: 16/9; width: 100%; border-radius: 0;" />
        {:else if src}
            <a {href}>
                <img class="showcase" loading="lazy" alt={`${name}-picture`} {src} />
            </a>
        {/if}

        <Flex direction="column" padding="s2" gap="s3" style="height: 100%;">
            {#if loading}
                <Skeleton size="s4" style="width: 60%;" />
                <Skeleton size="s3" style="width: 100%;" />
                <Skeleton size="s3" style="width: 80%;" />
                <Flex justify="flex-end">
                    <Skeleton size="s3" style="width: 5rem; border-radius: var(--size-s5);" />
                </Flex>
            {:else}
                <span class="header"><b>{name}</b></span>
                <span class="muted">{description}</span>
                <Flex direction="column" justify="flex-end" gap="s4" style="margin-top: auto; padding-top: 1rem;">
                    {#if url}
                        <Button icon={SquareArrowOutUpRight} variant="secondary" href={url} target="_blank">Repository</Button>
                    {/if}
                    <Button {href} variant="variant">{t('seemore', $locale)}</Button>
                </Flex>
            {/if}
        </Flex>
    </Flex>
</Frame>

<style>
    .showcase {
        width: 100%;
        height: auto;
        object-fit: cover;
        display: block;
    }

    .header {
        font-family: 'Space Mono';
        font-size: 1.5rem;
    }

    .muted {
        color: var(--text-muted);
    }
</style>
