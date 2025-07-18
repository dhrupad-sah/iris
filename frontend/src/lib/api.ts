const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export interface User {
  id: string
  email: string
  name: string | null
  createdAt: string
}

export interface Story {
  id: string
  title: string
  description: string | null
  state: 'LEAD' | 'RESEARCH' | 'ANALYSIS' | 'WRITING' | 'PUBLISHED'
  createdAt: string
  updatedAt: string
  userId: string
  user?: User
  files?: File[]
  _count?: {
    files: number
    tags: number
    annotations: number
  }
}

export interface CreateStoryRequest {
  title: string
  description?: string
  userId: string
}

export interface UpdateStoryRequest {
  title?: string
  description?: string
  state?: 'LEAD' | 'RESEARCH' | 'ANALYSIS' | 'WRITING' | 'PUBLISHED'
}

export interface CreateUserRequest {
  email: string
  name?: string
}

export interface FileUpload {
  id: string
  filename: string
  originalName: string
  fileType: 'DOCUMENT' | 'AUDIO' | 'IMAGE' | 'VIDEO' | 'WEB_CLIP' | 'NOTE'
  fileSize: number
  mimeType: string
  publicUrl: string
  createdAt: string
  extractedText?: string
  transcription?: string
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // User endpoints
  async createUser(data: CreateUserRequest): Promise<{ user: User }> {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getUser(userId: string): Promise<{ user: User }> {
    return this.request(`/users/me`, {
      headers: {
        'user-id': userId,
      },
    })
  }

  async updateUser(userId: string, data: { name?: string }): Promise<{ user: User }> {
    return this.request(`/users/me`, {
      method: 'PUT',
      headers: {
        'user-id': userId,
      },
      body: JSON.stringify(data),
    })
  }

  // Story endpoints
  async getStories(): Promise<{ stories: Story[] }> {
    return this.request('/stories')
  }

  async getStory(storyId: string): Promise<{ story: Story }> {
    return this.request(`/stories/${storyId}`)
  }

  async createStory(data: CreateStoryRequest): Promise<{ story: Story }> {
    return this.request('/stories', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateStory(storyId: string, data: UpdateStoryRequest): Promise<{ story: Story }> {
    return this.request(`/stories/${storyId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteStory(storyId: string): Promise<{ message: string }> {
    return this.request(`/stories/${storyId}`, {
      method: 'DELETE',
    })
  }

  async updateStoryState(
    storyId: string,
    state: 'LEAD' | 'RESEARCH' | 'ANALYSIS' | 'WRITING' | 'PUBLISHED'
  ): Promise<{ story: Story }> {
    return this.request(`/stories/${storyId}/state`, {
      method: 'PUT',
      body: JSON.stringify({ state }),
    })
  }

  async getUserStories(userId: string): Promise<{ stories: Story[] }> {
    return this.request(`/users/${userId}/stories`)
  }

  // File endpoints
  async uploadFiles(storyId: string, files: FileList): Promise<{ message: string; files: FileUpload[] }> {
    const formData = new FormData()
    
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    const response = await fetch(`${this.baseURL}/files/upload/${storyId}`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    return response.json()
  }

  async getStoryFiles(storyId: string): Promise<{ files: FileUpload[] }> {
    return this.request(`/files/story/${storyId}`)
  }

  async getFile(fileId: string): Promise<{ file: FileUpload }> {
    return this.request(`/files/${fileId}`)
  }

  async deleteFile(fileId: string): Promise<{ message: string }> {
    return this.request(`/files/${fileId}`, {
      method: 'DELETE',
    })
  }

  async updateFile(fileId: string, data: { filename?: string; extractedText?: string; transcription?: string }): Promise<{ file: FileUpload }> {
    return this.request(`/files/${fileId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)