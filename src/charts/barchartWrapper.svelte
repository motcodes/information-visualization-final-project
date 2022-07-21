<script>
  import { margin, width, height } from '$lib/constants'
</script>

<div class="modal">
  <svg
    width={width + margin.left + margin.right}
    height={height + margin.top + margin.bottom}
    id="modalGraph"
  >
    <g class="bar" transform={`translate(${margin.left}, ${margin.top})`}>
      <slot>Empty Chart</slot>
    </g>
  </svg>
</div>

<style>
  .modal {
    margin-left: 100px;
  }
</style>
