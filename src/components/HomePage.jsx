import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import { getOptimizedImageUrl } from '../utils/cloudinary'
import './HomePage.css'

const HomePage = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('HomePage component mounted')
    fetch(`${import.meta.env.BASE_URL}images.json`)
      .then(response => {
        console.log('Response status:', response.status)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        console.log('Loaded images:', data)
        setImages(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading images:', error)
        setError(error.message)
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

  if (error) {
    return (
      <div className="error-container">
        <p>加载图片时出错: {error}</p>
      </div>
    )
  }

  return (
    <div className="home-page">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image) => (
          <Link
            key={image.id}
            to={`/image/${image.id}`}
            className="image-card"
          >
            <div className="image-wrapper">
              <img
                src={getOptimizedImageUrl(image.url, {
                  width: 400,
                  quality: 'auto',
                  format: 'auto'
                })}
                alt={image.description}
                loading="lazy"
              />
              <div className="image-overlay">
                <p>{image.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </Masonry>
    </div>
  )
}

export default HomePage