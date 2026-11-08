<script lang="ts">
    import { onMount } from 'svelte';
    import { Flex, Stack, Skeleton, Button } from 'teletype-ui';
    import { locale, t, type Locale } from '$lib/i18n';
    import { ArrowRight, ArrowLeft } from '@lucide/svelte';
    import Card from '#lib/components/Card.svelte';

    type ProjectSummary = {
        id: number;
        name: string;
        description: string;
        src?: string;
        stacks?: string[];
        url?: string;
    };

    let projects = $state<ProjectSummary[]>([]);
    let loading = $state(true);

    // Pagination
    let currentPage = $state(1);
    const pageSize = 6;

    let totalPages = $derived(Math.ceil(projects.length / pageSize));
    let paginatedProjects = $derived(
        projects.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    );

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage++;
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }

    onMount(async () => {
        try {
            const response = await fetch('/data/projects.json');
            if (!response.ok) throw new Error('Failed to load projects');
            
            const data = await response.json();

            projects = data.map(({ id, name, shortdesc, images, stacks, url }: any) => ({
                id,
                name,
                description: shortdesc,
                src: images?.[0],
                stacks,
                url
            }));
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            loading = false;
        }
    });
</script>

<svelte:head>
    <title>Projects</title> 
</svelte:head>

<Stack marginVertical="zero">
    <Flex justify="space-between" align="center">
        <h2>{t('sections.projects', $locale)}</h2>
        {#if !loading && totalPages > 1}
            <small>Page {currentPage} of {totalPages}</small>
        {/if}
    </Flex>

    {#if loading}
        <Flex wrap="wrap">
            {#each Array(pageSize) as _}
                <Card loading={true} />
            {/each}
        </Flex>
    {:else}
        <Flex wrap="wrap">
            {#each paginatedProjects as project (project.id)}
                <Card 
                    name={project.name} 
                    description={project.description} 
                    src={project.src} 
                    href={`/projects/s/${project.id}`} 
                    url={project.url}
                />
            {/each}
        </Flex>

        {#if totalPages > 1}
            <Flex justify="center" align="center" gap="s2" style="margin-top: 2rem;">
                <Button 
                    onclick={prevPage} 
                    disabled={currentPage === 1}
                    icon={ArrowLeft}
                    variant="secondary"
                />

                <span>Page {currentPage} / {totalPages}</span>

                <Button 
                    onclick={nextPage} 
                    disabled={currentPage === totalPages}
                    icon={ArrowRight}
                    variant="secondary"
                />
            </Flex>
        {/if}
    {/if}
</Stack>
