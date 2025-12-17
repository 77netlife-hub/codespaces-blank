<template>
  <div class="page center">
    <div class="card">
      <h2>Welcome to Livra</h2>
      <p>Sign in with your phone number</p>
      <PhoneAuth />
    </div>
  </div>
</template>

<script>
import PhoneAuth from '../components/PhoneAuth.vue'
export default { components: { PhoneAuth } }
</script>

<style scoped>
.page{padding:24px}
.center{display:flex;align-items:center;justify-content:center;height:calc(100vh - 150px)}
.card{width:100%;max-width:420px;padding:20px;background:white;border-radius:12px;box-shadow:0 6px 20px rgba(11,11,11,0.06)}
</style>
