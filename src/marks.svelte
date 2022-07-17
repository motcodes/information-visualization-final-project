<!-- script -->
<script>
  import { geoEquirectangular, geoPath, geoGraticule, zoom, select } from 'd3'
  import { onMount } from 'svelte'
  import Land from './land.svelte'

  export let data
  const { dataMap, features } = data

  // geoEquirectangular is the type of map
  // path transforms arc values to svg values
  // graticule are the latitude and longitude lines (depending on the projection)
  const projection = geoEquirectangular()
  const path = geoPath(projection)
  const graticule = geoGraticule()

  // init svg and svg-group elements
  let svg
  let g

  // onMount runs after the markup is rendered
  // once there is the svg and g element we can use them in the d3 context
  onMount(() => {
    svg = select('svg#map')
    g = select('g.marks')

    // zoom is a d3 function and listens for a panning or zooming event
    // it's possible to zoom in 10 times the original size.
    // event.transfrom is responible for the scale value
    const zoomFn = zoom()
      .scaleExtent([1, 10])
      .on('zoom', (event, d) => {
        g.selectAll('path').attr('transform', event.transform)
      })

    // this function only runs inside the svg element
    svg.call(zoomFn)
  })
</script>

<!-- HTML Markup -->
<g class="marks">
  <path class="sphere" d={path({ type: 'Sphere' })} />
  <path class="graticules" d={path(graticule())} />
  {#each features as feature}
    <Land path={path(feature)} {feature} />
  {/each}
</g>

<!-- scoped Styles -->
<style>
  .marks .sphere {
    fill: #fcfcfc;
  }

  .marks .graticules {
    fill: none;
    stroke: #fde6ff;
  }
</style>
