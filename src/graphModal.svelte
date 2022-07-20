<script>
  import { axisBottom, axisLeft, format, scaleBand, scaleLinear, select } from 'd3'
  import { onMount } from 'svelte'
  import { activeCountry } from '$lib/store'
  import Bars from './bars.svelte'
  export let data

  const ages = [
    'Under 18 years old',
    '18-24 years old',
    '25-34 years old',
    '35-44 years old',
    '45-54 years old',
    '55-64 years old',
    '65 years or older',
    'Prefer not to say'
  ]
  const margin = { top: 10, right: 0, bottom: 20, left: 50 }
  const width = 600 - margin.left - margin.right
  const height = 500 - margin.top - margin.bottom

  const { countryDevelopers } = data

  let axisBottomRef, axisLeftRef
  let scaleX, scaleY, yTicks
  let country = []
  const ageCount = new Map()

  const countOccur = (dataset, key, searchValue) =>
    dataset.reduce((n, value) => {
      console.log(value[key])
      return n + (value[key] == searchValue)
    }, 0)

  const unsubscribe = activeCountry.subscribe((value) => {
    if (value.properties && value.isActive) {
      country = countryDevelopers.get(value.properties.name)
      ageCount.clear()
      country.forEach((item) => {
        let ageValue = ageCount.get(item.Age) || 0
        ageValue += 1
        ageCount.set(item.Age, ageValue)
      })
      console.log(ageCount)
    }
  })

  $: {
    scaleY = scaleLinear()
      .domain([0, Math.max(...ageCount.values())])
      .range([height, 0])
    scaleX = scaleBand().domain(ages).range([0, width])
    yTicks = scaleY.ticks().filter((tick) => Number.isInteger(tick))
    select(axisBottomRef).call(axisBottom(scaleX))
    select(axisLeftRef).call(axisLeft(scaleY).tickValues(yTicks).tickFormat(format('d')))
  }
</script>

{#key country}
  <div class="modal">
    <svg
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
      id="modalGraph"
    >
      <g class="bar" transform={`translate(${margin.left}, ${margin.top})`}>
        <g bind:this={axisBottomRef} scale={scaleX} transform={`translate(0, ${height})`} />
        <g bind:this={axisLeftRef} />
        <Bars data={ageCount} {scaleX} {scaleY} {height} />
      </g>
    </svg>
  </div>
{/key}

<style>
  .modal {
    margin-left: 100px;
  }
</style>
