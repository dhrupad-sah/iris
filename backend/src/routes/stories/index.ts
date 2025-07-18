import { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const stories: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  
  // GET /stories - Get all stories for a user
  fastify.get('/', async function (request, reply) {
    try {
      const stories = await prisma.story.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          files: {
            select: {
              id: true,
              filename: true,
              fileType: true,
              createdAt: true
            }
          },
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
      reply.status(500).send({ error: 'Failed to fetch stories' })
    }
  })

  // GET /stories/:id - Get a specific story
  fastify.get('/:id', async function (request, reply) {
    try {
      const { id } = request.params as { id: string }
      
      const story = await prisma.story.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          files: true,
          tags: true,
          annotations: {
            include: {
              tags: true
            }
          }
        }
      })
      
      if (!story) {
        return reply.status(404).send({ error: 'Story not found' })
      }
      
      return { story }
    } catch (error) {
      fastify.log.error(error)
      reply.status(500).send({ error: 'Failed to fetch story' })
    }
  })

  // POST /stories - Create a new story
  fastify.post('/', async function (request, reply) {
    try {
      const { title, description, userId } = request.body as {
        title: string
        description?: string
        userId: string
      }
      
      if (!title || !userId) {
        return reply.status(400).send({ error: 'Title and userId are required' })
      }
      
      const story = await prisma.story.create({
        data: {
          title,
          description,
          userId,
          state: 'LEAD' // Start with LEAD state
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })
      
      return { story }
    } catch (error) {
      fastify.log.error(error)
      reply.status(500).send({ error: 'Failed to create story' })
    }
  })

  // PUT /stories/:id - Update a story
  fastify.put('/:id', async function (request, reply) {
    try {
      const { id } = request.params as { id: string }
      const { title, description, state } = request.body as {
        title?: string
        description?: string
        state?: 'LEAD' | 'RESEARCH' | 'ANALYSIS' | 'WRITING' | 'PUBLISHED'
      }
      
      const story = await prisma.story.update({
        where: { id },
        data: {
          ...(title && { title }),
          ...(description !== undefined && { description }),
          ...(state && { state })
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })
      
      return { story }
    } catch (error: any) {
      fastify.log.error(error)
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'Story not found' })
      }
      reply.status(500).send({ error: 'Failed to update story' })
    }
  })

  // DELETE /stories/:id - Delete a story
  fastify.delete('/:id', async function (request, reply) {
    try {
      const { id } = request.params as { id: string }
      
      await prisma.story.delete({
        where: { id }
      })
      
      return { message: 'Story deleted successfully' }
    } catch (error: any) {
      fastify.log.error(error)
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'Story not found' })
      }
      reply.status(500).send({ error: 'Failed to delete story' })
    }
  })

  // PUT /stories/:id/state - Update story state
  fastify.put('/:id/state', async function (request, reply) {
    try {
      const { id } = request.params as { id: string }
      const { state } = request.body as {
        state: 'LEAD' | 'RESEARCH' | 'ANALYSIS' | 'WRITING' | 'PUBLISHED'
      }
      
      if (!state) {
        return reply.status(400).send({ error: 'State is required' })
      }
      
      const story = await prisma.story.update({
        where: { id },
        data: { state },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      })
      
      return { story }
    } catch (error: any) {
      fastify.log.error(error)
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'Story not found' })
      }
      reply.status(500).send({ error: 'Failed to update story state' })
    }
  })
}

export default stories