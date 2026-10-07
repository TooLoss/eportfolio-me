<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

    import 'teletype-ui/tokens.css';
    import 'teletype-ui/base.css';

    import {
        Flex,
        Stack
    } from 'teletype-ui';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<br />

<Stack align="center" gap="s4">
    <span>made with ♡</span>
    <span><a href="https://svelte.dev/" target="_blank">svelte</a> and my library <a href="https://teletype.bilele.tech/" target="_blank">teletype-ui</a></span>
    <span>© {new Date().getFullYear()} Bilèle EL HADDADI. MIT License.</span>
</Stack>
