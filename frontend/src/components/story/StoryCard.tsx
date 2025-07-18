import { Story } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'

interface StoryCardProps {
  story: Story
  onStoryClick?: (story: Story) => void
  onStateChange?: (storyId: string, state: Story['state']) => void
}

const storyStateVariants = {
  LEAD: 'lead',
  RESEARCH: 'research', 
  ANALYSIS: 'analysis',
  WRITING: 'writing',
  PUBLISHED: 'published',
} as const

const storyStateLabels = {
  LEAD: 'Lead',
  RESEARCH: 'Research',
  ANALYSIS: 'Analysis', 
  WRITING: 'Writing',
  PUBLISHED: 'Published',
} as const

export function StoryCard({ story, onStoryClick, onStateChange }: StoryCardProps) {
  const router = useRouter()
  
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation()
    const newState = e.target.value as Story['state']
    onStateChange?.(story.id, newState)
  }

  const handleCardClick = () => {
    onStoryClick?.(story)
    router.push(`/stories/${story.id}`)
  }

  return (
    <div
      className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer bg-white"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {story.title}
          </h3>
          {story.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {story.description}
            </p>
          )}
        </div>
        <div className="ml-4 flex-shrink-0">
          <Badge variant={storyStateVariants[story.state]}>
            {storyStateLabels[story.state]}
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {story._count?.files || 0} files
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a.997.997 0 01-1.414 0l-7-7A1.997 1.997 0 013 12V7a4 4 0 014-4z" />
            </svg>
            {story._count?.tags || 0} tags
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(story.updatedAt), { addSuffix: true })}
          </span>
          <select
            value={story.state}
            onChange={handleStateChange}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={(e) => e.stopPropagation()}
          >
            <option value="LEAD">Lead</option>
            <option value="RESEARCH">Research</option>
            <option value="ANALYSIS">Analysis</option>
            <option value="WRITING">Writing</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
      </div>
    </div>
  )
}