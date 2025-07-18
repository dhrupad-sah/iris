import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { apiClient, User, CreateUserRequest } from '../api'

// Query keys
export const userKeys = {
  all: ['users'] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
}

// Get user
export function useUser(userId: string) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => apiClient.getUser(userId),
    select: (data) => data.user,
    enabled: !!userId,
  })
}

// Create user mutation
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUserRequest) => apiClient.createUser(data),
    onSuccess: (response) => {
      queryClient.setQueryData(
        userKeys.detail(response.user.id),
        response.user
      )
    },
  })
}

// Update user mutation
export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: { name?: string } }) =>
      apiClient.updateUser(userId, data),
    onSuccess: (response) => {
      queryClient.setQueryData(
        userKeys.detail(response.user.id),
        response.user
      )
    },
  })
}