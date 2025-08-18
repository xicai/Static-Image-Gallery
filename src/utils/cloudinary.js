/**
 * Cloudinary 图片 URL 优化工具
 */

// 基础配置
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com'

/**
 * 生成优化后的 Cloudinary 图片 URL
 * @param {string} url - 原始图片 URL
 * @param {Object} options - 优化选项
 * @param {number} options.width - 目标宽度
 * @param {number} options.height - 目标高度
 * @param {string} options.crop - 裁剪模式 (fill, limit, pad, scale, thumb)
 * @param {number} options.quality - 图片质量 (1-100)
 * @param {string} options.format - 图片格式 (auto, webp, jpg, png)
 * @returns {string} 优化后的 URL
 */
export function getOptimizedImageUrl(url, options = {}) {
  if (!url || !url.includes(CLOUDINARY_BASE_URL)) {
    return url
  }

  const {
    width,
    height,
    crop = 'limit',
    quality = 'auto',
    format = 'auto'
  } = options

  // 解析原始 URL
  const urlParts = url.split('/')
  const uploadIndex = urlParts.indexOf('upload')
  
  if (uploadIndex === -1) {
    return url
  }

  // 构建转换参数
  const transformations = []
  
  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (crop) transformations.push(`c_${crop}`)
  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)

  // 插入转换参数
  const optimizedUrl = [
    ...urlParts.slice(0, uploadIndex + 1),
    ...transformations,
    ...urlParts.slice(uploadIndex + 1)
  ].join('/')

  return optimizedUrl
}

/**
 * 生成不同尺寸的图片集合用于响应式设计
 * @param {string} url - 原始图片 URL
 * @param {Array<number>} widths - 需要的宽度数组
 * @returns {Array<{width: number, url: string}>} 不同尺寸的图片数组
 */
export function getResponsiveImageUrls(url, widths = [320, 640, 960, 1280]) {
  return widths.map(width => ({
    width,
    url: getOptimizedImageUrl(url, { width, crop: 'fill' })
  }))
}

/**
 * 生成 srcset 属性值
 * @param {string} url - 原始图片 URL
 * @param {Array<number>} widths - 需要的宽度数组
 * @returns {string} srcset 字符串
 */
export function generateSrcset(url, widths = [320, 640, 960, 1280]) {
  const responsiveUrls = getResponsiveImageUrls(url, widths)
  return responsiveUrls.map(({ width, url }) => `${url} ${width}w`).join(', ')
}