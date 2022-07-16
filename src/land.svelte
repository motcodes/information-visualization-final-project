<script>
  export let path

  let active = false

  function handleMouseEnter(event) {
    active = true
  }
  function handleMouseLeave(event) {
    active = false
  }
</script>

<path
  class={`land ${active && 'active'}`}
  d={path}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
/>

<style>
  .land {
    fill: #010101;
    stroke: red;
    cursor: pointer;
  }
  .active {
    fill: blue;
  }
</style>
