import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient, Story, CreateStoryRequest, UpdateStoryRequest } from '../api'

// Query keys
export const storyKeys = {
  all: ['stories'] as const,
  lists: () => [...storyKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...storyKeys.lists(), { filters }] as const,
  details: () => [...storyKeys.all, 'detail'] as const,
  detail: (id: string) => [...storyKeys.details(), id] as const,
  userStories: (userId: string) => [...storyKeys.all, 'user', userId] as const,
}

// Get all stories
export function useStories() {
  return useQuery({
    queryKey: storyKeys.lists(),
    queryFn: () => apiClient.getStories(),
    select: (data) => data.stories,
  })
}

// Get single story
export function useStory(storyId: string) {
  return useQuery({
    queryKey: storyKeys.detail(storyId),
    queryFn: () => apiClient.getStory(storyId),
    select: (data) => data.story,
    enabled: !!storyId,
  })
}

// Get user stories
export function useUserStories(userId: string) {
  return useQuery({
    queryKey: storyKeys.userStories(userId),
    queryFn: () => apiClient.getUserStories(userId),
    select: (data) => data.stories,
    enabled: !!userId,
  })
}

// Create story mutation
export function useCreateStory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateStoryRequest) => apiClient.createStory(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: storyKeys.lists() })
      queryClient.invalidateQueries({ 
        queryKey: storyKeys.userStories(response.story.userId) 
      })
    },
  })
}

// Update story mutation
export function useUpdateStory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ storyId, data }: { storyId: string; data: UpdateStoryRequest }) =>
      apiClient.updateStory(storyId, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: storyKeys.lists() })
      queryClient.invalidateQueries({ 
        queryKey: storyKeys.detail(response.story.id) 
      })
      queryClient.invalidateQueries({ 
        queryKey: storyKeys.userStories(response.story.userId) 
      })
    },
  })
}

// Delete story mutation
export function useDeleteStory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (storyId: string) => apiClient.deleteStory(storyId),
    onSuccess: (_, storyId) => {
      queryClient.invalidateQueries({ queryKey: storyKeys.lists() })
      queryClient.removeQueries({ queryKey: storyKeys.detail(storyId) })
    },
  })
}

// Update story state mutation
export function useUpdateStoryState() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ 
      storyId, 
      state 
    }: { 
      storyId: string; 
      state: 'LEAD' | 'RESEARCH' | 'ANALYSIS' | 'WRITING' | 'PUBLISHED' 
    }) => apiClient.updateStoryState(storyId, state),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: storyKeys.lists() })
      queryClient.invalidateQueries({ 
        queryKey: storyKeys.detail(response.story.id) 
      })
      queryClient.invalidateQueries({ 
        queryKey: storyKeys.userStories(response.story.userId) 
      })
    },
  })
}