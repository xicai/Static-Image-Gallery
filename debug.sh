#!/bin/bash

# 静态图片画廊项目调试脚本
# 使用方式: ./debug.sh [命令]

echo "🖼️  静态图片画廊调试助手"
echo "=========================="

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

case "$1" in
    "dev")
        echo "🚀 启动开发服务器..."
        npm run dev
        ;;
    "build")
        echo "📦 构建项目..."
        npm run build
        ;;
    "preview")
        echo "👀 预览构建结果..."
        npm run preview
        ;;
    "lint")
        echo "🔍 检查代码质量..."
        npm run lint
        ;;
    "deploy")
        echo "📤 提交并推送代码..."
        git add .
        git commit -m "Update: $(date)"
        git push
        ;;
    "status")
        echo "📊 项目状态..."
        echo ""
        echo "📁 最近的提交:"
        git log --oneline -5
        echo ""
        echo "🌐 GitHub Pages URL:"
        echo "   https://xicai.github.io/Static-Image-Gallery/#/"
        echo ""
        echo "📦 依赖状态:"
        npm list --depth=0
        ;;
    "help"|"-h"|"--help"|*)
        echo ""
        echo "可用命令:"
        echo "  dev     - 启动开发服务器"
        echo "  build   - 构建项目"
        echo "  preview - 预览构建结果"
        echo "  lint    - 检查代码质量"
        echo "  deploy  - 提交并推送代码"
        echo "  status  - 显示项目状态"
        echo "  help    - 显示此帮助信息"
        echo ""
        echo "MCP 浏览器工具使用提示:"
        echo "  1. 重启 Claude Code 以加载 MCP 配置"
        echo "  2. 你可以要求 Claude:"
        echo "     - 打开浏览器访问项目"
        echo "     - 截取屏幕检查样式"
        echo "     - 测试响应式布局"
        echo "     - 调试路由和图片加载"
        ;;
esac