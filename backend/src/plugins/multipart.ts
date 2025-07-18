import fp from 'fastify-plugin'
import multipart from '@fastify/multipart'

export default fp(async function (fastify, opts) {
  await fastify.register(multipart, {
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB limit
      files: 10 // Max 10 files per request
    }
  })
})