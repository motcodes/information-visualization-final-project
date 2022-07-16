<script>
  export let data
  // export let svg

  import { geoEquirectangular, geoPath, geoGraticule, zoom, select } from 'd3'
  import { onMount } from 'svelte'
  import Land from './land.svelte'

  const { dataMap, features } = data

  const projection = geoEquirectangular()
  const path = geoPath(projection)
  const graticule = geoGraticule()

  let svg
  let g
  onMount(() => {
    svg = select('svg#map')
    g = select('g.marks')
    const zoomFn = zoom()
      .scaleExtent([1, 10])
      .on('zoom', (event, d) => {
        g.selectAll('path').attr('transform', event.transform)
      })

    svg.call(zoomFn)
  })
</script>

<g class="marks">
  <path class="sphere" d={path({ type: 'Sphere' })} />
  <path class="graticules" d={path(graticule())} />
  {#each features as feature}
    <Land path={path(feature)} {feature} />
  {/each}
</g>

<style>
  .marks .sphere {
    fill: #fcfcfc;
  }

  .marks .graticules {
    fill: none;
    stroke: #fde6ff;
  }
</style>
