<script lang="ts">
    import { Frame, Flex } from 'teletype-ui';

    interface Props {
        name: string;
        description?: string;
        src?: string;
        href?: string;
    }

    let {
        name,
        description,
        src,
        href
    }: Prosp = $props();
</script>

<Frame>
    <Flex direction="column">
        <span><b>{name}</b></span>
    </Flex>
</Frame>
