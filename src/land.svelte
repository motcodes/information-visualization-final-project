<!-- script -->
<script>
  import { activeCountry } from '$lib/store'

  export let path
  export let feature
  export let handleOnLand

  // handleMouseEnter sets activeCountry to the current hovered feature (country) for the tooltip
  const handleMouseEnter = (event) => {
    activeCountry.set(feature)
  }

  // handleMouseMove updates activeCountry with the mouse x and y position so the tooltip follows the mouse when moving
  const handleMouseMove = (event) => {
    activeCountry.update((feature) => ({ ...feature, x: event.x, y: event.y }))
  }

  // handleMouseLeave resets activeCountry to the inital value
  const handleMouseLeave = (event) => {
    activeCountry.set({})
  }
</script>

<!-- HTML Markup -->
<path
  class="land"
  d={path}
  data-value={feature.properties.name}
  on:click={handleOnLand}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:mousemove={handleMouseMove}
/>

<!-- Scoped Styles -->
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
