#!/bin/bash

# HEZHE Blog 一键发布脚本

# 配置路径
OBSIDIAN_BLOG="/Users/mark/Projects/Obsidian/notes/notes/创作/博客"
BLOG_PROJECT="/Users/mark/Projects/hezhe"
BLOG_POSTS="$BLOG_PROJECT/src/content/posts"

echo "📝 同步博客文章..."

# 同步文件 (只复制 .md 文件)
rsync -av --include='*/' --include='*.md' --exclude='*' "$OBSIDIAN_BLOG/" "$BLOG_POSTS/"

# 检查是否有新文件
cd "$BLOG_PROJECT"
CHANGED=$(git status --porcelain)

if [ -z "$CHANGED" ]; then
    echo "✨ 没有新文章需要发布"
    exit 0
fi

echo "🚀 发布文章..."
echo "$CHANGED"

# 自动提交并推送
git add -A
git commit -m "feat: publish new article"
git push

echo "✅ 发布完成！Vercel 正在部署..."
