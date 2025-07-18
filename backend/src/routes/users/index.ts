import { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const users: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  
  // GET /users/me - Get current user profile
  fastify.get('/me', async function (request, reply) {
    try {
      // TODO: Extract user ID from JWT token
      const userId = request.headers['user-id'] as string
      
      if (!userId) {
        return reply.status(401).send({ error: 'Unauthorized' })
      }
      
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          _count: {
            select: {
              stories: true
            }
          }
        }
      })
      
      if (!user) {
        return reply.status(404).send({ error: 'User not found' })
      }
      
      return { user }
    } catch (error) {
      fastify.log.error(error)
      reply.status(500).send({ error: 'Failed to fetch user' })
    }
  })

  // POST /users - Create a new user (registration)
  fastify.post('/', async function (request, reply) {
    try {
      const { email, name } = request.body as {
        email: string
        name?: string
      }
      
      if (!email) {
        return reply.status(400).send({ error: 'Email is required' })
      }
      
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })
      
      if (existingUser) {
        return reply.status(409).send({ error: 'User already exists' })
      }
      
      const user = await prisma.user.create({
        data: {
          email,
          name
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true
        }
      })
      
      return { user }
    } catch (error) {
      fastify.log.error(error)
      reply.status(500).send({ error: 'Failed to create user' })
    }
  })

  // PUT /users/me - Update current user profile
  fastify.put('/me', async function (request, reply) {
    try {
      // TODO: Extract user ID from JWT token
      const userId = request.headers['user-id'] as string
      
      if (!userId) {
        return reply.status(401).send({ error: 'Unauthorized' })
      }
      
      const { name } = request.body as {
        name?: string
      }
      
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          ...(name !== undefined && { name })
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true
        }
      })
      
      return { user }
    } catch (error: any) {
      fastify.log.error(error)
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'User not found' })
      }
      reply.status(500).send({ error: 'Failed to update user' })
    }
  })

  // GET /users/:id/stories - Get all stories for a specific user
  fastify.get('/:id/stories', async function (request, reply) {
    try {
      const { id } = request.params as { id: string }
      
      const stories = await prisma.story.findMany({
        where: { userId: id },
        include: {
          _count: {
            select: {
              files: true,
              tags: true,
              annotations: true
            }
          }
        },
        orderBy: {
          updatedAt: 'desc'
        }
      })
      
      return { stories }
    } catch (error) {
      fastify.log.error(error)
      reply.status(500).send({ error: 'Failed to fetch user stories' })
    }
  })
}

export default users