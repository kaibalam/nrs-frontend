// src/api.js
import axios from 'axios'


// Usa variable de entorno Vite para tu backend real (o cambia el valor por defecto):
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
export const api = axios.create({ baseURL })


// Activa mocks con VITE_USE_MOCKS=true en .env.local, o si prefieres, ponla en false cuando ya tengas backend.
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true'


// --- Endpoints reales ---
export async function getCountries() {
if (USE_MOCKS) return mockCountries()
const { data } = await api.get('/countries')
// Ajusta nombres de campos si tu API difiere
// Se espera un array: [{ id, name }]
return data
}


export async function getCountiesByCountry(countryId) {
if (USE_MOCKS) return mockCounties(countryId)
const { data } = await api.get(`/countries/${countryId}/counties`)
// Se espera un array: [{ id, name, code }]
return data
}


// --- Mocks para desarrollo sin backend ---
function delay(ms) { return new Promise(r => setTimeout(r, ms)) }


async function mockCountries() {
await delay(400)
return [
{ id: 1, name: 'Guatemala' },
{ id: 2, name: 'El Salvador' },
{ id: 3, name: 'Honduras' }
]
}


async function mockCounties(countryId) {
await delay(600)
const base = [
{ id: 101, name: 'Guatemala', code: 'GUA' },
{ id: 102, name: 'Mixco', code: 'MIX' },
{ id: 103, name: 'Villa Nueva', code: 'VNV' },
{ id: 104, name: 'Quetzaltenango', code: 'QTA' },
{ id: 105, name: 'Antigua Guatemala', code: 'ATG' },
]
// Cambia un poco por país para ver la UI viva
return base.map((r) => ({ ...r, id: Number(`${countryId}${r.id}`) }))
}