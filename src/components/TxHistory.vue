<template>
  <div>
    <div v-for="tx in items" :key="tx.id" class="tx-item">
      <div>
        <div style="font-weight:600">{{ tx.label }}</div>
        <div class="tx-muted">{{ tx.date }}</div>
      </div>
      <div style="text-align:right">
        <div :style="{color: tx.amount>0 ? '#7be495' : '#ff9b8a'}">{{ format(tx.amount) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { items: { type: Array, default: ()=>[] } },
  methods: {
    format(v){ return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(v) }
  }
}
</script>

<style scoped>
.tx-item{display:flex;justify-content:space-between;padding:10px 4px;border-bottom:1px solid rgba(255,255,255,0.02)}
.tx-muted{color:var(--muted);font-size:13px}
</style>
