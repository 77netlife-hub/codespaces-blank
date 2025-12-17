<template>
  <div class="page">
    <h2>Banking</h2>
    <p>Link bank accounts or view statements</p>
    <button @click="linkBank">Link Bank Account</button>
  </div>
</template>

<script>
export default {
  methods: {
    linkBank(){ alert('Bank linking placeholder — integrate Open Banking or manual flow') }
  }
}
</script>

<style scoped>
button{padding:10px 14px;background:#8b1e3f;color:white;border:none;border-radius:8px}
</style>
