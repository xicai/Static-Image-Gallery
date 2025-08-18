import { useState } from 'react'
import './Uploader.css'

const Uploader = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [error, setError] = useState(null)

  // Cloudinary 配置
  const CLOUD_NAME = 'dttmaz4zo'; // 替换成你的 Cloud Name
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/'+CLOUD_NAME+'/image/upload'
  const UPLOAD_PRESET = 'minemine' // 请替换为你的上传预设

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      setError('请选择图片文件')
      return
    }

    // 检查文件大小（限制为 10MB）
    if (file.size > 10 * 1024 * 1024) {
      setError('图片大小不能超过 10MB')
      return
    }

    setUploading(true)
    setError(null)
    setUploadedImage(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)

    try {
      const xhr = new XMLHttpRequest()

      // 监听上传进度
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100)
          setUploadProgress(progress)
        }
      })

      // 处理上传完成
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          setUploadedImage(response)
          if (onUploadSuccess) {
            onUploadSuccess(response)
          }
        } else {
          setError('上传失败，请重试')
        }
        setUploading(false)
      })

      // 处理错误
      xhr.addEventListener('error', () => {
        setError('网络错误，请重试')
        setUploading(false)
      })

      // 发送请求
      xhr.open('POST', CLOUDINARY_URL, true)
      xhr.send(formData)
    } catch {
      setError('上传出错，请重试')
      setUploading(false)
    }
  }

  const copyJsonToClipboard = () => {
    if (!uploadedImage) return

    // 生成新的图片对象
    const newImageObject = {
      id: `img-${Date.now()}`, // 使用时间戳生成唯一ID
      url: uploadedImage.secure_url,
      description: uploadedImage.original_filename || '新上传的图片',
      width: uploadedImage.width,
      height: uploadedImage.height,
      related_images: []
    }

    // 复制到剪贴板
    const jsonString = JSON.stringify(newImageObject, null, 2)
    navigator.clipboard.writeText(jsonString).then(() => {
      alert('JSON 已复制到剪贴板！请粘贴到 images.json 文件中')
    }).catch(err => {
      console.error('复制失败:', err)
      alert('复制失败，请手动复制')
    })
  }

  return (
    <div className="uploader-container">
      <div className="upload-area">
        <input
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="file-input"
        />
        <label htmlFor="file-input" className="upload-label">
          <div className="upload-icon">+</div>
          <p>点击或拖拽上传图片</p>
          <span>支持 JPG, PNG, GIF 格式，最大 10MB</span>
        </label>
      </div>

      {uploading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p>上传中... {uploadProgress}%</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {uploadedImage && (
        <div className="upload-success">
          <h3>上传成功！</h3>
          <img 
            src={uploadedImage.secure_url} 
            alt="Uploaded"
            className="uploaded-preview"
          />
          <div className="upload-info">
            <p><strong>文件名:</strong> {uploadedImage.original_filename}</p>
            <p><strong>尺寸:</strong> {uploadedImage.width} × {uploadedImage.height}</p>
            <p><strong>格式:</strong> {uploadedImage.format}</p>
          </div>
          <button 
            onClick={copyJsonToClipboard}
            className="copy-json-btn"
          >
            复制 JSON 到剪贴板
          </button>
        </div>
      )}
    </div>
  )
}

export default Uploader