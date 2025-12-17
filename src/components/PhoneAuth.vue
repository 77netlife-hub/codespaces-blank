<template>
  <div>
    <div v-if="step===1">
      <input v-model="phone" placeholder="+2567XXXXXXXX" />
      <div id="recaptcha-container"></div>
      <button @click="sendCode">Send SMS Code</button>
    </div>

    <div v-if="step===2">
      <input v-model="code" placeholder="Enter SMS code" />
      <button @click="verifyCode">Verify</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { auth } from '../firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

export default {
  setup() {
    const phone = ref('')
    const code = ref('')
    const step = ref(1)
    let confirmationResult = null

    const sendCode = async () => {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { size: 'invisible' }, auth)
      try {
        confirmationResult = await signInWithPhoneNumber(auth, phone.value, window.recaptchaVerifier)
        step.value = 2
      } catch (e) {
        console.error(e)
        alert('Failed to send code: ' + e.message)
      }
    }

    const verifyCode = async () => {
      try {
        await confirmationResult.confirm(code.value)
        // On success: route to PIN setup or home
        window.location.href = '/'
      } catch (e) {
        alert('Invalid code')
      }
    }

    return { phone, code, step, sendCode, verifyCode }
  }
}
</script>

<style scoped>
input { width:100%; padding:10px; margin:8px 0 }
button { padding:10px 16px; background:#0f6160; color:white; border:none; border-radius:8px }
</style>
