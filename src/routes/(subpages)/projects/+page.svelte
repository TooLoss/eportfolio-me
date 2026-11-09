<script lang="ts">
    import { Flex, Stack, Button } from 'teletype-ui';
    import { locale, t } from '$lib/i18n';
    import { ArrowRight, ArrowLeft } from '@lucide/svelte';
    import Card from '#lib/components/Card.svelte';
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    // Directly derive state from page data
    let projects = $derived(data.projects);

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
</script>

<svelte:head>
    <title>Projects</title> 
</svelte:head>

<Stack>
    <Flex justify="space-between" align="center">
        <h2>{t('sections.projects', $locale)}</h2>
        {#if totalPages > 1}
            <small>Page {currentPage} of {totalPages}</small>
        {/if}
    </Flex>

    <Flex>
        {#each paginatedProjects as project (project.id)}
            <Card 
                name={project.name} 
                description={project.description} 
                src={project.src} 
                stacks={project.stacks} 
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
</Stack>
