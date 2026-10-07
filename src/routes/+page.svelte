<script lang="ts">
    import { onMount } from 'svelte';

    import Timeline from '$lib/components/Timeline.svelte';

    import {
        Header,
        Stack,
        Color,
        Flex,
        Social,
        Button,
        TableOfContents,
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
                    Hi! This is Bilèle El Haddadi 👋
                </h2>
                <Flex>
                    {#each socials as s}
                        <Social {...s} />
                    {/each}
                </Flex>
                <Stack gap="s5" paddingVertical="zero">
                    <span>SOFTWARE ENGINEER STUDENT · SECOND YEAR</span>
                    <a href="https://www.enseeiht.fr/fr/index.html" target="_blank" style="text-decoration: none;">ENSEEIHT</a>
                    <span>TOULOUSE · FRANCE 🇫🇷</span>
                </Stack>
            </Stack>
            
            <img class="header-logo" src="/logo-bilele.webp" alt="logo" />
        </Flex>
        <p>
            I enjoy writing code and creating digital art. It lets me shape ideas into something concrete. When I code, I focus on solving specific problems and building tools that simplify daily tasks. The best part is seeing others find my work useful or inspiring. That makes it even more meaningful.
        </p>
        <Flex>
            <Button variant="default">See resume</Button>
        </Flex>
    </Stack>
</Header>

<article>

<Color>
    <Stack>
        <TableOfContents />
    </Stack>
</Color>

<Stack gap="s2">
    <h2>Education</h2>
    <Stack gap="zero">
        <Timeline name="Mon education" date="67/67" description="Je faisais pas mal de choses en vrai" />
        <Timeline name="Tasty Crousty Business School" date="67/67" description="Je faisais pas mal de choses en vrai">
            test
        </Timeline>
    </Stack>
</Stack>

<Stack>
    <h2>Projects</h2>
</Stack>

<Stack>
    <h2>Career Development</h2>
</Stack>

<Stack>
    <h2>Interest</h2>
</Stack>

<Color>
    <Stack>
        <h2>Contacts</h2>
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
