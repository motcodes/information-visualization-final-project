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
    fill: #010101;
  }
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
