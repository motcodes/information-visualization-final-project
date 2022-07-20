<!-- script -->
<script>
  import { activeCountry } from '$lib/store'

  // activeCountry.subscribe listens for changes of the activeCountry store
  // if the value changes it updates the local country value
  // which will change the tooltip text as well as the current tooltips x and y position
  let country
  const unsubscribe = activeCountry.subscribe((value) => {
    country = value
  })
</script>

<!-- HTML Markup -->
<!-- checks if country object is empty or not -->
{#if Object.keys(country).length && country.properties}
  <div class="tooltip" style="top: {country.y}px; left: {country.x + 8}px;">
    <p>{country.properties.name}</p>
  </div>
{/if}

<!-- scoped Styles -->
<style>
  .tooltip {
    position: absolute;
    border: 1px solid #745676;
    background: #f3daf5;
    border-radius: 4px;
    transform: translateY(-245%);
  }
  .tooltip p {
    margin: 0;
    padding: 0.5rem 1rem;
  }
</style>
