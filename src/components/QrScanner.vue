<template>
  <div>
    <p>QR scanner placeholder (browser support varies)</p>
    <video ref="video" autoplay playsinline style="width:100%;max-width:320px"></video>
    <button @click="start">Start Camera</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup(){
    const video = ref(null)
    const start = async ()=>{
      try{
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        video.value.srcObject = stream
      } catch(e){ alert('Camera not available') }
    }
    return { video, start }
  }
}
</script>

<style scoped>
video{border-radius:12px}
</style>
