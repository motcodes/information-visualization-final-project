<script>
  export let data
  console.log(data)

  import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3'

  const { land, interiors } = data

  const projection = geoNaturalEarth1()
  const path = geoPath(projection)
  const graticule = geoGraticule()
</script>

<g class="marks">
  <path class="sphere" d={path({ type: 'Sphere' })} />
  <path class="graticules" d={path(graticule())} />
  {#each land.features as feature}
    <path class="land" d={path(feature)} />
  {/each}
  <path class="interiors" d={path(interiors)} />
</g>

<style>
  .marks .land {
    fill: #137b80;
  }
  .marks .sphere {
    fill: #ececec;
  }
  .marks .interiors {
    fill: none;
    stroke: #43a4a8;
  }
  .marks .graticules {
    fill: none;
    stroke: #dadada;
  }
</style>
