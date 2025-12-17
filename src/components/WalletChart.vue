<template>
  <div style="height:110px;margin-top:10px">
    <svg :width="width" :height="height" viewBox="0 0 300 100">
      <polyline :points="points" fill="none" stroke="#9fe6e3" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
    </svg>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  props: { data: { type: Array, required: true } },
  setup(props){
    const width = 300, height = 100
    const points = computed(()=>{
      const d = props.data
      if(!d || d.length===0) return ''
      const min = Math.min(...d), max = Math.max(...d)
      return d.map((v,i)=>{
        const x = Math.round((i/(d.length-1))*(width-20)) + 10
        const y = Math.round(((max - v)/(max - min || 1))*(height-20)) + 10
        return `${x},${y}`
      }).join(' ')
    })
    return { points, width, height }
  }
}
</script>

<style scoped>
svg{width:100%;height:100%}
</style>
