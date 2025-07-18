import { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { storageService } from '../../lib/storage'
import { supabaseAdmin } from '../../lib/supabase'

const prisma = new PrismaClient()

const files: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  
  // GET /files/test - Test storage connection
  fastify.get('/test', async function (request, reply) {
    try {
      const { data, error } = await supabaseAdmin.storage
        .from('iris-files')
        .list('', { limit: 1 })
      
      if (error) {
        console.error('Storage test error:', error)
        return reply.status(500).send({ error: 'Storage connection failed', details: error.message })
      }
      
      return { message: 'Storage connection working', data }
    } catch (error: any) {
      console.error('Storage test failed:', error)
      return reply.status(500).send({ error: 'Storage test failed', details: error.message })
    }
  })
  
  // POST /files/upload/:storyId - Upload files to a story
  fastify.post('/upload/:storyId', async function (request, reply) {
    try {
      const { storyId } = request.params as { storyId: string }
      
      console.log('File upload request received for story:', storyId)
      
      // Verify story exists
      const story = await prisma.story.findUnique({
        where: { id: storyId }
      })
      
      if (!story) {
        console.log('Story not found:', storyId)
        return reply.status(404).send({ error: 'Story not found' })
      }

      console.log('Story found:', story.title)

      // Check if request is multipart
      if (!request.isMultipart()) {
        return reply.status(400).send({ error: 'Request must be multipart' })
      }

      const uploadedFiles = []
      
      // Process each file
      for await (const part of request.parts()) {
        if (part.type === 'file') {
          const filename = part.filename
          const mimeType = part.mimetype

          if (!filename) {
            continue
          }

          // Convert stream to buffer
          const chunks: Buffer[] = []
          for await (const chunk of part.file) {
            chunks.push(chunk)
          }
          const fileBuffer = Buffer.concat(chunks)

          // Upload to storage
          const uploadResult = await storageService.uploadFile({
            file: fileBuffer,
            fileName: filename,
            mimeType,
            storyId
          })

          if (uploadResult.success && uploadResult.data) {
            // Save file metadata to database
            const file = await prisma.file.create({
              data: {
                filename: uploadResult.data.fileName,
                originalName: filename,
                fileType: storageService.getFileTypeFromMimeType(mimeType) as any,
                fileSize: uploadResult.data.fileSize,
                mimeType,
                filePath: uploadResult.data.path,
                storyId
              }
            })

            uploadedFiles.push({
              id: file.id,
              filename: file.filename,
              originalName: file.originalName,
              fileType: file.fileType,
              fileSize: file.fileSize,
              mimeType: file.mimeType,
              publicUrl: uploadResult.data.publicUrl,
              createdAt: file.createdAt
            })
          }
        }
      }

      return { 
        message: 'Files uploaded successfully',
        files: uploadedFiles 
      }

    } catch (error: any) {
      fastify.log.error(error)
      reply.status(500).send({ error: 'Failed to upload files' })
    }
  })

  // GET /files/story/:storyId - Get all files for a story
  fastify.get('/story/:storyId', async function (request, reply) {
    try {
      const { storyId } = request.params as { storyId: string }
      
      const files = await prisma.file.findMany({
        where: { storyId },
        orderBy: { createdAt: 'desc' }
      })

      // Add public URLs
      const filesWithUrls = await Promise.all(files.map(async file => ({
        ...file,
        publicUrl: await storageService.getFileUrl(file.filePath)
      })))

      return { files: filesWithUrls }

    } catch (error: any) {
      fastify.log.error(error)
      reply.status(500).send({ error: 'Failed to fetch files' })
    }
  })

  // GET /files/:id - Get a specific file
  fastify.get('/:id', async function (request, reply) {
    try {
      const { id } = request.params as { id: string }
      
      const file = await prisma.file.findUnique({
        where: { id },
        include: {
          story: {
            select: {
              id: true,
              title: true
            }
          }
        }
      })

      if (!file) {
        return reply.status(404).send({ error: 'File not found' })
      }

      return { 
        file: {
          ...file,
          publicUrl: await storageService.getFileUrl(file.filePath)
        }
      }

    } catch (error: any) {
      fastify.log.error(error)
      reply.status(500).send({ error: 'Failed to fetch file' })
    }
  })

  // DELETE /files/:id - Delete a file
  fastify.delete('/:id', async function (request, reply) {
    try {
      const { id } = request.params as { id: string }
      
      const file = await prisma.file.findUnique({
        where: { id }
      })

      if (!file) {
        return reply.status(404).send({ error: 'File not found' })
      }

      // Delete from storage
      const deleteResult = await storageService.deleteFile(file.filePath)
      
      if (!deleteResult.success) {
        return reply.status(500).send({ error: 'Failed to delete file from storage' })
      }

      // Delete from database
      await prisma.file.delete({
        where: { id }
      })

      return { message: 'File deleted successfully' }

    } catch (error: any) {
      fastify.log.error(error)
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'File not found' })
      }
      reply.status(500).send({ error: 'Failed to delete file' })
    }
  })

  // PUT /files/:id - Update file metadata
  fastify.put('/:id', async function (request, reply) {
    try {
      const { id } = request.params as { id: string }
      const { filename, extractedText, transcription } = request.body as {
        filename?: string
        extractedText?: string
        transcription?: string
      }

      const file = await prisma.file.update({
        where: { id },
        data: {
          ...(filename && { filename }),
          ...(extractedText !== undefined && { extractedText }),
          ...(transcription !== undefined && { transcription })
        }
      })

      return { 
        file: {
          ...file,
          publicUrl: await storageService.getFileUrl(file.filePath)
        }
      }

    } catch (error: any) {
      fastify.log.error(error)
      if (error.code === 'P2025') {
        return reply.status(404).send({ error: 'File not found' })
      }
      reply.status(500).send({ error: 'Failed to update file' })
    }
  })
}

export default files