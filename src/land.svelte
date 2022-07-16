<script>
  export let path
  export let feature

  import { activeCountry } from '$lib/store'

  const handleMouseEnter = (event) => {
    activeCountry.set(feature)
  }

  const handleMouseMove = (event) => {
    activeCountry.update((feature) => ({ ...feature, x: event.x, y: event.y }))
  }

  const handleMouseLeave = (event) => {
    activeCountry.set({})
  }
</script>

<path
  class="land"
  d={path}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:mousemove={handleMouseMove}
/>

<style>
  .land {
    fill: #f3daf5;
    stroke: #745676;
    cursor: pointer;
  }
  .land:hover {
    fill: #da9cde;
  }
</style>
