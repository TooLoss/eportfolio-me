<script lang="ts">
    import { locale, t, type Locale } from '$lib/i18n';
    import { Frame, Flex, Button, Skeleton, Badge } from 'teletype-ui';
    import { SquareArrowOutUpRight, ArrowRight } from '@lucide/svelte';

    interface Stack {
        text: string;
        icon?: string;
    }

    interface Props {
        name?: string;
        stacks?: string[];
        description?: string;
        src?: string;
        href?: string;
        url?: string;
    }

    let {
        name = '',
        stacks = [],
        description = '',
        src,
        href = '',
        url
    }: Props = $props();
</script>

<Frame style="padding: 0; flex: 1; min-width: 32%;">
    <Flex gap="zero" direction="column" padding="zero" margin="zero" wrap={false} style="height: 100%;">
        <a {href}>
            <img class="showcase" loading="lazy" alt={`${name}-picture`} {src} />
        </a>

        <Flex direction="column" padding="s2" gap="s3" style="height: 100%;">
            <span class="header"><b>{name}</b></span>
            <Flex gap="s4">
                {#each stacks as stack}
                    <Badge><small>{stack}</small></Badge>
                {/each}
            </Flex>
            <span class="muted">{description}</span>
            <Flex direction="column" justify="flex-end" gap="s4" style="margin-top: auto; padding-top: 1rem;">
                {#if url}
                    <Button icon={SquareArrowOutUpRight} variant="secondary" href={url} target="_blank">Repository</Button>
                {/if}
                <Button {href} variant="variant">{t('seemore', $locale)}</Button>
            </Flex>
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
