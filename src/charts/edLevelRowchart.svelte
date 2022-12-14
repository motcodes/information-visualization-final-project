<script>
  import { axisBottom, axisLeft, format, scaleBand, scaleLinear, select } from 'd3'
  import { edLevels, width, height } from '$lib/constants'
  import RowchartWrapper from './rowchartWrapper.svelte'

  export let edLevelData
  export let country

  let axisBottomRef, axisLeftRef
  let scaleX, scaleY
  let xTicks, yTicks

  // "$: ..." is a reactive statement which runs these lines each time a value inside them changes
  // so if edLevelData gets a new value, the scale has to recalculate and then upate the axis and bars
  $: {
    scaleX = scaleLinear()
      .domain([Math.max(...edLevelData.values()), 0])
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

<!-- #key listens to changes of country and rerenders when it updates -->
{#key country}
  <RowchartWrapper>
    <!-- bottom axis -->
    <g bind:this={axisBottomRef} class="bottomAxis" transform={`translate(0, ${height})`} />
    <!-- left axis -->
    <g bind:this={axisLeftRef} class="leftAxis" scale={scaleY} />
    <!-- bars -->
    {#each [...edLevelData] as [key, value]}
      <rect
        x={1}
        y={scaleY(key) + 8 || 0}
        width={scaleX(value) || 0}
        height={scaleY.bandwidth() - 16 || 0}
        fill="#e6b0eb"
      />
    {/each}
  </RowchartWrapper>
{/key}
