<template>
  <div class="asset-card">
    <div class="asset-title">{{ title }}</div>
    <div class="asset-amount">{{ displayAmount }}</div>
    <div class="tx-muted" v-if="subtitle">{{ subtitle }}</div>
  </div>
</template>

<script>
export default {
  props: { title: String, amount: [Number, String], subtitle: String },
  computed: {
    displayAmount(){
      if(typeof this.amount === 'number') return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(this.amount)
      return this.amount
    }
  }
}
</script>

<style scoped>
.asset-card{padding:12px;border-radius:10px;color:#fff}
.asset-title{font-size:12px;opacity:0.95}
.asset-amount{font-size:18px;font-weight:700;margin-top:8px}
.tx-muted{font-size:12px;opacity:0.9;margin-top:6px}
</style>
