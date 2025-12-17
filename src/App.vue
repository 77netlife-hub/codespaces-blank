<template>
  <div id="app" class="mac-shell">
    <header class="mac-header">Livra — Uganda (UGX)</header>
    <router-view />
    <nav class="bottom-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/wallet">Wallet</router-link>
      <router-link to="/banking">Banking</router-link>
      <router-link to="/transactions">Transactions</router-link>
      <router-link to="/profile">Profile</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
.mac-shell { min-height:100vh; background: linear-gradient(180deg,#f7f7f9,#eef0f3); color:#0b0b0b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
.mac-header { height:60px; display:flex; align-items:center; justify-content:center; font-weight:600; background:linear-gradient(90deg,#8b1e3f,#0f6160); color:white; box-shadow: 0 2px 10px rgba(0,0,0,0.08) }
.bottom-nav { position:fixed; bottom:0; left:0; right:0; height:56px; background:rgba(255,255,255,0.9); display:flex; gap:12px; align-items:center; justify-content:space-around; border-top:1px solid #eee }
.bottom-nav a { color:#1b1b1b; text-decoration:none }
</style>
