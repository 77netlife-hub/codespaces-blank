<template>
  <div class="page">
    <h2>Transactions</h2>
    <div class="tx-list">
      <div v-for="tx in transactions" :key="tx.id" class="tx">
        <div>{{tx.type}} — {{formatCurrency(tx.amount)}}</div>
        <div class="muted">{{tx.date}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup(){
    const transactions = ref([
      { id:1, type:'Airtime purchase', amount:5000, date:'2025-12-01' },
      { id:2, type:'Deposit', amount:200000, date:'2025-12-05' }
    ])
    const formatCurrency = (v) => new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(v)
    return { transactions, formatCurrency }
  }
}
</script>

<style scoped>
.tx{padding:12px;border-bottom:1px solid #efefef}
.muted{color:#666;font-size:13px}
</style>
