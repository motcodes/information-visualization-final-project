<!-- script -->
<script>
  import { getTopoCountries } from '$lib/getTopoData'
  import Marks from '../marks.svelte'
  import Tooltip from '../tooltip.svelte'
</script>

<!-- HTML Markup -->
<h1>Welcome to SvelteKit</h1>
<main>
  <!-- await then block is a inline solution to render a loading state -->
  <!-- while awaiting a promise, which gets called in the :then block once fullfilled -->
  {#await getTopoCountries()}
    <p>loading map</p>
  {:then data}
    <svg width="100vw" height="80vh" id="map">
      <Marks {data} />
    </svg>
    <Tooltip />
  {:catch}
    <p>error while loading map</p>
  {/await}
</main>

<!-- Global Styles -->
<style global>
  body {
    margin: 0 0rem;
    overflow: hidden;
    font-family: 'Helvetica', sans-serif;
  }
  main {
    position: relative;
  }
  pre {
    font-size: 7em;
  }
</style>
