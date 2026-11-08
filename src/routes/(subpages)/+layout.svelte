<script lang="ts">
    import { locale, t, type Locale } from '$lib/i18n';
    import { Button, Flex, Stack } from 'teletype-ui';
    import type { LayoutProps } from './$types';
    import { ArrowLeft } from '@lucide/svelte'

    let { children }: LayoutProps = $props();

    function goBack() {
        if (typeof window !== 'undefined') {
            history.back();
        }
    }
</script>

<div class="subpage">
    <Button icon={ArrowLeft} onclick={goBack}>{t('back', $locale)}</Button>
</div>

{@render children()}

<style>
    .subpage {
        max-width: min(1200px, 100%);
        padding: var(--size-s2);
        margin: auto;
    }
</style>
