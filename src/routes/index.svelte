<!-- script -->
<script>
  import { getTopoCountries } from '$lib/getTopoData'
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
    <div class="info">
      <p>cool text</p>
      <p>cool text</p>
      <p>cool text</p>
    </div>
  {:catch}
    <div class="center">
      <p>error while loading map</p>
    </div>
  {/await}
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

  .info {
    position: fixed;
    bottom: 16px;
    left: 16px;
    padding: 0.5rem 1rem;
    max-width: 256px;
    width: 100%;
    border: 1px solid #745676;
    border-radius: 4px;
    background-color: #fef9fe;
  }
</style>
