"use client"
import { useState, useRef } from "react";
import Video from "@/components/Video";
import Live from "@/components/Live";
import Posts from "@/components/Posts";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Videos");
const videoComponentRef = useRef<{ setShowUploadForm: (show: boolean) => void }>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "Videos":
        return <Video ref={videoComponentRef} />;
      case "Live":
        return <Live />;
      case "Posts":
        return <Posts />;
      default:
        return <Video ref={videoComponentRef} />;
    }
  };

  const handleUploadClick = () => {
    if (activeTab === "Videos" && videoComponentRef.current) {
      videoComponentRef.current.setShowUploadForm(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold mb-6">
        Your Content
      </h1>
      
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button 
            onClick={() => setActiveTab("Videos")}
            className={`${
              activeTab === "Videos" 
                ? "border-indigo-500 text-indigo-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
          >
            Videos
          </button>
          <button 
            onClick={() => setActiveTab("Live")}
            className={`${
              activeTab === "Live" 
                ? "border-indigo-500 text-indigo-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
          >
            Live
          </button>
          <button 
            onClick={() => setActiveTab("Posts")}
            className={`${
              activeTab === "Posts" 
                ? "border-indigo-500 text-indigo-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
          >
            Posts
          </button>
        </nav>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button 
            onClick={handleUploadClick}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full"
          >
            <span>Upload {activeTab === "Posts" ? "Post" : activeTab === "Live" ? "Stream" : "Video"}</span>
          </button>
        </div>
      </div>
  
      {renderContent()}
    </div>
  );
}