# Subjectivity Interactive Essay

纯静态、无第三方依赖的交互网页。

页面默认使用英文，顶部提供 `English / 中` 语言切换。英文是原生主文案，中文版本通过 `src/app.js` 中的双语映射切换。

## 本地运行

```bash
npm run build
npm run preview
```

预览地址：`http://127.0.0.1:4173`

开发时可运行：

```bash
npm run dev
```

开发地址：`http://127.0.0.1:5173`

## 添加 Notion 链接

在 `src/app.js` 顶部的 `notionLinks` 对象中，将对应主题的空字符串替换成最终 Notion URL。未配置 URL 时，点击页面中的跳转箭头会显示占位反馈。

## 文件说明

- `src/index.html`：页面信息结构与文字内容
- `src/styles.css`：纯黑白视觉、布局和交互状态
- `src/app.js`：Notion 占位跳转、滚动进度、图卡轻微视差和入场效果
- `src/assets/`：头部两张黑白概念图
- `scripts/build.mjs`：无依赖静态构建脚本
- `scripts/serve.mjs`：本地预览服务器

## Cloudflare Pages 部署

在 Cloudflare Pages 中连接此 GitHub 仓库，并使用以下构建设置：

- Project name：`calliste-cc`
- Production branch：`main`
- Build command：`npm run build`
- Build output directory：`dist`

自定义域名使用 `calliste.cc`。每次推送到 `main` 后，Cloudflare Pages 会自动构建并覆盖线上版本。
