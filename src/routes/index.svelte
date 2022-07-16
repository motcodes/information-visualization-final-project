<script>
  import { getTopoData } from '$lib/getTopoData'
  import Marks from '../marks.svelte'

  const width = 960
  const height = 500
</script>

<h1>Welcome to SvelteKit</h1>

{#await getTopoData()}
  <p>loading map</p>
{:then data}
  <svg {width} {height}>
    <Marks {data} />
  </svg>
{/await}

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
