<!-- script -->
<script>
  import { activeCountry } from '$lib/store'
  import { goto } from '$app/navigation'

  export let path
  export let feature
  export let developerPerCountry = new Map()

  const isAvailable = [...developerPerCountry.keys()].find((key) => key === feature.properties.name)

  let country, element
  let isSameCountry = false
  const unsubscribe = activeCountry.subscribe((value) => {
    country = value
    isSameCountry = !value.isActive
  })

  // handleMouseEnter sets activeCountry to the current hovered feature (country) for the tooltip
  function handleMouseEnter(event) {
    if (isSameCountry && isAvailable) {
      activeCountry.setFeature(feature)
    }
  }

  // handleMouseMove updates activeCountry with the mouse x and y position so the tooltip follows the mouse when moving
  function handleMouseMove(event) {
    if (isSameCountry && isAvailable) {
      activeCountry.setPosition(event.x, event.y)
    }
  }

  // handleMouseLeave resets activeCountry to the inital value
  function handleMouseLeave(event) {
    if (isSameCountry && isAvailable) {
      activeCountry.reset()
    }
  }

  function handleClick(event) {
    if (isAvailable) {
      activeCountry.setFeature(feature)
      activeCountry.toggleActive()
      goto(`/${feature.properties.name}`)
    }
  }
</script>

<!-- HTML Markup -->
<path
  class={`land ${isAvailable ? 'available' : ''}`}
  d={path}
  data-value={feature.properties.name}
  bind:this={element}
  on:click={handleClick}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:mousemove={handleMouseMove}
  aria-disabled={!isAvailable}
/>

<!-- Scoped Styles -->
<style>
  .land {
    fill: #b4a3bc;
    stroke: #745676;
    cursor: not-allowed;
  }
  .land.available {
    fill: #f3daf5;
    cursor: pointer;
  }
  .land.available:hover {
    fill: #da9cde;
  }
  .land.available.active {
    fill: #b876bd;
  }
</style>
