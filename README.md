# 练了嘛产品官网

「练了嘛」iOS 力量训练记录 App 的产品官网，包含产品介绍、核心功能、用户反馈与 App Store 下载入口。

## 本地运行

```bash
npm run build
npm run preview
```

预览地址：`http://127.0.0.1:4173`

## 文件说明

- `src/index.html`：预渲染后的产品官网
- `src/assets/`：样式、脚本与字体资源
- `src/exercises/`：动作示例图片
- `src/app-icon.jpg`：App Store 图标
- `scripts/build.mjs`：无依赖静态构建脚本
- `scripts/serve.mjs`：本地预览服务器

## Cloudflare Pages 部署

在 Cloudflare Pages 中连接此 GitHub 仓库，并使用以下构建设置：

- Project name：`calliste-cc`
- Production branch：`main`
- Build command：`npm run build`
- Build output directory：`dist`

自定义域名使用 `calliste.cc`。每次推送到 `main` 后，Cloudflare Pages 会自动构建并覆盖线上版本。
