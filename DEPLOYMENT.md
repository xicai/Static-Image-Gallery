# 静态图片画廊 - 部署说明

## 项目简介

这是一个基于 React 和 Cloudinary 的静态图片画廊项目。使用免费的第三方服务实现图片上传和存储，通过 GitHub Pages 免费托管。

## 部署步骤

### 1. 配置 Cloudinary

1. 注册 [Cloudinary](https://cloudinary.com/) 账号
2. 在 Dashboard 中找到你的 Cloud Name
3. 创建 Upload Preset：
   - 进入 Settings -> Upload
   - 在 Upload presets 下点击 "Add upload preset"
   - 设置 Mode 为 "Unsigned"
   - 记录下 Preset 名称

### 2. 更新上传配置

编辑 `src/components/Uploader.jsx` 文件：

```javascript
// 替换这两行
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload'
const UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET'
```

### 3. 更新 GitHub Pages 配置

编辑 `vite.config.js`，将 `base` 改为你的 GitHub 仓库名称：

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPO_NAME/', // 仓库名称
})
```

### 4. 推送到 GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 5. 启用 GitHub Pages

1. 进入 GitHub 仓库
2. 点击 Settings
3. 找到 Pages 部分
4. Source 选择 "Deploy from a branch"
5. Branch 选择 "gh-pages"
6. 点击 Save

## 使用流程

### 上传新图片

1. 在首页点击"上传图片"按钮
2. 选择要上传的图片文件
3. 等待上传完成
4. 点击"复制 JSON 到剪贴板"
5. 将复制的 JSON 内容粘贴到 `public/images.json` 文件中
6. 提交并推送更改到 GitHub

### 管理图片数据

所有图片数据都存储在 `public/images.json` 文件中。每个图片对象包含：

```json
{
  "id": "img-001",
  "url": "图片URL",
  "description": "图片描述",
  "width": 1200,
  "height": 800,
  "related_images": [
    {
      "id": "img-002",
      "url": "相关图片URL"
    }
  ]
}
```

## 开发命令

```bash
npm run dev    # 启动开发服务器
npm run build  # 构建生产版本
npm run lint   # 运行代码检查
npm run preview # 预览构建结果
```

## 功能特点

- 📱 响应式设计，支持移动端
- 🖼️ 瀑布流布局展示图片
- ☁️ Cloudinary 图片上传和优化
- 🚀 GitHub Pages 自动部署
- 📸 图片懒加载和性能优化
- 🎨 现代化 UI 设计