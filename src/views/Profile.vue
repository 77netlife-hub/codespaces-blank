<template>
  <div class="page">
    <h2>Profile</h2>
    <p>Name: Demo User</p>
    <p>Phone: +256700000000</p>
    <button @click="resetPin">Reset PIN</button>
  </div>
</template>

<script>
export default {
  methods: {
    resetPin(){ alert('PIN reset flow placeholder — use SMS verification') }
  }
}
</script>

<style scoped>
button{padding:8px 12px;background:#0f6160;color:white;border-radius:8px;border:none}
</style>
