<!-- script -->
<script>
  import { getTopoCountries } from '$lib/getTopoData'
  import Center from '../center.svelte'
  import Info from '../info.svelte'
  import Marks from '../marks.svelte'
  import Tooltip from '../tooltip.svelte'
</script>

<!-- HTML Markup -->
<main>
  <!-- await then block is a inline solution to render a loading state -->
  <!-- while awaiting a promise, which gets called in the :then block once fullfilled -->
  {#await getTopoCountries()}
    <Center>
      <p>Loading World-Map...</p>
    </Center>
  {:then data}
    <svg width="100vw" height="100vh" id="map">
      <Marks {data} />
    </svg>
    <Tooltip />
  {:catch}
    <Center>
      <p>error while loading map</p>
    </Center>
  {/await}
  <Info />
</main>

<style>
  body {
    overflow: hidden;
  }
</style>
