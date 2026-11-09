<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
    import { locale, t } from '$lib/i18n.js';
	import type { LayoutProps } from './$types';
    import { Earth } from '@lucide/svelte';

    import 'teletype-ui/tokens.css';
    import 'teletype-ui/base.css';

    import {
        Button,
        Stack,
        Flex
    } from 'teletype-ui';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div style="position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; pointer-events: none;">
    <div style="max-width: 1200px; margin: 0 auto; position: relative; width: 100%; pointer-events: auto;">
        <div style="position: absolute; top: 1rem; right: 1rem;">
            <Button variant='secondary' onclick={() => $locale = $locale === 'fr' ? 'en' : 'fr'}>
                {#if $locale === 'en'}
                    🇫🇷
                {:else}
                    🇬🇧
                {/if}
                Language
            </Button>
        </div>
    </div>
</div>

{@render children()}

<br />

<Stack align="center" gap="s4">
    <span>made with ♡</span>
    <span><a href="https://svelte.dev/" target="_blank">svelte</a> and my library <a href="https://teletype.bilele.tech/" target="_blank">teletype-ui</a></span>
    <span>© {new Date().getFullYear()} Bilèle EL HADDADI. MIT License.</span>
</Stack>
