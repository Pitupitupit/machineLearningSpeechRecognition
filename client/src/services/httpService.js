import axios from 'axios'

export const HTTP = axios.create({
  headers: { 'Access-Control-Allow-Origin': '*' },
  baseURL: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8081' : 'https://api.speechr.com'
})
