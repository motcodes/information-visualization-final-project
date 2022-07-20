<script>
  import { axisBottom, axisLeft, format, scaleBand, scaleLinear, select } from 'd3'
  import { activeCountry } from '$lib/store'
  import { ages, margin, width, height } from '$lib/constants'
  import Bars from './bars.svelte'

  export let data

  const { countryDevelopers } = data

  let axisBottomRef, axisLeftRef
  let scaleX, scaleY, yTicks
  let country = []
  const ageCount = new Map()

  // surbscribe runs each time the activeCountry value updates
  // so each time another country gets selected.
  // inside the loop the ageCount for the barchart is set,
  // which updates each time another country is clicked on
  const unsubscribe = activeCountry.subscribe((value) => {
    if (value.properties && value.isActive) {
      country = countryDevelopers.get(value.properties.name)
      ageCount.clear()
      country.forEach((item) => {
        let ageValue = ageCount.get(item.Age) || 0
        ageValue += 1
        ageCount.set(item.Age, ageValue)
      })
    }
  })

  // "$: ..." is a reactive statement which runs these lines each time a value inside them changes
  // so if ageCount gets a new value, the scale has to recalculate and then upate the axis and bars
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
