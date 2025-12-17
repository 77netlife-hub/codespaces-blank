<template>
  <div class="page">
    <h2>Wallet</h2>
    <p>Primary currency: UGX</p>
    <div class="actions">
      <button @click="deposit">Deposit</button>
      <button @click="withdraw">Withdraw</button>
      <button @click="$router.push('/transactions')">Transactions</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    deposit(){ alert('Deposit flow placeholder — integrate payment gateway/Mobile Money') },
    withdraw(){ alert('Withdraw flow placeholder — integrate banking APIs') }
  }
}
</script>

<style scoped>
.actions{display:flex;gap:10px}
button{padding:10px 14px;background:#0f6160;border-radius:8px;color:#fff;border:none}
</style>
