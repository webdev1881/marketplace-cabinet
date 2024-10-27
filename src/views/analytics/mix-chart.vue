<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/MixChart'

export default {
  name: 'MixChart',
  components: { Chart }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 97%;
  margin: 0 auto;
  height: calc(100vh - 84px);
}
</style>

