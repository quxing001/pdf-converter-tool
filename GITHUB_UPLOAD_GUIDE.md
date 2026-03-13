# 📤 上传代码到 GitHub 指南

## 🚀 快速上传（3 分钟完成）

### 方法：使用上传脚本（推荐）

因为你的系统没有安装 Git，我创建了一个专门的 Node.js 脚本来自动上传代码。

---

## 📋 步骤 1：获取 GitHub Token（2 分钟）

1. **访问 GitHub Settings**
   - 打开：https://github.com/settings/tokens
   - 点击 "Generate new token" → "Generate new token (classic)"

2. **创建 Token**
   - Note: 填写 `PDF Tool`
   - Expiration: 选择 `No expiration`（永不过期）
   - 勾选权限：
     - ✅ `repo`（勾选完整的 repo 权限）
     - ✅ `workflow`（可选）
   - 点击最底部的 "Generate token"

3. **复制 Token**
   - ⚠️ 只会显示一次！立即复制保存
   - 格式类似：`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 📋 步骤 2：填写配置（30 秒）

1. **打开文件**
   - 文件位置：`upload_to_github.js`

2. **填写信息**
   在文件开头找到配置区域，替换为你的信息：

   ```javascript
   // ============ 配置区域 ============
   const GITHUB_USERNAME = '你的GitHub用户名';           // 例如：john-doe
   const GITHUB_TOKEN = '你刚才复制的Token';            // 例如：ghp_xxxxxxxxxxx
   const REPO_NAME = 'pdf-converter-tool';              // 可以不改
   const REPO_DESCRIPTION = 'PDF 转换工具 - 在线免费转换'; // 可以不改
   // =================================
   ```

3. **保存文件**

---

## 📋 步骤 3：运行上传脚本（30 秒）

在项目目录下运行：

```bash
node upload_to_github.js
```

你会看到类似输出：

```
📦 开始上传文件到 GitHub...

✓ 仓库创建成功！
🔗 仓库地址: https://github.com/你的用户名/pdf-converter-tool

📤 上传: package.json
📤 上传: next.config.js
📤 上传: app/layout.tsx
📤 上传: app/page.tsx
...
📤 上传: ACTION_PLAN.md

✅ 所有文件上传完成！

🎉 仓库地址: https://github.com/你的用户名/pdf-converter-tool

📋 下一步:
   1. 访问: https://vercel.com
   2. 使用 GitHub 登录
   3. 导入仓库: pdf-converter-tool
   4. 点击 Deploy
```

---

## ✅ 验证上传

1. **访问 GitHub 仓库**
   - 打开上面显示的仓库地址
   - 检查文件是否都上传成功

2. **检查文件列表**
   应该包含：
   - `app/` 目录
   - `package.json`
   - `next.config.js`
   - `README.md`
   - 其他配置文件

---

## 🚀 下一步：部署到 Vercel

上传成功后，继续：

### 方案 A：自动部署（推荐）

1. **访问 Vercel**
   - 打开：https://vercel.com
   - 点击 "Sign Up" 或 "Log In"
   - 选择 "Continue with GitHub"
   - 授权 Vercel 访问你的 GitHub

2. **导入项目**
   - 在 Dashboard 点击 "Add New..." → "Project"
   - 找到 `pdf-converter-tool` 仓库
   - 点击 "Import"

3. **配置部署**
   - Framework Preset: `Next.js`（自动检测）
   - Root Directory: `./`
   - 点击 "Deploy"

4. **等待部署**
   - 大约 1-2 分钟
   - 看到绿色 ✓ 表示成功
   - 点击生成的链接访问网站

### 方案 B：手动部署

如果 Vercel 没有自动检测到，可以手动配置：

1. **手动创建项目**
   - 在 Vercel Dashboard 点击 "Add New" → "Project"
   - 选择 "Continue with Blank Project"

2. **关联 GitHub**
   - 选择 "Import Git Repository"
   - 输入仓库 URL：`https://github.com/你的用户名/pdf-converter-tool`

3. **配置构建设置**
   ```
   Framework: Next.js
   Build Command: npm run build
   Output Directory: .next
   ```

4. **Deploy**
   - 点击 "Deploy" 按钮

---

## 🎯 完成后的结果

**你的网站将拥有：**
- ✅ 24/7 在线运行
- ✅ 自动 HTTPS
- ✅ 全球 CDN 加速
- ✅ 自动更新（推送代码后自动部署）
- ✅ 免费托管

**网站 URL：**
- `https://pdf-converter-tool.vercel.app`
- 或你配置的自定义域名

---

## 🔧 常见问题

### Q: Token 哪里找？
A: 访问 https://github.com/settings/tokens，点击 "Generate new token"

### Q: 脚本报错怎么办？
A:
- 检查 Token 是否正确
- 检查用户名是否正确
- 确保仓库没有同名冲突
- 查看错误信息

### Q: 上传失败可以重新运行吗？
A: 可以，脚本会跳过已存在的文件

### Q: Vercel 找不到仓库怎么办？
A:
- 确保 GitHub 仓库是公开的（Public）
- 确保已授权 Vercel 访问 GitHub
- 尝试刷新 Vercel 页面

### Q: 可以修改已上传的代码吗？
A: 可以，重新运行脚本会更新文件，或直接在 GitHub 网页上编辑

---

## 📝 注意事项

1. **Token 安全**
   - ⚠️ 不要分享你的 GitHub Token
   - ⚠️ 不要提交到公开仓库
   - ✅ 保存在本地，仅供个人使用

2. **仓库公开**
   - 为了让 Vercel 免费部署，仓库需要是 Public
   - Public 仓库的代码是公开可见的
   - 敏感信息不要放在代码中

3. **域名选择**
   - Vercel 提供免费域名
   - 可以购买自定义域名（约 ¥10-50/年）
   - 自定义域名可以随时更改

---

## 🎉 完成后

部署成功后：

1. **访问网站**
   - 点击 Vercel 提供的链接
   - 测试上传、转换、下载功能

2. **分享网站**
   - 复制网站链接
   - 分享给朋友
   - 发布到社交媒体

3. **监控数据**
   - 登录 Vercel
   - 查看访问统计
   - 查看错误日志

4. **更新代码**
   - 在 GitHub 上修改代码
   - Vercel 自动检测并重新部署
   - 1-2 分钟后网站更新

---

## 🚀 开始吧！

现在就按照上面的步骤：

1. 获取 GitHub Token（2 分钟）
2. 填写配置（30 秒）
3. 运行脚本（30 秒）
4. 部署到 Vercel（2 分钟）

**总共 5 分钟，你的网站就上线了！** 🎉
