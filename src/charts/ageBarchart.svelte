<script>
  import { axisBottom, axisLeft, format, scaleBand, scaleLinear, select } from 'd3'
  import { activeCountry } from '$lib/store'
  import { ages, width, height } from '$lib/constants'
  import Bars from './bars.svelte'
  import BarchartWrapper from './barchartWrapper.svelte'

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
      console.log(country)
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
    console.log(select(axisBottomRef).selectAll('.ticks'))
    scaleY = scaleLinear()
      .domain([0, Math.max(...ageCount.values())])
      .range([height, 0])
    scaleX = scaleBand().domain(ages).range([0, width])
    yTicks = scaleY.ticks().filter((tick) => Number.isInteger(tick))
    select(axisBottomRef)
      .call(axisBottom(scaleX))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-1em')
      .attr('dy', '0')
      .attr('transform', 'rotate(-65)')
    select(axisLeftRef).call(axisLeft(scaleY).tickValues(yTicks).tickFormat(format('d')))
  }
</script>

{#key country}
  <BarchartWrapper>
    <!-- bottom axis -->
    <g
      bind:this={axisBottomRef}
      class="bottomAxis"
      scale={scaleX}
      transform={`translate(0, ${height})`}
    />
    <!-- left axis -->
    <g bind:this={axisLeftRef} class="leftAxis" />
    <!-- bars -->
    <Bars data={ageCount} {scaleX} {scaleY} {height} />
  </BarchartWrapper>
{/key}

<style>
</style>
