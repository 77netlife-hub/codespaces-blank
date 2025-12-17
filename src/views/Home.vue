<template>
  <div class="page">
    <div class="dashboard">
      <div class="left">
        <div class="grid">
          <AssetCard title="Balance" :amount="balance" subtitle="UGX" />
          <AssetCard title="USD Balance" amount="$1,180,577.24" subtitle="USD" />
          <AssetCard title="KES Balance" amount="KSh 107,456.00" subtitle="KES" />
        </div>

        <QuickActions @select="openModal" />
        <PurchaseModal v-if="modalOpen" :open="modalOpen" :service="modalService" @close="modalOpen=false" @purchased="onPurchased" />

        <div class="card card-chart chart-card">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div class="asset-title">Portfolio</div>
              <div class="asset-amount">{{ formatCurrency(balance) }}</div>
            </div>
            <div class="tx-muted">1D 1W 1M</div>
          </div>
          <WalletChart :data="chartData" />
        </div>

        <div class="card transactions">
          <h3 style="margin:0 0 8px 0">Transaction history</h3>
          <TxHistory :items="transactions" />
        </div>
      </div>

      <div class="right">
        <div class="card card-widget">
          <CardWidget />
        </div>

        <div style="height:16px"></div>

        <div class="card quick-transfer">
          <QuickTransfer :beneficiaries="beneficiaries" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import AssetCard from '../components/AssetCard.vue'
import WalletChart from '../components/WalletChart.vue'
import CardWidget from '../components/CardWidget.vue'
import QuickTransfer from '../components/QuickTransfer.vue'
import TxHistory from '../components/TxHistory.vue'
import QuickActions from '../components/QuickActions.vue'
import PurchaseModal from '../components/PurchaseModal.vue'

export default {
  components: { AssetCard, WalletChart, CardWidget, QuickTransfer, TxHistory, QuickActions, PurchaseModal },
  setup(){
    const balance = ref(11757636.46)
    const formatCurrency = (v) => new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(v)

    const chartData = ref([12000000,11800000,11900000,11700000,11757636,11850000,11700000])

    const transactions = ref([
      { id:1, label:'Deposit', amount:200000, date:'2025-12-05' },
      { id:2, label:'Airtime', amount:5000, date:'2025-12-01' },
      { id:3, label:'Electricity Bill', amount:43000, date:'2025-11-28' },
      { id:4, label:'Withdrawal', amount:150000, date:'2025-11-20' }
    ])

    const beneficiaries = ref([{ id:1, name:'John Doe', phone:'+256700123456' },{ id:2, name:'Mercy', phone:'+256772123456' }])

    // modal state
    const modalOpen = ref(false)
    const modalService = ref(null)

    const openModal = (act) => {
      modalService.value = act
      modalOpen.value = true
    }

    const onPurchased = (data) => {
      alert('Purchase started: ' + (data.message || 'OK'))
      modalOpen.value = false
    }

    return { balance, formatCurrency, chartData, transactions, beneficiaries, modalOpen, modalService, onPurchased, openModal }
  }
}
</script>

<style scoped>
.card-chart{margin-top:14px}
h3{color:#dfeef0}
</style>
