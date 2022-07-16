<script>
  import { getTopoCountries } from '$lib/getTopoData'
  import Marks from '../marks.svelte'
  import Tooltip from '../tooltip.svelte'

  const width = 960
  const height = 960
</script>

<h1>Welcome to SvelteKit</h1>

<main>
  {#await getTopoCountries()}
    <p>loading map</p>
  {:then data}
    <svg {width} {height}>
      <Marks {data} />
    </svg>
    <Tooltip />
  {:catch}
    <p>error while loading map</p>
  {/await}
</main>

<style global>
  body {
    margin: 0 1rem;
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
