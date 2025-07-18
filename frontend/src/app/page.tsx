'use client'

import { useState } from 'react'
import { useStories } from '@/lib/hooks/useStories'
import { StoryList } from '@/components/story/StoryList'
import { CreateStoryModal } from '@/components/story/CreateStoryModal'
import { Story } from '@/lib/api'

export default function Dashboard() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { data: stories, isLoading, error } = useStories()

  // For demo purposes, using a hardcoded user ID
  // In a real app, this would come from authentication
  const userId = "cmd8uwybq0000y1zhcobovgqc"

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story)
    // TODO: Navigate to story detail page
    console.log('Story clicked:', story)
  }

  const handleCreateStory = () => {
    setShowCreateModal(true)
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-500 mb-4">
            {error.message || 'Failed to load stories'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Iris
              </h1>
              <p className="text-gray-600">
                Your journalist workbench
              </p>
            </div>
            <button
              onClick={handleCreateStory}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Story</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Your Stories
          </h2>
          <p className="text-gray-600">
            Manage your investigations and research projects
          </p>
        </div>

        <StoryList
          stories={stories || []}
          onStoryClick={handleStoryClick}
          loading={isLoading}
          emptyMessage="No stories yet. Create your first story to get started!"
        />
      </main>

      <CreateStoryModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        userId={userId}
      />
    </div>
  )
}