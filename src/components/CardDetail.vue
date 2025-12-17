<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <header>
        <h3>Card details</h3>
        <button class="close" @click="close">×</button>
      </header>
      <section class="body">
        <div class="card-preview">
          <div class="chip" />
          <div class="card-number">{{ formattedCardNumber }}</div>
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

        <div style="margin-top:12px">
          <div class="tx-muted">Recent activity</div>
          <ul class="activities">
            <li v-for="(t,i) in recent" :key="i">{{ t.date }} — {{ t.label }} — UGX {{ t.amount }}</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardDetail',
  props: ['open','balance','recent','cardNumber'],
  emits: ['close'],
  computed: {
    formattedBalance(){
      const v = Number(this.balance) || 0
      return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(v)
    },
    formattedCardNumber(){
      const num = String(this.cardNumber || '1111222233334444').replace(/[^0-9]/g,'')
      if(num.length !== 16) return this.cardNumber || '---- ---- ---- ----'
      return num.replace(/(\d{4})(?=\d)/g, '$1 ')
    }
  },
  methods: { close(){ this.$emit('close') } }
}
</script>

<style scoped>
.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.45);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:220}
.modal{width:520px;background:var(--panel);border-radius:12px;padding:18px;color:#eaf6f5;box-shadow:0 12px 40px rgba(2,6,23,0.6);border:1px solid rgba(255,255,255,0.04)}
.card-preview{background:linear-gradient(135deg,#5b21b6,#8b5cf6);border-radius:12px;padding:18px;color:#fff}
.chip{width:48px;height:32px;background:rgba(255,255,255,0.18);border-radius:6px}
.card-number{letter-spacing:2px;font-weight:700;margin-top:12px;font-size:18px}
.card-row{display:flex;justify-content:space-between;align-items:flex-end;margin-top:12px}
.label{font-size:11px;opacity:0.85}
.value{font-weight:700}
.activities{margin-top:8px;padding-left:16px}
.tx-muted{color:var(--muted)}
.close{background:transparent;border:none;color:inherit;font-size:20px}
</style>
