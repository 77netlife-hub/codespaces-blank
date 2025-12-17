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
          <CardWidget :balances="cardBalance" :cardNumber="cardNumber" :cardCvv="cardCvv" @topup="openTopup" @withdraw="openWithdraw" />
          <TopupModal v-if="showTopup" :open="showTopup" :walletBalance="balance" @close="showTopup=false" @topup="handleTopup" />
          <WithdrawModal v-if="showWithdraw" :open="showWithdraw" :cardBalance="cardBalance" @close="showWithdraw=false" @withdraw="handleWithdraw" />
          <QrScanner v-if="showScanner" @close="showScanner=false" />
          <SendModal v-if="showSend" :open="showSend" :walletBalance="balance" :contacts="beneficiaries" @close="showSend=false" @sent="(p)=>{ balance.value -= p.amount; recentCardActivity.value.unshift({ date: new Date().toISOString().slice(0,10), label: 'Send to '+p.recipient, amount: p.amount }) }" />
          <QrPayModal v-if="showQrPay" :open="showQrPay" :recipient="qrRecipient" :amount="qrAmount" @close="showQrPay=false" />
        </div>

        <div style="height:16px"></div>

        <div class="card quick-transfer">
          <QuickTransfer @send-direct="(p)=>{ const a=Number(p.amount); if(a>Number(balance.value)){ alert('Insufficient funds'); return } balance.value -= a; recentCardActivity.value.unshift({ date:new Date().toISOString().slice(0,10), label:'Send to '+p.recipient, amount: a }) }" @open-scan="showScanner = true" />
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
import TopupModal from '../components/TopupModal.vue'
import WithdrawModal from '../components/WithdrawModal.vue'
import QuickTransfer from '../components/QuickTransfer.vue'
import TxHistory from '../components/TxHistory.vue'
import QuickActions from '../components/QuickActions.vue'
import QrScanner from '../components/QrScanner.vue'
import SendModal from '../components/SendModal.vue'
import PurchaseModal from '../components/PurchaseModal.vue'
import QrPayModal from '../components/QrPayModal.vue'

export default {
  components: { AssetCard, WalletChart, CardWidget, TopupModal, WithdrawModal, QuickTransfer, TxHistory, QuickActions, PurchaseModal, QrPayModal },
  setup(){
    const balance = ref(11757636.46)
    const cardBalance = ref(5200000)
    const formatCurrency = (v) => {
      if(v && typeof v === 'object' && 'value' in v) v = v.value
      return new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX' }).format(Number(v) || 0)
    }

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

    const showScanner = ref(false)
    const showSend = ref(false)
    const showQrPay = ref(false)
    const qrRecipient = ref('')
    const qrAmount = ref('')

    const openModal = (act) => {
      // handle special actions
      if(!act) return
      if(act.key === 'scan'){ showScanner.value = true; return }
      if(act.key === 'send'){ showSend.value = true; return }
      modalService.value = act
      modalOpen.value = true
    }

    const openQrPay = (recipient, amount) => {
      qrRecipient.value = recipient || ''
      qrAmount.value = amount || ''
      showQrPay.value = true
    }

    const onPurchased = (data) => {
      alert('Purchase started: ' + (data.message || 'OK'))
      modalOpen.value = false
    }

    // card modals and handlers
    const showCardDetail = ref(false)
    const showTopup = ref(false)
    const showWithdraw = ref(false)
    const cardNumber = ref('1234567812344444')
    const cardCvv = ref('123')

    const recentCardActivity = ref([
      { date:'2025-12-06', label:'Top up', amount:200000 },
      { date:'2025-12-02', label:'Purchase', amount:5000 }
    ])

    const openTopup = () => { showTopup.value = true }
    const openWithdraw = () => { showWithdraw.value = true }

    const handleTopup = (amount) => {
      const a = Number(amount)
      if(a <= 0) return
      balance.value = Number(balance.value) - a
      cardBalance.value = Number(cardBalance.value) + a
      recentCardActivity.value.unshift({ date: new Date().toISOString().slice(0,10), label: 'Top up', amount: a })
    }

    const handleWithdraw = (amount) => {
      const a = Number(amount)
      if(a <= 0) return
      cardBalance.value = Number(cardBalance.value) - a
      balance.value = Number(balance.value) + a
      recentCardActivity.value.unshift({ date: new Date().toISOString().slice(0,10), label: 'Withdraw', amount: a })
    }

    return { balance, cardBalance, cardNumber, cardCvv, formatCurrency, chartData, transactions, beneficiaries, modalOpen, modalService, onPurchased, openModal, openTopup, openWithdraw, showTopup, showWithdraw, showScanner, showSend, handleTopup, handleWithdraw, recentCardActivity, showQrPay, qrRecipient, qrAmount, openQrPay }
  }
}
</script>

<style scoped>
.card-chart{margin-top:14px}
h3{color:#dfeef0}
</style>
