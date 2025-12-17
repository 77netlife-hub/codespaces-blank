<template>
  <div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <select v-model="selected" style="flex:1;padding:8px;border-radius:8px;background:transparent;border:1px solid rgba(255,255,255,0.04)">
        <option v-for="b in beneficiaries" :key="b.id" :value="b">{{ b.name }} — {{ b.phone }}</option>
      </select>
      <input v-model.number="amount" placeholder="UGX" style="width:120px;padding:8px;border-radius:8px;background:transparent;border:1px solid rgba(255,255,255,0.04)" />
    </div>
    <div style="display:flex;gap:8px">
      <button @click="send" style="flex:1;padding:8px;border-radius:8px;background:var(--accent-2);color:#fff;border:none">Send</button>
      <button @click="scan" style="padding:8px;border-radius:8px;background:transparent;border:1px solid rgba(255,255,255,0.04);color:#fff">Scan</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: { beneficiaries: { type: Array, default: ()=>[] } },
  setup(props){
    const selected = ref(props.beneficiaries[0] || null)
    const amount = ref(null)
    const send = ()=>{ if(!selected.value || !amount.value) return alert('Select beneficiary and amount'); alert(`Sent ${amount.value} UGX to ${selected.value.name}`) }
    const scan = ()=>{ alert('Open QR scanner (placeholder)') }
    return { selected, amount, send, scan }
  }
}
</script>

<style scoped>
button{font-weight:600}
</style>
