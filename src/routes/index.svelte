<script>
  import { getTopoData } from '$lib/getTopoData'
  import Marks from '../marks.svelte'

  const width = 960
  const height = 960
</script>

<h1>Welcome to SvelteKit</h1>

<main>
  {#await getTopoData()}
    <p>loading map</p>
  {:then data}
    <svg {width} {height}>
      <Marks {data} />
    </svg>
  {:catch error}
    <p>error while loading map</p>
  {/await}
</main>

<style global>
  body {
    margin: 0 1rem;
    overflow: hidden;
    font-family: 'Helvetica', sans-serif;
  }
  pre {
    font-size: 7em;
  }
</style>
