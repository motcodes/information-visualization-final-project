<script>
  import { axisBottom, axisLeft, format, scaleBand, scaleLinear, select } from 'd3'
  import { ages, width, height } from '$lib/constants'
  import RowchartWrapper from './rowchartWrapper.svelte'

  export let ageData
  export let country

  let axisBottomRef, axisLeftRef
  let scaleX, scaleY, xTicks

  // "$: ..." is a reactive statement which runs these lines each time a value inside them changes
  // so if ageData gets a new value, the scale has to recalculate and then upate the axis and bars
  $: {
    scaleX = scaleLinear()
      .domain([Math.max(...ageData.values()), 0])
      .range([width, 0])
    scaleY = scaleBand().domain(ages).range([0, height])

    xTicks = scaleX.ticks().filter((tick) => Number.isInteger(tick))

    select(axisBottomRef).call(axisBottom(scaleX).tickValues(xTicks).tickFormat(format('d')))
    select(axisLeftRef).call(axisLeft(scaleY))
  }
</script>

{#key country}
  <RowchartWrapper>
    <!-- bottom axis -->
    <g bind:this={axisBottomRef} class="bottomAxis" transform={`translate(0, ${height})`} />
    <!-- left axis -->
    <g bind:this={axisLeftRef} class="leftAxis" scale={scaleY} />
    <!-- bars -->
    {#each [...ageData] as [key, value]}
      <rect
        x={1}
        y={scaleY(key) + 8 || 0}
        width={scaleX(value) || 0}
        height={scaleY.bandwidth() - 16 || 0}
        fill="#f3daf5"
      />
    {/each}
  </RowchartWrapper>
{/key}

<style>
</style>
