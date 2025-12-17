<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <header>
        <h3>Send Money</h3>
        <button class="close" @click="close">×</button>
      </header>
      <section class="body">
        <label>Recipient</label>
        <input v-model="recipient" placeholder="Enter phone or choose" />


        <div v-if="contacts && contacts.length" style="margin-top:8px">
          <label>Contacts</label>
          <div class="contacts-list">
            <div v-for="c in contacts" :key="c.id" class="contact-row">
              <div class="contact-info">
                <div class="contact-name">{{ c.name }}</div>
                <div class="contact-phone">{{ c.phone }}</div>
              </div>
              <div class="contact-action">
                <input type="number" v-model.number="amounts[c.id]" placeholder="UGX" class="contact-amount" />
                <div style="display:flex;gap:8px;margin-top:8px">
                  <button class="btn btn-primary" @click="sendContact(c)">Send</button>
                  <button class="btn" @click="$emit('scan')">Scan</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else style="margin-top:12px">
          <label>Amount (UGX)</label>
          <input type="number" v-model.number="amount" placeholder="10000" />
        </div>

        <div style="margin-top:12px;display:flex;gap:8px">
          <button class="btn btn-primary" @click="submit">Send</button>
          <button class="btn" @click="close">Cancel</button>
        </div>

        <div v-if="message" class="msg">{{ message }}</div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SendModal',
  props: ['open','walletBalance','contacts'],
  emits: ['close','sent'],
  data(){
    return { recipient: '', amount: null, message: '', quick:[{id:'glovo',name:'Glovo'},{id:'kfc',name:'KFC'},{id:'uber',name:'Uber'},{id:'saveboda',name:'SaveBoda'}], amounts: {} }
  },
  created(){
    // initialize per-contact amount map
    if(this.contacts && Array.isArray(this.contacts)){
      this.contacts.forEach(c=>{ this.$set ? this.$set(this.amounts, c.id, null) : (this.amounts[c.id]=null) })
    }
  },
  methods: {
    close(){ this.$emit('close') },
    pick(r){ this.recipient = r.name; },
    submit(){
      const a = Number(this.amount)
      if(!this.recipient){ this.message='Enter recipient' ; return }
      if(!a || a<=0){ this.message='Enter valid amount' ; return }
      if(a > Number(this.walletBalance)) { this.message='Insufficient funds' ; return }
      this.$emit('sent', { recipient: this.recipient, amount: a })
      this.recipient = ''
      this.amount = null
      this.message = ''
      this.$emit('close')
    },
    sendContact(c){
      const a = Number(this.amounts[c.id])
      if(!a || a<=0){ this.message = 'Enter valid amount for ' + c.name; return }
      if(a > Number(this.walletBalance)){ this.message = 'Insufficient funds'; return }
      this.$emit('sent', { recipient: c.phone || c.name, amount: a })
      this.amounts[c.id] = null
      this.message = ''
    }
  }
}
</script>

<style scoped>
.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.45);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;z-index:210}
.modal{width:480px;background:linear-gradient(180deg,rgba(14,10,25,1),rgba(20,8,60,1));border-radius:12px;padding:20px;color:#eaf6f5;box-shadow:0 18px 50px rgba(2,6,23,0.7);border:1px solid rgba(255,255,255,0.04)}
input{width:100%;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);color:inherit}
.quick-list{display:flex;gap:8px;margin-top:8px}
.pill{background:rgba(255,255,255,0.04);border:none;padding:6px 10px;border-radius:999px;color:inherit}
.btn{padding:10px 14px;border-radius:10px;border:none}
.btn-primary{background:linear-gradient(90deg,#7c3aed,#a78bfa);color:#fff}
.msg{color:#ffd6d6;margin-top:8px}
.close{background:transparent;border:none;color:inherit;font-size:20px}
</style>
