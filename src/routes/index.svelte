<!-- script -->
<script>
  import { getTopoCountries } from '$lib/getTopoData'
  import Marks from '../marks.svelte'
  import Tooltip from '../tooltip.svelte'
  import GraphModal from '../graphModal.svelte'
</script>

<!-- HTML Markup -->
<main>
  <!-- await then block is a inline solution to render a loading state -->
  <!-- while awaiting a promise, which gets called in the :then block once fullfilled -->
  {#await getTopoCountries()}
    <p>loading map</p>
  {:then data}
    <svg width="100vw" height="400px" id="map">
      <Marks {data} />
    </svg>
    <Tooltip />
    <GraphModal {data} />
  {:catch}
    <p>error while loading map</p>
  {/await}
</main>

<!-- Global Styles -->
<style global>
  body {
    margin: 0 0rem;
    /* overflow: hidden; */
    font-family: 'Helvetica', sans-serif;
  }
  main {
    position: relative;
  }
  pre {
    font-size: 7em;
  }
</style>
