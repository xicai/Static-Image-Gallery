import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import { getOptimizedImageUrl } from '../utils/cloudinary'
import './DetailPage.css'

const DetailPage = () => {
  const { id } = useParams()
  const [image, setImage] = useState(null)
  const [allImages, setAllImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/images.json')
      .then(response => response.json())
      .then(data => {
        setAllImages(data)
        const currentImage = data.find(img => img.id === id)
        setImage(currentImage)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading image:', error)
        setLoading(false)
      })
  }, [id])

  const breakpointColumnsObj = {
    default: 3,
    900: 2,
    600: 1
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    )
  }

  if (!image) {
    return (
      <div className="error-container">
        <h2>图片未找到</h2>
        <p>抱歉，找不到ID为 {id} 的图片</p>
        <Link to="/" className="back-link">返回首页</Link>
      </div>
    )
  }

  return (
    <div className="detail-page">
      <div className="detail-header">
        <Link to="/" className="back-link">← 返回首页</Link>
        <h1>图片详情</h1>
      </div>

      <div className="detail-content">
        <div className="main-image-container">
          <img 
            src={getOptimizedImageUrl(image.url, {
              width: 1200,
              quality: 'auto:best',
              format: 'auto'
            })}
            alt={image.description}
            className="main-image"
          />
          <div className="image-info">
            <h2>{image.description}</h2>
            <p className="image-meta">
              尺寸: {image.width} × {image.height}
            </p>
          </div>
        </div>

        {image.related_images && image.related_images.length > 0 && (
          <div className="related-section">
            <h3>相关图片</h3>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {image.related_images.map((relatedImage) => {
                const fullRelatedImage = allImages.find(img => img.id === relatedImage.id)
                return (
                  <Link 
                    key={relatedImage.id} 
                    to={`/image/${relatedImage.id}`}
                    className="related-image-card"
                  >
                    <img 
                      src={getOptimizedImageUrl(relatedImage.url, {
                        width: 400,
                        quality: 'auto',
                        format: 'auto'
                      })}
                      alt={fullRelatedImage?.description || '相关图片'}
                      loading="lazy"
                    />
                    <div className="related-image-overlay">
                      <p>{fullRelatedImage?.description || '相关图片'}</p>
                    </div>
                  </Link>
                )
              })}
            </Masonry>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailPage