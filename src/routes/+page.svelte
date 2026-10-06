<script lang="ts">
    import {
        Header,
        Stack,
        Color,
        Flex,
        Social,
        hackreveal
    } from 'teletype-ui';
</script>

<Header>
    <Flex style="height: 100%; align-items: center; min-height: 0;">
        <Stack style="min-height: 0;">
            <h2 use:hackreveal={{ duration: 1500, inViewOptions: { threshold: 0.5 } }}>
                Hi! This is Bilèle El Haddadi 👋
            </h2>
            <Stack gap="s5" paddingVertical="zero">
                <span>SOFTWARE ENGINEER STUDENT · SECOND YEAR</span>
                <a href="https://www.enseeiht.fr/fr/index.html" target="_blank" style="text-decoration: none;">ENSEEIHT</a>
                <span>TOULOUSE · FRANCE 🇫🇷</span>
            </Stack>
        </Stack>
        
        <img class="header-logo" src="/logo-bilele.webp" alt="logo" />
    </Flex>
</Header>

<Color>
</Color>

<style>
    .header-logo {
        height: 100%;
        max-height: 100%;
        width: auto;
        object-fit: contain;
        min-height: 0;
    }
</style>
