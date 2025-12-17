<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <header>
        <h3>Top up Card</h3>
        <button class="close" @click="close">×</button>
      </header>
      <section class="body">
        <div>Available balance: <strong>{{ formattedWallet }}</strong></div>
        <div style="margin-top:12px">
          <label>Amount (UGX)</label>
          <input type="number" v-model.number="amount" placeholder="10000" />
        </div>
        <div style="margin-top:12px;display:flex;gap:8px">
          <button class="btn btn-primary" @click="submit">Top up</button>
          <button class="btn" @click="close">Cancel</button>
        </div>
        <div v-if="message" class="msg">{{ message }}</div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopupModal',
  props: ['open','walletBalance'],
  emits: ['close','topup'],
  data(){ return { amount: null, message: '' } },
  computed:{
    formattedWallet(){ return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(Number(this.walletBalance)||0) }
  },
  methods:{
    close(){ this.$emit('close') },
    submit(){
      const a = Number(this.amount)
      if(!a || a <=0){ this.message='Enter a valid amount'; return }
      if(a > Number(this.walletBalance)) { this.message='Amount exceeds available balance'; return }
      this.$emit('topup', a)
      this.amount = null
      this.message=''
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.45);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;z-index:210}
.modal{width:480px;background:linear-gradient(180deg,rgba(14,10,25,1),rgba(20,8,60,1));border-radius:12px;padding:20px;color:#eaf6f5;box-shadow:0 18px 50px rgba(2,6,23,0.7);border:1px solid rgba(255,255,255,0.04)}
input{width:100%;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);color:inherit}
.btn{padding:10px 14px;border-radius:10px;border:none;cursor:pointer}
.btn-primary{background:linear-gradient(90deg,#7c3aed,#a78bfa);color:#fff}
.msg{color:#ffd6d6;margin-top:8px}
.close{background:transparent;border:none;color:inherit;font-size:20px}
</style>
