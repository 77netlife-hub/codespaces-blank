<template>
  <div class="card-widget-root">
    <div class="card-visual">
        <div class="chip" />
        <div class="card-number">{{ showDetails ? formattedCardNumber : '•••• •••• •••• 4444' }}</div>
        <div v-if="showDetails" class="card-cvv">CVV: {{ cardCvv }}</div>
      <div class="card-row">
        <div>
          <div class="label">Cardholder</div>
          <div class="value">Primary User</div>
        </div>
        <div style="text-align:right">
          <div class="label">Available</div>
          <div class="value balance">UGX {{ formattedBalance }}</div>
        </div>
      </div>
    </div>

    <div class="card-actions">
      <button class="btn btn-outline" @click="viewCard">View</button>
      <button class="btn btn-primary" @click="topup">Top up</button>
      <button class="btn btn-secondary" @click="withdraw">Withdraw</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardWidget',
  props: { balances: { type: [Number,String], default: 11757636 }, cardNumber: { type: String, default: '1234567812344444' }, cardCvv: { type: String, default: '123' } },
  data(){ return { showDetails: false } },
  computed: {
    formattedBalance(){
      const v = Number(this.balances) || 0
      return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(v)
    },
    formattedCardNumber(){
      const num = String(this.cardNumber || '').replace(/[^0-9]/g,'')
      if(num.length !== 16) return this.cardNumber || '---- ---- ---- ----'
      return num.replace(/(\d{4})(?=\d)/g, '$1 ')
    }
  },
  methods: {
    viewCard(){ this.showDetails = !this.showDetails },
    topup(){ this.$emit('topup') },
    withdraw(){ this.$emit('withdraw') }
  }
}
</script>

<style scoped>
.card-widget-root{display:flex;flex-direction:column;gap:12px}
.card-visual{background:linear-gradient(135deg,#5b21b6,#8b5cf6);border-radius:14px;padding:16px;color:#fff;min-height:140px;display:flex;flex-direction:column;justify-content:space-between}
.chip{width:48px;height:32px;background:rgba(255,255,255,0.18);border-radius:6px}
.card-number{letter-spacing:2px;font-weight:600;margin-top:8px}
.card-cvv{font-size:13px;opacity:0.95;margin-top:6px}
.card-row{display:flex;justify-content:space-between;align-items:flex-end;margin-top:12px}
.label{font-size:11px;opacity:0.85}
.value{font-weight:700}
.balance{font-size:18px}
.card-actions{display:flex;gap:8px}
.btn{flex:1;padding:8px 10px;border-radius:10px;border:none;cursor:pointer}
.btn-outline{background:transparent;border:1px solid rgba(0,0,0,0.08)}
.btn-primary{background:linear-gradient(90deg,#7c3aed,#a78bfa);color:#fff}
.btn-secondary{background:#fff;color:#5b21b6;border:1px solid rgba(0,0,0,0.06)}
</style>
