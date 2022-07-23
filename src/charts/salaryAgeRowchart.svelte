<script>
  import { axisBottom, axisLeft, format, max, mean, scaleBand, scaleLinear, select } from 'd3'
  import { activeCountry } from '$lib/store'
  import { ages, width, height } from '$lib/constants'
  import BarchartWrapper from './barchartWrapper.svelte'

  export let data

  const { countryDevelopers } = data

  let axisBottomRef, axisLeftRef
  let scaleX, scaleY
  let xTicks, yTicks
  let country = []
  let chartData = new Map()
  let maxSalary = 0

  // surbscribe runs each time the activeCountry value updates
  // so each time another country gets selected.
  // inside the loop the compensationCount for the barchart is set,
  // which updates each time another country is clicked on
  const unsubscribe = activeCountry.subscribe((value) => {
    if (value.properties && value.isActive) {
      country = countryDevelopers.get(value.properties.name)
      chartData.clear()
      country.forEach((item) => {
        let salary = Number.isNaN(parseInt(item.CompTotal)) ? 0 : parseInt(item.CompTotal)
        if (salary > 1) {
          const counter = chartData.get(item.Age) || []
          chartData.set(item.Age, [...counter, salary])
        }
      })
      maxSalary = Math.max(...[...chartData.values()].map((item) => mean(item)))
    }
  })

  // "$: ..." is a reactive statement which runs these lines each time a value inside them changes
  // so if compensationCount gets a new value, the scale has to recalculate and then upate the axis and bars
  $: {
    scaleX = scaleLinear().domain([maxSalary, 0]).range([width, 0])
    scaleY = scaleBand().domain(ages).range([0, height])

    xTicks = scaleX.ticks().filter((tick) => Number.isInteger(tick))
    yTicks = scaleY.domain()

    select(axisBottomRef).call(axisBottom(scaleX).tickValues(xTicks).tickFormat(format('d')))
    select(axisLeftRef)
      .call(axisLeft(scaleY))
      .selectAll('g.tick')
      .append('title')
      .html((d) => d)
  }
</script>

{#key country}
  <BarchartWrapper>
    <!-- bottom axis -->
    <g bind:this={axisBottomRef} class="bottomAxis" transform={`translate(0, ${height})`} />
    <!-- left axis -->
    <g bind:this={axisLeftRef} class="leftAxis" scale={scaleY} />
    <!-- bars -->
    {#each [...chartData] as [key, value]}
      <rect
        x={1}
        y={scaleY(key) + 8 || 0}
        width={scaleX(mean(value)) || 0}
        height={scaleY.bandwidth() - 16 || 0}
        fill="#f3daf5"
      />
    {/each}
  </BarchartWrapper>
{/key}

<style>
</style>
