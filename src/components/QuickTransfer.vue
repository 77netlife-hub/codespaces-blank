<template>
  <div class="qt-root">
    <div class="qt-card">
      <div class="qt-header">Quick Transfer</div>
      <div class="qt-body">
        <label class="qt-label">Recipient phone</label>
        <input v-model="phone" placeholder="+2567XXXXXXXX" class="qt-phone-input" />

        <label class="qt-label" style="margin-top:10px">Amount (UGX)</label>
        <input v-model.number="amount" placeholder="10000" class="qt-amount" />

        <div class="qt-cta">
          <button class="btn send-full" @click="onSend">Send</button>
          <button class="btn scan-small" @click="scan">Scan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: { },
  setup(props, { emit }){
    const amount = ref(null)
    const phone = ref('')
    const onSend = ()=>{
      const a = Number(amount.value)
      if(!phone.value) return alert('Enter recipient phone')
      if(!a || a <= 0) return alert('Enter amount')
      emit('send-direct', { recipient: phone.value, amount: a })
      amount.value = null
      phone.value = ''
    }
    const scan = ()=>{ emit('open-scan') }
    return { amount, phone, onSend, scan }
  }
}
</script>

<style scoped>
.qt-root{display:flex;flex-direction:column}
.qt-card{background:linear-gradient(135deg,var(--accent-1), var(--accent-2));padding:12px;border-radius:10px;color:#fff}
.qt-header{font-weight:700;margin-bottom:8px}
.qt-body{display:flex;flex-direction:column}
.qt-label{font-size:12px;opacity:0.95;margin-bottom:6px}
.qt-phone-input,.qt-amount{width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);color:inherit}
.qt-phone-input::placeholder,.qt-amount::placeholder{color:rgba(255,255,255,0.6)}
.qt-cta{display:flex;flex-direction:column;gap:8px;margin-top:12px}
.send-full{background:linear-gradient(90deg,#7c3aed,#a78bfa);color:#fff;padding:12px;border-radius:10px;border:none;font-weight:700}
.scan-small{background:transparent;border:1px solid rgba(255,255,255,0.12);padding:8px;border-radius:8px;color:inherit}

/* ensure no horizontal scroll */
@media (max-width:600px){
  .qt-phone-input,.qt-amount{font-size:14px}
}
</style>
