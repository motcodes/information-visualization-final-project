<!-- script -->
<script>
  import { getTopoCountries } from '$lib/getTopoData'
  import Info from '../info.svelte'
  import Marks from '../marks.svelte'
  import Tooltip from '../tooltip.svelte'
</script>

<!-- HTML Markup -->
<main>
  <!-- await then block is a inline solution to render a loading state -->
  <!-- while awaiting a promise, which gets called in the :then block once fullfilled -->
  {#await getTopoCountries()}
    <div class="center">
      <p>Loading World-Map...</p>
    </div>
  {:then data}
    <svg width="100vw" height="100vh" id="map">
      <Marks {data} />
    </svg>
    <Tooltip />
  {:catch}
    <div class="center">
      <p>error while loading map</p>
    </div>
  {/await}
  <Info />
</main>

<style>
  body {
    overflow: hidden;
  }

  .center {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
  }
</style>
