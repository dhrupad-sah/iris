import fp from 'fastify-plugin'
import cors from '@fastify/cors'

export default fp(async function (fastify, opts) {
  await fastify.register(cors, {
    origin: [
      'http://localhost:3001', // Next.js frontend
      'http://localhost:3000', // Alternative frontend port
      /^https:\/\/.*\.vercel\.app$/, // Vercel deployments
      /^https:\/\/.*\.netlify\.app$/, // Netlify deployments
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'user-id']
  })
})