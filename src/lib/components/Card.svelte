<script lang="ts">
    import { locale, t, type Locale } from '$lib/i18n';
    import { Frame, Flex, Button } from 'teletype-ui';

    interface Stack {
        text: string;
        icon?: string;
    }

    interface Props {
        name: string;
        stacks?: Stack[];
        description?: string;
        src?: string;
        href?: string;
    }

    let {
        name,
        stacks = [],
        description = '',
        src,
        href = ''
    }: Props = $props();
</script>

<Frame style="padding: 0; flex: 1; min-width: 18rem;">
    {#if src}
        <a {href}>
            <img class="showcase" loading="lazy" alt={`${name}-picture`} src={`showcase/${src}.webp`} />
        </a>
    {/if}
    <Flex direction="column" padding="s2">
        <span class="header"><b>{name}</b></span>
        <span class="muted">{description}</span>
        <Flex justify="flex-end">
            <Button {href} variant="variant">{t('seemore', $locale)}</Button>
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
        text-align: justify;
        text-justify: inter-word;
        color: var(--text-muted);
    }
</style>
