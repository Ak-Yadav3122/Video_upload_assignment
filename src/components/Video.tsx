"use client"
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import VideoUploadForm from './VideoUploadForm'
import Image from 'next/image'
import Link from 'next/link'

interface VideoType {
  id: string
  title: string
  description?: string | null
  url: string
  thumbnailUrl?: string | null
  published: boolean
  createdAt: string
}

const Video = forwardRef((props, ref) => {
  const [videos, setVideos] = useState<VideoType[]>([])
  const [loading, setLoading] = useState(true)
  const [showUploadForm, setShowUploadForm] = useState(false)

  useImperativeHandle(ref, () => ({
    setShowUploadForm
  }))

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/videos')
      if (!response.ok) {
        throw new Error('Failed to fetch videos')
      }
      const data = await response.json()
      setVideos(data)
    } catch (error) {
      console.error('Error fetching videos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  const handleUploadSuccess = () => {
    setShowUploadForm(false)
    fetchVideos()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Add this new function to handle video deletion
  const handleDeleteVideo = async (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      try {
        const response = await fetch(`/api/videos?id=${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete video');
        }
        
        // Remove the video from the state
        setVideos(videos.filter(video => video.id !== id));
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  return (
    <div>
      {showUploadForm && (
        <div className="mb-8">
          <VideoUploadForm onSuccess={handleUploadSuccess} />
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p>Loading videos...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No videos found. Upload your first video!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div key={video.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative pb-[56.25%]">
                {video.thumbnailUrl ? (
                  <Image 
                    src={video.thumbnailUrl} 
                    alt={video.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No thumbnail</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg">{video.title}</h3>
                 
                </div>
                {video.description && (
                  <p className="text-gray-600 mt-1 line-clamp-2">{video.description}</p>
                )}
                <p className="text-gray-500 text-sm mt-2">
                  Published on {formatDate(video.createdAt)}
                </p>
                <div className="flex space-x-46">
                  <Link 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-purple-600 hover:text-purple-800"
                >
                  Watch Video
                </Link> 

                <button 
                    onClick={() => handleDeleteVideo(video.id)}
                   className="mt-3 inline-block text-red-600 hover:text-red-800"
                    title="Delete video"
                  >
                   Delete
                  </button>
                </div>
               
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
})

Video.displayName = 'Video'

export default Video