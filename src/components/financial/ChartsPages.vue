<script setup>
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chart = ref(null)
const chartInstance = ref(null)
const props = defineProps(['xData', 'data', 'name'])

const refresh = () => {
  if (!chart.value) return
  if (!chartInstance.value) {
    chartInstance.value = echarts.init(chart.value)
  }
  chartInstance.value.clear()
  chartInstance.value.setOption({
    xAxis: {
      type: 'category',
      data: props.xData,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'line',
        data: props.data,
        name: props.name,
      },
    ],
  })
}

watch(
  () => [props.xData, props.data],
  () => {
    refresh()
  },
  { deep: true },
)

onMounted(() => {
  refresh()
})

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.dispose()
    chartInstance.value = null
  }
})
</script>

<template>
  <div id="charts">
    <div ref="chart" style="width: 100%; height: 100%"></div>
  </div>
</template>

<style scoped>
#charts {
  width: 100%;
  height: 400px;
}
</style>
