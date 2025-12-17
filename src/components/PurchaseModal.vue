<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal">
      <header>
        <h3>{{ title }}</h3>
        <button class="close" @click="close">×</button>
      </header>

      <section class="body">
        <div v-if="loading">Loading products…</div>
        <div v-else>
          <label>Provider / Product</label>
          <select v-model="selectedProductCode" @change="fetchPriceList">
            <option v-for="p in products" :value="p.code" :key="p.code">{{ p.name }} ({{ p.code }})</option>
          </select>

          <div v-if="priceList.length">
            <label>Choose package</label>
            <div class="prices">
              <button v-for="item in priceList" :key="item.code" @click="selectPrice(item)" :class="{selected: selectedPrice && selectedPrice.code===item.code}">
                <div class="pname">{{ item.name }}</div>
                <div class="pprice">UGX {{ item.price }}</div>
              </button>
            </div>
          </div>

          <div v-else-if="selectedProductCode">
            <label v-if="!priceList.length">Enter amount</label>
            <input v-if="!priceList.length" v-model.number="amount" placeholder="Amount in UGX" />
          </div>

          <div v-if="selectedPrice">
            <label>Receiver MSISDN</label>
            <input v-model="msisdn" placeholder="2567XXXXXXXX" />
            <div class="actions">
              <button class="btn primary" @click="validate">Validate</button>
              <button class="btn" @click="purchase" :disabled="!validationReference">Purchase</button>
            </div>
            <div v-if="validationReference" class="ok">Validation ref: {{ validationReference }}</div>
            <div v-if="message" class="msg">{{ message }}</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['open','service'],
  emits: ['close','purchased'],
  data(){
    return { title: '', products: [], priceList: [], loading:true, selectedProductCode:'', selectedPrice:null, msisdn:'', validationReference:'', message:'', amount:null }
  },
  watch: {
    open(v){ if(v) this.init() }
  },
  methods: {
    close(){ this.$emit('close') },
    async init(){
      this.title = this.service ? this.service.label : 'Buy'
      this.loading = true
      const API_BASE = 'http://localhost:4000/api/relworx'
      console.log('PurchaseModal.init using API_BASE', API_BASE, 'service=', this.service)
      try{
        console.log('Requesting products from', `${API_BASE}/products`)
        const r = await axios.get(`${API_BASE}/products`)
        console.log('Products response', r.status, r.data && Object.keys(r.data).length)
        this.products = r.data.products || []
        // try to filter products by service key for quicker UX
        if(this.service && this.service.key){
          const key = this.service.key
          const categoryMap = { airtime: 'AIRTIME', data: 'INTERNET', paybill: 'TV' }
          const cat = categoryMap[key]
          if(cat){
            const filtered = this.products.filter(p=>p.category===cat)
            if(filtered.length) this.products = filtered
          }
        }
        // try to preselect category by service
        const match = this.products.find(p=> p.category && this.service && ((this.service.key==='airtime' && p.category==='AIRTIME') || (this.service.key==='data' && p.category==='INTERNET') ))
        if(match) this.selectedProductCode = match.code
        this.loading = false
        if(this.selectedProductCode) this.fetchPriceList()
        if(!this.products.length) this.message = 'No products available from Relworx (check server/API key)'
      }catch(e){
        console.error('Failed loading products', e)
        this.message = 'Failed loading products — check Relworx proxy and API key'
        this.loading=false
      }
    },
    async fetchPriceList(){
      if(!this.selectedProductCode) return
      this.priceList = []
      this.loading = true
      const API_BASE = 'http://localhost:4000/api/relworx'
      console.log('Fetching price list for', this.selectedProductCode, 'from', `${API_BASE}/price-list`)
      try{
        const r = await axios.get(`${API_BASE}/price-list?code=` + encodeURIComponent(this.selectedProductCode))
        console.log('Price list response', r.status, r.data)
        this.priceList = r.data.price_list || []
        // reset amount if price list present
        if(this.priceList.length) this.amount = null
        this.loading = false
        if(!this.priceList.length) this.message = 'No price packages found for this product'
      }catch(e){
        console.error('Failed to load price list', e.response && e.response.data || e.message)
        this.message='Failed to load price list'
        this.loading=false
      }
    },
    selectPrice(item){ this.selectedPrice = item }
    ,async validate(){
      // allow validate for either a selected price OR a manually entered amount (for airtime without price list)
      if(!this.msisdn || (!this.selectedPrice && !this.amount)) { this.message='Enter receiver and select package or amount'; return }
      this.message = 'Validating...'
      try{
        const API_BASE = 'http://localhost:4000/api/relworx'
        const amount = this.selectedPrice ? this.selectedPrice.price : this.amount
        const payload = { account_no: '', reference: String(Date.now()), msisdn: this.msisdn, amount: amount, product_code: this.selectedProductCode, contact_phone: this.msisdn }
        console.log('Validating with payload', payload)
        const r = await axios.post(`${API_BASE}/validate`, payload)
        console.log('Validate response', r.status, r.data)
        if(r.data.success){ this.validationReference = r.data.validation_reference || r.data.validation_reference }
        this.message = r.data.message || 'Validated'
      }catch(e){ this.message = 'Validation failed' }
    },
    async purchase(){
      if(!this.validationReference){ this.message='Validate first' ; return }
      this.message = 'Purchasing...'
      try{
        const API_BASE = 'http://localhost:4000/api/relworx'
        const payload = { account_no: '', validation_reference: this.validationReference }
        console.log('Purchasing with payload', { validation_reference: this.validationReference })
        const r = await axios.post(`${API_BASE}/purchase`, payload)
        console.log('Purchase response', r.status, r.data)
        if(r.data.success){ this.$emit('purchased', r.data); this.message = r.data.message || 'Purchase in progress' }
        else this.message = r.data.message || 'Purchase failed'
      }catch(e){ this.message='Purchase failed' }
    }
  }
}
</script>

<style scoped>
.modal-backdrop{position:fixed;inset:0;background:linear-gradient(rgba(2,6,10,0.6),rgba(2,6,10,0.6));display:flex;align-items:center;justify-content:center;z-index:60}
.modal{width:520px;background:var(--panel);border-radius:12px;padding:18px;color:#eaf6f5}
.modal header{display:flex;justify-content:space-between;align-items:center}
.modal .body{margin-top:12px}
.modal select,input{width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);background:transparent;color:inherit}
.prices{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}
.prices button{background:transparent;border:1px solid rgba(255,255,255,0.06);padding:8px;border-radius:8px;color:inherit}
.prices button.selected{background:linear-gradient(135deg,var(--qa-accent-1),var(--qa-accent-2));border:none}
.actions{display:flex;gap:10px;margin-top:12px}
.btn{padding:10px 14px;border-radius:8px;border:none}
.btn.primary{background:linear-gradient(135deg,var(--qa-accent-1),var(--qa-accent-2));color:white}
.close{background:transparent;border:none;color:inherit;font-size:20px}
.ok{margin-top:8px;color:#bde9c8}
.msg{margin-top:8px;color:#ffd6d6}
</style>
