import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient, FileUpload } from '../api'

// Query keys
export const fileKeys = {
  all: ['files'] as const,
  lists: () => [...fileKeys.all, 'list'] as const,
  storyFiles: (storyId: string) => [...fileKeys.lists(), 'story', storyId] as const,
  details: () => [...fileKeys.all, 'detail'] as const,
  detail: (id: string) => [...fileKeys.details(), id] as const,
}

// Get files for a story
export function useStoryFiles(storyId: string) {
  return useQuery({
    queryKey: fileKeys.storyFiles(storyId),
    queryFn: () => apiClient.getStoryFiles(storyId),
    select: (data) => data.files,
    enabled: !!storyId,
  })
}

// Get single file
export function useFile(fileId: string) {
  return useQuery({
    queryKey: fileKeys.detail(fileId),
    queryFn: () => apiClient.getFile(fileId),
    select: (data) => data.file,
    enabled: !!fileId,
  })
}

// Upload files mutation
export function useUploadFiles() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ storyId, files }: { storyId: string; files: FileList }) =>
      apiClient.uploadFiles(storyId, files),
    onSuccess: (data, variables) => {
      // Invalidate story files query
      queryClient.invalidateQueries({ 
        queryKey: fileKeys.storyFiles(variables.storyId) 
      })
      
      // Update individual file queries
      data.files.forEach(file => {
        queryClient.setQueryData(fileKeys.detail(file.id), file)
      })
    },
  })
}

// Delete file mutation
export function useDeleteFile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (fileId: string) => apiClient.deleteFile(fileId),
    onSuccess: (_, fileId) => {
      // Remove from all queries
      queryClient.removeQueries({ queryKey: fileKeys.detail(fileId) })
      
      // Invalidate lists to refresh
      queryClient.invalidateQueries({ queryKey: fileKeys.lists() })
    },
  })
}

// Update file mutation
export function useUpdateFile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ 
      fileId, 
      data 
    }: { 
      fileId: string; 
      data: { filename?: string; extractedText?: string; transcription?: string } 
    }) => apiClient.updateFile(fileId, data),
    onSuccess: (response) => {
      // Update individual file query
      queryClient.setQueryData(fileKeys.detail(response.file.id), response.file)
      
      // Invalidate lists to refresh
      queryClient.invalidateQueries({ queryKey: fileKeys.lists() })
    },
  })
}

// Upload audio recording mutation (same as upload files but with specific naming)
export function useUploadAudioRecording() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ storyId, files }: { storyId: string; files: FileList }) =>
      apiClient.uploadFiles(storyId, files),
    onSuccess: (data, variables) => {
      // Invalidate story files query
      queryClient.invalidateQueries({ 
        queryKey: fileKeys.storyFiles(variables.storyId) 
      })
      
      // Update individual file queries
      data.files.forEach(file => {
        queryClient.setQueryData(fileKeys.detail(file.id), file)
      })
    },
  })
}