import { Story } from '@/lib/api'
import { StoryCard } from './StoryCard'
import { useUpdateStoryState } from '@/lib/hooks/useStories'

interface StoryListProps {
  stories: Story[]
  onStoryClick?: (story: Story) => void
  loading?: boolean
  emptyMessage?: string
}

export function StoryList({ 
  stories, 
  onStoryClick, 
  loading = false, 
  emptyMessage = "No stories yet" 
}: StoryListProps) {
  const updateStoryState = useUpdateStoryState()

  const handleStateChange = (storyId: string, state: Story['state']) => {
    updateStoryState.mutate({ storyId, state })
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-6 border border-gray-200 rounded-lg bg-white animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="h-5 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-4 w-12 bg-gray-200 rounded"></div>
                <div className="h-4 w-12 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-500">
          Create your first story to get started with your investigation.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          story={story}
          onStoryClick={onStoryClick}
          onStateChange={handleStateChange}
        />
      ))}
    </div>
  )
}