import { supabaseAdmin } from './supabase'
import { randomUUID } from 'crypto'
import path from 'path'

const STORAGE_BUCKET = 'iris-files'

export interface UploadFileParams {
  file: Buffer
  fileName: string
  mimeType: string
  storyId: string
}

export interface UploadFileResult {
  success: boolean
  data?: {
    path: string
    publicUrl: string
    fileName: string
    fileSize: number
  }
  error?: string
}

export class StorageService {
  async uploadFile({ file, fileName, mimeType, storyId }: UploadFileParams): Promise<UploadFileResult> {
    try {
      // Create unique filename with story organization
      const fileExt = path.extname(fileName)
      const baseName = path.basename(fileName, fileExt)
      const uniqueId = randomUUID()
      const storagePath = `stories/${storyId}/${uniqueId}-${baseName}${fileExt}`

      // Upload to Supabase Storage
      const { error } = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .upload(storagePath, file, {
          contentType: mimeType,
          duplex: 'half'
        })

      if (error) {
        console.error('Storage upload error:', error)
        return {
          success: false,
          error: error.message
        }
      }

      // Get public URL
      const { data: publicUrlData } = supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(storagePath)

      return {
        success: true,
        data: {
          path: storagePath,
          publicUrl: publicUrlData.publicUrl,
          fileName: fileName,
          fileSize: file.length
        }
      }

    } catch (error) {
      console.error('File upload error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  async deleteFile(filePath: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabaseAdmin.storage
        .from(STORAGE_BUCKET)
        .remove([filePath])

      if (error) {
        console.error('Storage delete error:', error)
        return {
          success: false,
          error: error.message
        }
      }

      return { success: true }

    } catch (error) {
      console.error('File delete error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  async getFileUrl(filePath: string): Promise<string> {
    const { data } = supabaseAdmin.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  getFileTypeFromMimeType(mimeType: string): string {
    if (mimeType.startsWith('image/')) return 'IMAGE'
    if (mimeType.startsWith('audio/')) return 'AUDIO'
    if (mimeType.startsWith('video/')) return 'VIDEO'
    if (mimeType.includes('pdf')) return 'DOCUMENT'
    if (mimeType.includes('word') || mimeType.includes('document')) return 'DOCUMENT'
    if (mimeType.includes('text')) return 'DOCUMENT'
    return 'DOCUMENT'
  }
}

export const storageService = new StorageService()