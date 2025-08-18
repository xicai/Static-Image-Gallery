import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import Uploader from './Uploader'
import { getOptimizedImageUrl } from '../utils/cloudinary'
import './HomePage.css'

const HomePage = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showUploader, setShowUploader] = useState(false)

  const handleUploadSuccess = (uploadedImage) => {
    // 可以在这里添加上传成功后的逻辑
    console.log('上传成功:', uploadedImage)
  }

  useEffect(() => {
    // 从 public/images.json 获取图片数据
    fetch('/images.json')
      .then(response => response.json())
      .then(data => {
        setImages(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading images:', error)
        setLoading(false)
      })
  }, [])

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    )
  }

  return (
    <div className="home-page">
      <header className="header">
        <h1>静态图片画廊</h1>
        <p>基于 React 和 Cloudinary 的图片展示平台</p>
        <button 
          className="upload-btn"
          onClick={() => setShowUploader(!showUploader)}
        >
          {showUploader ? '收起上传' : '上传图片'}
        </button>
      </header>
      
      {showUploader && (
        <Uploader onUploadSuccess={handleUploadSuccess} />
      )}
      
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image) => {
          // 使用优化的图片 URL
          const optimizedUrl = getOptimizedImageUrl(image.url, {
            width: 800,
            quality: 'auto',
            format: 'auto'
          })
          
          return (
            <div key={image.id} className="image-card">
              <Link to={`/image/${image.id}`}>
                <img 
                  src={optimizedUrl}
                  alt={image.description}
                  loading="lazy"
                />
                <div className="image-overlay">
                  <p>{image.description}</p>
                </div>
              </Link>
            </div>
          )
        })}
      </Masonry>
    </div>
  )
}

export default HomePage