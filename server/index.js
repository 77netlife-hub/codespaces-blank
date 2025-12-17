const express = require('express')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const REL_BASE = 'https://payments.relworx.com/api'
const API_KEY = process.env.RELWORX_API_KEY
const ACCOUNT_NO = process.env.RELWORX_ACCOUNT_NO

if(!API_KEY) console.warn('WARNING: RELWORX_API_KEY not set - set it in .env')

// simple request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - from ${req.ip}`)
  next()
})

console.log('Relworx proxy starting', { REL_BASE, ACCOUNT_NO: ACCOUNT_NO || '(not set)', API_KEY_set: !!API_KEY })

const authHeaders = () => ({
  Accept: 'application/vnd.relworx.v2',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${API_KEY}`
})

app.get('/api/relworx/products', async (req, res) => {
  try {
    console.log('GET /api/relworx/products -> fetching products from Relworx')
    const r = await axios.get(`${REL_BASE}/products`, { headers: authHeaders() })
    console.log('Relworx /products responded', { status: r.status, items: Array.isArray(r.data) ? r.data.length : undefined })
    res.json(r.data)
  } catch (e) {
    console.error('Error fetching /products:', e.message, e.response && e.response.data)
    res.status(500).json({ success:false, message: e.message, raw: e.response && e.response.data })
  }
})

app.get('/api/relworx/price-list', async (req, res) => {
  const code = req.query.code
  if(!code) return res.status(400).json({ success:false, message:'code query param required' })
  try {
    console.log('GET /api/relworx/price-list', { code })
    const r = await axios.get(`${REL_BASE}/products/price-list?code=${encodeURIComponent(code)}`, { headers: authHeaders() })
    console.log('Relworx /price-list responded', { status: r.status })
    res.json(r.data)
  } catch (e) {
    console.error('Error fetching /price-list:', e.message, e.response && e.response.data)
    res.status(500).json({ success:false, message: e.message, raw: e.response && e.response.data })
  }
})

app.post('/api/relworx/validate', async (req, res) => {
  const body = req.body
  try {
    console.log('POST /api/relworx/validate', { body: { ...body, sensitive: 'omitted' } })
    const r = await axios.post(`${REL_BASE}/products/validate`, body, { headers: authHeaders() })
    console.log('Relworx /validate responded', { status: r.status, data: r.data })
    res.json(r.data)
  } catch (e) {
    console.error('Error POST /validate:', e.message, e.response && e.response.data)
    res.status(500).json({ success:false, message: e.message, raw: e.response && e.response.data })
  }
})

app.post('/api/relworx/purchase', async (req, res) => {
  const body = req.body
  try {
    console.log('POST /api/relworx/purchase', { body: { ...body, sensitive: 'omitted' } })
    const r = await axios.post(`${REL_BASE}/products/purchase`, body, { headers: authHeaders() })
    console.log('Relworx /purchase responded', { status: r.status })
    res.json(r.data)
  } catch (e) {
    console.error('Error POST /purchase:', e.message, e.response && e.response.data)
    res.status(500).json({ success:false, message: e.message, raw: e.response && e.response.data })
  }
})

// root route to avoid "Cannot GET /" and to sanity-check the proxy
app.get('/', (req, res) => {
  res.send('Relworx proxy running')
})

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log(`Relworx proxy listening on ${port}`))
