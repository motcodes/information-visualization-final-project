<!-- A div center component -->
<div class="center">
  <slot>
    <p>Loading Data</p>
  </slot>
</div>

<style>
  .center {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
</style>
