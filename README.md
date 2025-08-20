# 静态图片画廊

一个基于 React 和 Vite 构建的静态图片画廊应用，支持瀑布流布局和 Cloudinary 图片上传。

## ✨ 功能特点

### 🖼️ 图片展示
- **瀑布流布局** - 响应式图片网格布局
- **图片详情页** - 点击查看大图和详细信息
- **响应式设计** - 适配桌面和移动设备
- **快速加载** - 图片懒加载和优化

### 📤 图片上传
- **单图上传** - 支持拖拽和点击上传
- **批量上传** - 多文件并行上传
- **实时进度** - 上传进度可视化
- **Cloudinary 集成** - 自动图片优化和 CDN 加速

### 🛠️ 开发特性
- **React 19** - 使用最新 React 版本
- **Vite** - 快速的开发和构建工具
- **TypeScript** - 类型安全支持
- **ESLint** - 代码质量检查
- **GitHub Pages** - 免费静态部署

## 🚀 快速开始

### 环境要求
- Node.js >= 18
- npm >= 8

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:5173/Static-Image-Gallery/#/

### 构建生产版本
```bash
npm run build
npm run preview
```

## 📤 上传功能

### 单图上传
1. 在首页点击上传按钮
2. 选择图片文件（JPG, PNG, GIF，最大 10MB）
3. 等待上传完成
4. 复制生成的 JSON 数据
5. 添加到 `public/images.json`

### 批量上传
1. 访问 `/batch-upload` 页面
2. 选择多个图片文件
3. 设置并发上传数量（1-5）
4. 点击"开始上传"
5. 查看上传进度和结果
6. 复制所有成功上传的 JSON 数据
7. 添加到 `public/images.json`

详细使用指南请查看 [BATCH_UPLOAD_GUIDE.md](./BATCH_UPLOAD_GUIDE.md)

## 🧪 测试

### 上传功能测试
```bash
# Node.js 测试
npm run test:upload

# 批量上传测试页面
open test-batch-upload.html

# curl 测试
./test-upload-curl.sh your-image.jpg
```

### 代码质量
```bash
npm run lint
```

## 📁 项目结构

```
src/
├── components/
│   ├── HomePage.jsx      # 画廊首页
│   ├── DetailPage.jsx    # 图片详情页
│   ├── Uploader.jsx      # 单图上传组件
│   └── BatchUploader.jsx # 批量上传组件
├── utils/
│   └── cloudinary.js     # Cloudinary 工具函数
├── App.jsx               # 应用主组件
└── main.jsx              # 应用入口

public/
└── images.json           # 图片数据配置
```

## ⚙️ 配置

### Cloudinary 配置
在 `src/components/Uploader.jsx` 和 `src/components/BatchUploader.jsx` 中配置：

```javascript
const CLOUD_NAME = 'your-cloud-name'
const UPLOAD_PRESET = 'your-upload-preset'
```

### GitHub Pages 部署
1. 在 `vite.config.js` 中设置正确的 base path
2. 推送到 GitHub main 分支
3. 在仓库设置中启用 GitHub Pages

## 📚 文档

- [CLAUDE.md](./CLAUDE.md) - 项目开发指南
- [BATCH_UPLOAD_GUIDE.md](./BATCH_UPLOAD_GUIDE.md) - 批量上传详细指南
- [CLOUDINARY_DEBUG.md](./CLOUDINARY_DEBUG.md) - Cloudinary 调试指南
- [MCP_DEBUG.md](./MCP_DEBUG.md) - MCP 浏览器工具调试指南

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License