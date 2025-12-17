<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <header>
        <h3>Pay with QR</h3>
        <button class="close" @click="close">×</button>
      </header>
      <section class="body">
        <div class="qr-info">
          <div><strong>Recipient:</strong> {{ recipient || '—' }}</div>
          <div><strong>Amount:</strong> {{ formattedAmount }}</div>
        </div>
        <div class="qr-canvas" ref="qrc" />

        <div style="margin-top:12px;display:flex;gap:8px">
          <button class="btn btn-primary" @click="copyPayload">Copy</button>
          <button class="btn" @click="close">Close</button>
        </div>
        <div v-if="copied" class="ok">Copied to clipboard</div>
      </section>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'QrPayModal',
  props: ['recipient','amount','open'],
  emits: ['close'],
  data(){ return { copied:false } },
  computed:{
    formattedAmount(){ return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(Number(this.amount)||0) }
  },
  mounted(){ this.renderQr() },
  watch: { recipient(){ this.renderQr() }, amount(){ this.renderQr() } },
  methods: {
    close(){ this.$emit('close') },
    payload(){ return JSON.stringify({ recipient: this.recipient, amount: this.amount }) },
    async renderQr(){
      const el = this.$refs.qrc
      if(!el) return
      el.innerHTML = ''
      try{
        const svgString = await QRCode.toString(this.payload(), { type: 'svg', width: 240 })
        el.innerHTML = svgString
      }catch(e){ console.error('QR render error', e); el.textContent = 'QR unavailable' }
    },
    copyPayload(){ navigator.clipboard.writeText(this.payload()).then(()=>{ this.copied=true; setTimeout(()=>this.copied=false,2000) }) }
  }
}
</script>

<style scoped>
.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.45);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;z-index:220}
.modal{width:420px;background:var(--panel);border-radius:12px;padding:18px;color:#eaf6f5;box-shadow:0 12px 40px rgba(2,6,23,0.6);border:1px solid rgba(255,255,255,0.04)}
.qr-info{margin-bottom:12px}
.qr-canvas svg{display:block;margin:0 auto}
.btn{padding:8px 12px;border-radius:8px;border:none}
.btn-primary{background:linear-gradient(90deg,#7c3aed,#a78bfa);color:#fff}
.ok{margin-top:8px;color:#bde9c8}
.close{background:transparent;border:none;color:inherit;font-size:20px}
</style>
