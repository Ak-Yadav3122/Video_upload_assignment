"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const VideoUploadForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    thumbnailUrl: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to upload video')
      }

      setFormData({
        title: '',
        description: '',
        url: '',
        thumbnailUrl: ''
      })

    
      router.refresh()
      
      
      if (onSuccess) {
        onSuccess()
      }
      
    } catch (error) {
      console.error('Error uploading video:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload New Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Video Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter your description "
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium mb-1">
            Video URL *
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your video URL address"
            required
          />
        </div>  
        
          <div className="mb-4">
          <label htmlFor="thumbnailUrl" className="block text-sm font-medium mb-1">
            Thumbnail URL *
          </label>
          <input
            type="url"
            id="thumbnailUrl"
            name="thumbnailUrl"
            value={formData.thumbnailUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Inter your thumbnail URL Image address"
            required
          />
        </div>
    
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex justify-center items-center"
        >
          {isLoading ? (
            <span>Publishing...</span>
          ) : (
            <span>Publish Video</span>
          )}
        </button>
      </form>
    </div>
  )
}

export default VideoUploadForm