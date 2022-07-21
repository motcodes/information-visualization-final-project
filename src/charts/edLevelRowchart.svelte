<script>
  import { axisBottom, axisLeft, format, scaleBand, scaleLinear, select } from 'd3'
  import { activeCountry } from '$lib/store'
  import { edLevels, width, height } from '$lib/constants'
  import BarchartWrapper from './barchartWrapper.svelte'

  export let data

  const { countryDevelopers } = data

  let axisBottomRef, axisLeftRef
  let scaleX, scaleY
  let xTicks, yTicks
  let country = []
  const edLevelCount = new Map()

  // surbscribe runs each time the activeCountry value updates
  // so each time another country gets selected.
  // inside the loop the edLevelCount for the barchart is set,
  // which updates each time another country is clicked on
  const unsubscribe = activeCountry.subscribe((value) => {
    if (value.properties && value.isActive) {
      country = countryDevelopers.get(value.properties.name)
      edLevelCount.clear()
      country.forEach((item) => {
        let ageValue = edLevelCount.get(item.EdLevel) || 0
        ageValue += 1
        edLevelCount.set(item.EdLevel, ageValue)
      })
      console.log(edLevelCount)
    }
  })

  // "$: ..." is a reactive statement which runs these lines each time a value inside them changes
  // so if edLevelCount gets a new value, the scale has to recalculate and then upate the axis and bars
  $: {
    scaleX = scaleLinear()
      .domain([Math.max(...edLevelCount.values()), 0])
      .range([width, 0])
    scaleY = scaleBand().domain(edLevels).range([0, height])

    xTicks = scaleX.ticks().filter((tick) => Number.isInteger(tick))
    yTicks = scaleY.domain()

    select(axisBottomRef).call(axisBottom(scaleX).tickValues(xTicks).tickFormat(format('d')))
    select(axisLeftRef)
      .call(
        axisLeft(scaleY)
          .tickValues(yTicks)
          .tickFormat((tick) => `${tick.substring(0, 24)} ${tick.length > 24 ? '...' : ''}`)
      )
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
    {#each [...edLevelCount] as [key, value]}
      <rect
        x={1}
        y={scaleY(key) + 8 || 0}
        width={scaleX(value) || 0}
        height={scaleY.bandwidth() - 16 || 0}
        fill="#f3daf5"
      />
    {/each}
  </BarchartWrapper>
{/key}

<style>
</style>
