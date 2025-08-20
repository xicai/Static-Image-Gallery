import { useState } from 'react'
import './Uploader.css'

const Uploader = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [error, setError] = useState(null)
  const [debugInfo, setDebugInfo] = useState(null)

  // Cloudinary 配置
  const CLOUD_NAME = 'dttmaz4zo'
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/'+CLOUD_NAME+'/image/upload'
  const UPLOAD_PRESET = 'minemine'

  const logDebug = (message, data) => {
    const debugMsg = `[${new Date().toISOString()}] ${message}`
    console.log(debugMsg, data)
    setDebugInfo(prev => prev ? `${prev}\n${debugMsg}` : debugMsg)
  }

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    logDebug('选择的文件:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified).toISOString()
    })

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
    setDebugInfo('开始上传...')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)
    // 添加 folder 参数，与 Upload Preset 配置匹配
    formData.append('folder', 'samples/ecommerce')

    logDebug('上传配置:', {
      url: CLOUDINARY_URL,
      preset: UPLOAD_PRESET,
      cloudName: CLOUD_NAME
    })

    try {
      const xhr = new XMLHttpRequest()

      // 监听上传进度
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100)
          setUploadProgress(progress)
          logDebug(`上传进度: ${progress}%`)
        }
      })

      // 处理上传完成
      xhr.addEventListener('load', () => {
        logDebug('上传响应:', {
          status: xhr.status,
          statusText: xhr.statusText,
          response: xhr.responseText
        })

        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText)
            setUploadedImage(response)
            logDebug('上传成功!', response)
            if (onUploadSuccess) {
              onUploadSuccess(response)
            }
          } catch (parseError) {
            logDebug('解析响应失败:', parseError)
            setError('解析响应失败')
          }
        } else {
          let errorMsg = '上传失败，请重试'
          try {
            const errorResponse = JSON.parse(xhr.responseText)
            errorMsg = errorResponse.error?.message || errorResponse.message || errorMsg
            logDebug('服务器错误:', errorResponse)
          } catch {
            logDebug('无法解析错误响应:', xhr.responseText)
          }
          setError(errorMsg)
        }
        setUploading(false)
      })

      // 处理错误
      xhr.addEventListener('error', () => {
        logDebug('网络错误')
        setError('网络错误，请重试')
        setUploading(false)
      })

      // 处理超时
      xhr.addEventListener('timeout', () => {
        logDebug('请求超时')
        setError('上传超时，请重试')
        setUploading(false)
      })

      // 发送请求
      xhr.open('POST', CLOUDINARY_URL, true)
      xhr.timeout = 60000 // 60秒超时
      xhr.send(formData)

      logDebug('请求已发送')
    } catch (err) {
      logDebug('上传异常:', err)
      setError('上传出错，请重试')
      setUploading(false)
    }
  }

  const copyJsonToClipboard = () => {
    if (!uploadedImage) return

    // 生成新的图片对象
    const newImageObject = {
      id: `img-${Date.now()}`,
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

  const testCloudinaryConnection = async () => {
    setDebugInfo('直接测试上传功能...')
    
    // 创建一个测试图片
    const canvas = document.createElement('canvas')
    canvas.width = 100
    canvas.height = 100
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(0, 0, 100, 100)
    
    canvas.toBlob(async (blob) => {
      const formData = new FormData()
      formData.append('file', blob, 'test.png')
      formData.append('upload_preset', UPLOAD_PRESET)
      formData.append('folder', 'samples/ecommerce')
      
      logDebug('测试上传配置:', {
        url: CLOUDINARY_URL,
        preset: UPLOAD_PRESET,
        folder: 'samples/ecommerce'
      })
      
      try {
        const response = await fetch(CLOUDINARY_URL, {
          method: 'POST',
          body: formData
        })
        
        const data = await response.json()
        logDebug('测试上传结果:', {
          status: response.status,
          data: data
        })
        
        if (response.ok) {
          alert('✅ 上传测试成功！图片已上传到 Cloudinary')
          console.log('上传的图片 URL:', data.secure_url)
        } else {
          alert(`❌ 上传失败: ${data.error?.message || '未知错误'}`)
        }
      } catch (err) {
        logDebug('测试上传异常:', err)
        alert('网络错误，无法连接到 Cloudinary')
      }
    }, 'image/png')
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

      <div style={{ marginTop: '10px' }}>
        <button 
          onClick={testCloudinaryConnection}
          style={{ padding: '5px 10px', fontSize: '12px' }}
        >
          测试上传功能
        </button>
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
            <p><strong>Public ID:</strong> {uploadedImage.public_id}</p>
            <p><strong>URL:</strong> 
              <a href={uploadedImage.secure_url} target="_blank" rel="noopener noreferrer">
                查看图片
              </a>
            </p>
          </div>
          <button 
            onClick={copyJsonToClipboard}
            className="copy-json-btn"
          >
            复制 JSON 到剪贴板
          </button>
        </div>
      )}

      {debugInfo && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', fontSize: '12px' }}>
          <h4>调试信息:</h4>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {debugInfo}
          </pre>
        </div>
      )}
    </div>
  )
}

export default Uploader