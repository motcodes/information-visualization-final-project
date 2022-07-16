<script>
  export let data
  import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3'
  import Land from './land.svelte'

  const { dataMap, features } = data

  const projection = geoNaturalEarth1()
  const path = geoPath(projection)
  const graticule = geoGraticule()
</script>

<g class="marks">
  <path class="sphere" d={path({ type: 'Sphere' })} />
  <path class="graticules" d={path(graticule())} />
  {#each features as feature}
    <Land path={path(feature)} />
  {/each}
</g>

<style>
  .marks .sphere {
    fill: #fcfcfc;
  }
  .marks .interiors {
    fill: none;
    stroke: #feb659;
  }
  .marks .graticules {
    fill: none;
    stroke: #feb659;
  }
</style>
