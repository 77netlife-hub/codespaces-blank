<template>
  <div>
    <h3>Set a 4-digit PIN</h3>
    <input v-model="pin" maxlength="4" placeholder="1234" />
    <button @click="savePin">Save PIN</button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const pin = ref('')
    const savePin = () => {
      if(!/^[0-9]{4}$/.test(pin.value)) { alert('Enter a 4-digit PIN'); return }
      localStorage.setItem('livra_pin', pin.value)
      alert('PIN saved')
      window.location.href = '/'
    }
    return { pin, savePin }
  }
}
</script>

<style scoped>
input{padding:8px;width:140px;margin-right:8px}
button{padding:8px 12px;background:#8b1e3f;color:white;border:none;border-radius:8px}
</style>
