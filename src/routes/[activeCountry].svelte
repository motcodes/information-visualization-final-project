<script context="module">
  export const prerender = true
</script>

<!-- script -->
<script>
  import { getTopoCountries } from '$lib/getTopoData'

  import { page } from '$app/stores'
  import Charts from '../charts/charts.svelte'

  let countryName

  $: countryName = $page.params.activeCountry
</script>

<!-- HTML Markup -->
<main>
  <h1>Stackoverflow Data in {countryName}</h1>
  <!-- await then block is a inline solution to render a loading state -->
  <!-- while awaiting a promise, which gets called in the :then block once fullfilled -->
  {#await getTopoCountries()}
    <p>loading map</p>
  {:then data}
    <Charts {data} {countryName} />
  {:catch}
    <p>error while loading map</p>
  {/await}
</main>
