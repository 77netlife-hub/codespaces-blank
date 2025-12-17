<template>
  <div class="quick-actions">
    <div v-for="act in actions" :key="act.key" class="action-wrap">
      <button class="circle-btn" @click="onClick(act.key)" :aria-label="act.label">
          <span class="icon"><span class="icon-letter">{{ act.label.charAt(0) }}</span></span>
      </button>
      <div class="label" :style="{ '--label-color': act.color }">{{ act.label }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'QuickActions',
  emits: ['select'],
  setup(props, { emit }){
    const actions = [
      { key: 'scan', label: 'Scan', color: '#2b6cb0' },
      { key: 'airtime', label: 'Airtime', color: '#0f6160' },
      { key: 'data', label: 'Data', color: '#8b1e3f' },
      { key: 'paybill', label: 'Pay Bill', color: '#ffb86b' },
      { key: 'send', label: 'Send', color: '#3ddc84' },
      { key: 'request', label: 'Request', color: '#ffd166' },
      { key: 'saving', label: 'Saving', color: '#9b5cff' },
      { key: 'invest', label: 'Invest', color: '#3ac569' },
      { key: 'insurance', label: 'Insurance', color: '#4aa3ff' }
    ]

    const onClick = (k) => {
      const act = actions.find(a=>a.key===k)
      emit('select', act)
    }

    return { actions, onClick }
  }
})
</script>

<style>
.quick-actions{display:flex;flex-wrap:nowrap;gap:18px;margin-top:18px;overflow-x:auto;padding-bottom:6px}
.action-wrap{display:flex;flex-direction:column;align-items:center;min-width:84px}
.circle-btn{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:none;padding:8px;background:linear-gradient(135deg,var(--qa-accent-1),var(--qa-accent-2));box-shadow:0 8px 20px rgba(11,11,11,0.45);color:#ffffff}
.circle-btn .icon svg{width:28px;height:28px;display:block}
.circle-btn .icon{display:flex;align-items:center;justify-content:center}
.circle-btn svg path, .circle-btn svg rect { stroke: currentColor; }
.circle-btn .icon img{width:28px;height:28px;object-fit:contain;display:block}
.label{margin-top:8px;font-size:12px;color:var(--label-color, var(--qa-label, var(--muted)));text-align:center; font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial}

.circle-btn:focus{outline:2px solid rgba(255,255,255,0.06);outline-offset:4px}
</style>
