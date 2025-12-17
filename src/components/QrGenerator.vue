<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import QRCode from 'qrcode'

export default {
  props: { text: { type: String, required: true } },
  setup(props){
    const canvas = ref(null)
    onMounted(()=>{ if(canvas.value) QRCode.toCanvas(canvas.value, props.text, { width:200 }) })
    return { canvas }
  }
}
</script>

<style scoped>
canvas{width:200px;height:200px}
</style>
