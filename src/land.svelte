<!-- script -->
<script>
  import { activeCountry } from '$lib/store'

  export let path
  export let feature
  export let handleOnLand

  let element

  let country
  let isSameCountry = false
  const unsubscribe = activeCountry.subscribe((value) => {
    country = value
    isSameCountry = !value.isActive
  })

  // handleMouseEnter sets activeCountry to the current hovered feature (country) for the tooltip
  function handleMouseEnter(event) {
    // console.log(activeCountry)
    if (isSameCountry) {
      activeCountry.setFeature(feature)
    }
  }

  // handleMouseMove updates activeCountry with the mouse x and y position so the tooltip follows the mouse when moving
  function handleMouseMove(event) {
    if (isSameCountry) {
      activeCountry.setPosition(event.x, event.y)
    }
  }

  // handleMouseLeave resets activeCountry to the inital value
  function handleMouseLeave(event) {
    if (isSameCountry) {
      activeCountry.reset()
    }
  }

  function handleClick(event) {
    activeCountry.setFeature(feature)
    activeCountry.toggleActive()
    // element.classList.toggle('active', isSameCountry)
    // console.log(element.classList)
    handleOnLand(event)
  }
</script>

<!-- HTML Markup -->
<path
  class={`land`}
  d={path}
  data-value={feature.properties.name}
  bind:this={element}
  on:click={handleClick}
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
  .land.active {
    fill: #b876bd;
  }
</style>
