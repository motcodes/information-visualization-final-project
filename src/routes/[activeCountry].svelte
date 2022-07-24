<script context="module">
  export const prerender = true
</script>

<!-- script -->
<script>
  import { getTopoCountries } from '$lib/getTopoData'

  import { page } from '$app/stores'
  import Charts from '../charts/charts.svelte'
  import Center from '../center.svelte'

  let countryName

  $: countryName = $page.params.activeCountry
</script>

<!-- HTML Markup -->
<main>
  <div class="hero">
    <h1>Stackoverflow Data in {countryName}</h1>
    <a href="/">go back to the world Map</a>
  </div>
  <!-- await then block is a inline solution to render a loading state -->
  <!-- while awaiting a promise, which gets called in the :then block once fullfilled -->
  {#await getTopoCountries()}
    <Center>
      <p>loading map</p>
    </Center>
  {:then data}
    <Charts {data} {countryName} />
  {:catch}
    <Center>
      <p>error while loading map</p>
    </Center>
  {/await}
</main>

<style>
  main {
    margin: 0 auto;
    padding: 2rem 0rem;
    max-width: 1024px;
    text-align: center;
  }
  .hero {
    margin-block: 1rem 3rem;
  }
  .hero h1 {
    margin-bottom: 0.5rem;
  }
  .hero a {
    color: #ae77b3;
    text-decoration: none;
    transition: all 0.2s ease-out;
  }
  .hero a:hover {
    color: #7e4a83;
    text-decoration: underline;
  }
</style>
