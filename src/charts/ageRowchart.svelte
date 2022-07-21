<script>
  import { axisBottom, axisLeft, format, scaleBand, scaleLinear, select } from 'd3'
  import { activeCountry } from '$lib/store'
  import { ages, width, height } from '$lib/constants'
  import BarchartWrapper from './barchartWrapper.svelte'

  export let data

  const { countryDevelopers } = data

  let axisBottomRef, axisLeftRef
  let scaleX, scaleY, xTicks
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
    scaleX = scaleLinear()
      .domain([Math.max(...ageCount.values()), 0])
      .range([width, 0])
    scaleY = scaleBand().domain(ages).range([0, height])
    xTicks = scaleX.ticks().filter((tick) => Number.isInteger(tick))
    select(axisBottomRef).call(axisBottom(scaleX).tickValues(xTicks).tickFormat(format('d')))
    select(axisLeftRef).call(axisLeft(scaleY))
  }
</script>

{#key country}
  <BarchartWrapper>
    <!-- bottom axis -->
    <g bind:this={axisBottomRef} class="bottomAxis" transform={`translate(0, ${height})`} />
    <!-- left axis -->
    <g bind:this={axisLeftRef} class="leftAxis" scale={scaleY} />
    <!-- bars -->
    {#each [...ageCount] as [key, value]}
      <rect
        x={1}
        y={scaleY(key) || 0}
        width={scaleX(value) || 0}
        height={scaleY.bandwidth() - 16 || 0}
        fill="#f3daf5"
      />
    {/each}
  </BarchartWrapper>
{/key}

<style>
</style>
