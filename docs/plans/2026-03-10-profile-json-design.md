# Profile JSON 配置化设计文档

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:writing-plans to create implementation plan.

## 概述

将博客中硬编码的个人信息抽取到独立的 JSON 配置文件，实现一处修改全局生效。

## 目标

- 简化个人信息更新流程
- 无需编辑代码即可修改站点信息
- 支持中英双语配置

## JSON 结构

### 文件位置
`src/data/profile.json`

### 完整结构

```json
{
  "site": {
    "name": "HEZHE",
    "nameCn": "和者",
    "url": "https://hezhe.wang",
    "description": "探索代码与设计的交汇处",
    "descriptionEn": "Exploring the intersection of code and design"
  },
  "author": {
    "name": "Mark",
    "nameCn": "马克",
    "role": "Full-stack Developer",
    "roleCn": "全栈开发者",
    "avatar": "M",
    "bio": [
      "热爱技术，热爱设计，热爱生活。在这个快速变化的时代，我致力于用代码创造价值，用设计传递温度。",
      "专注于前端开发、用户体验设计以及新兴技术的探索与实践。"
    ],
    "bioEn": [
      "Passionate about technology, design, and life.",
      "Focusing on front-end development and emerging technologies."
    ],
    "skills": ["React", "TypeScript", "Node.js", "Astro", "Design"]
  },
  "hero": {
    "title": "探索",
    "titleEn": "Explore",
    "subtitle": "记录思考，探索未知，在代码与设计的交汇处寻找灵感",
    "subtitleEn": "Recording thoughts, exploring the unknown, finding inspiration at the intersection of code and design",
    "code": {
      "line1": { "prefix": "const ", "property": "developer", "value": "\"Mark\"" },
      "line2": { "prefix": "const ", "property": "focus", "value": "[\"React\", \"Design\"]" },
      "line3": { "prefix": "", "property": "", "value": "build(future)" },
      "line4": { "prefix": "", "property": "", "value": "// 持续学习中...", "isComment": true }
    }
  },
  "social": {
    "twitter": "https://x.com/你的用户名",
    "github": "https://github.com/你的用户名",
    "linkedin": "https://linkedin.com/in/你的用户名",
    "email": "mailto:你的邮箱"
  },
  "footer": {
    "links": [
      { "label": "Privacy", "url": "#" },
      { "label": "Terms", "url": "#" },
      { "label": "Contact", "url": "#" }
    ]
  }
}
```

## 涉及的页面/组件

| 文件 | 使用的数据 |
|------|------------|
| `src/layouts/MainLayout.astro` | site.*, author.name, social.* |
| `src/pages/index.astro` | hero.*, author.*, social.*, footer.* |
| `src/pages/about.astro` | author.* |
| `src/pages/articles.astro` | - (仅文章列表) |

## 实施顺序

1. 创建 `src/data/profile.json` 文件
2. 修改 `MainLayout.astro` 读取 site 和 social 数据
3. 修改 `index.astro` 读取 hero、author、social、footer 数据
4. 修改 `about.astro` 读取 author 数据
5. 测试验证

## 注意事项

- 所有字段均为可选，提供默认值fallback
- Astro 静态生成，JSON 更改后需重新 build
- 使用 `import profile from '../data/profile.json'` 导入
