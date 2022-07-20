<script>
  export let data
  export let scaleX
  export let scaleY
  export let height

  $: scaleY
</script>

<!-- iterates through the map to create a corresponding rectangle -->
{#each [...data] as [key, value]}
  <rect
    x={scaleX(key) + 8}
    y={scaleY(value) || 0}
    width={scaleX.bandwidth() - 16}
    height={height - scaleY(value) || 0}
    fill="#f3daf5"
  />
{/each}
