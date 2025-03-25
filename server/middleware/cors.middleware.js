const cors = require('cors')

const allowedOrigins = [
  'https://cloudy-disk-client.onrender.com',
  'http://localhost:3000'
]

const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
})

module.exports = corsMiddleware
