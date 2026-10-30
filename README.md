# CHANFER Website Deployment & Maintenance Guide

## 🌐 Live Site
- **Production**: https://www.chanferpack.com
- **Cloudflare Pages**: chanferpack-website.pages.dev
- **GitHub**: https://github.com/sarahqi520/chanferpack-website
- **Google Search Console**: Verified (KXPm_xPZ-0xiiqGw06x58OsVk0XTWxde0P445AITtYw)
- **Bing Webmaster**: Verified (0DBC9AE5F4985E083A7ABB5BB445CD5F)

## 🏗 Architecture
- **Hosting**: Cloudflare Pages (free tier, global CDN)
- **DNS**: Cloudflare (NS: meilani.ns.cloudflare.com, zahir.ns.cloudflare.com)
- **Domain registrar**: 百度云 (Baidu Cloud)
- **Source control**: GitHub (auto-deploy on push to main)
- **SSL**: Cloudflare Edge Certificate (auto-renewing)
- **Analytics**: Pending (to add Google Analytics 4)

## 📁 Project Structure
```
chanfer-website/
├── index.html              # Homepage (English)
├── about.html              # About us
├── contact.html            # Contact / RFQ form
├── robots.txt              # SEO + AI bot rules
├── sitemap.xml             # All URLs for crawlers
├── css/
│   └── style.css           # Main stylesheet (consolidated)
├── js/
│   ├── main.js             # Navigation, animations
│   └── i18n-core.js        # EN/中 toggle
├── images/                 # All website images
├── solutions/              # Product line detail pages
│   ├── index.html
│   ├── bottle-line.html
│   ├── pouch-line.html
│   └── drum-line.html
├── industries/             # Industry-specific pages
├── equipment/              # Equipment catalog
├── projects/               # Global installations
├── guides/                 # Selection guides / SEO content
├── zh/                     # Chinese version
├── es/                     # Spanish version (Latin America)
├── ar/                     # Arabic version (Middle East)
├── pt/                     # Portuguese version (Brazil, Angola)
└── fr/                     # French version (Africa, Europe)
```

## 🚀 Deployment Workflow
1. Edit files locally in `C:\Users\Sarah\WorkBuddy\Claw\chanfer-website\`
2. Stage: `git add -A`
3. Commit: `git commit -m "describe change"`
4. Push: `git push origin main`
5. Cloudflare Pages auto-detects push and deploys (1-2 min)
6. Verify at https://www.chanferpack.com

## 🔐 GitHub Token
- Used for: read/write `sarahqi520/chanferpack-website` repo only
- Expiration: 30 days from creation (renewable)
- Stored in: local git credential helper
- **Do NOT commit tokens to the repository**

## 🌍 Multi-language Plan
| Lang | Code | Path | Status | Target Market |
|------|------|------|--------|---------------|
| English | en | / | ✅ Live | Global / US / Europe |
| Chinese | zh | /zh/ | ✅ Live | China / SE Asia |
| Spanish | es | /es/ | ✅ Live | Mexico / LatAm |
| Arabic | ar | /ar/ | ✅ Live | Middle East / North Africa |
| Portuguese | pt | /pt/ | ✅ Live | Brazil / Africa |
| French | fr | /fr/ | ✅ Live | Africa / France |

## 📊 SEO/GEO Status
- ✅ Google Search Console verified
- ✅ Bing Webmaster Tools verified
- ✅ sitemap.xml submitted
- ✅ robots.txt allows GPTBot, Claude, Perplexity, Google-Extended
- ✅ Hreflang tags on all pages
- ✅ Canonical URLs
- ✅ JSON-LD: Organization + FAQPage + AboutPage
- ✅ Open Graph + Twitter cards (in progress)
- ⏳ Backlink building (LinkedIn, YouTube, industry directories)
- ⏳ Google Analytics 4 (need GA4 ID)

## 🛡 Security Checklist
- [x] HTTPS enforced
- [x] HTTP → HTTPS redirect
- [x] www → root domain redirect
- [x] Cloudflare DDoS protection
- [x] Token scopes minimized
- [ ] 2FA on GitHub account
- [ ] 2FA on Cloudflare account
- [ ] Periodic token rotation (every 30 days)

## 📞 Emergency Contacts
- Cloudflare: https://dash.cloudflare.com/
- GitHub: https://github.com/sarahqi520
- 百度云: https://console.bce.baidu.com/
- Domain: chanferpack.com


---

## 🚀 自动部署（GitHub Actions）

> 更新于 2026-10-30

Cloudflare Pages 自带的 GitHub App 集成自 2026-08-29 起不再触发构建，
现改用 **GitHub Actions + wrangler 直接上传**。

### 工作流

`.github/workflows/deploy.yml`，触发条件：

- 推送到 `main` 分支
- 手动触发（Actions → Deploy to Cloudflare Pages → Run workflow）

### 执行流程

| 步骤 | 说明 |
|---|---|
| 检出代码 | actions/checkout@v4 |
| 安装 Node | Node 20 |
| 组装部署目录 | rsync 到 `dist/`，排除 `.git`、`.github`、`README.md`、`video-script.md`、`.gitignore` |
| 部署 | `wrangler pages deploy dist --project-name=chanferpack-website --branch=main` |
| 冒烟检查 | 随机路径必须返回 **404**（防 Soft 404 回归），首页必须返回 **200**，否则任务失败 |

### 必需的仓库 Secrets

Settings → Secrets and variables → Actions：

- `CLOUDFLARE_API_TOKEN` → Cloudflare API Token（Account → Cloudflare Pages → Edit）
- `CLOUDFLARE_ACCOUNT_ID` → `31d381a721527e778df14df6c73e2bfb`

> ⚠️ 仓库为公开仓库，**绝不要把令牌写进工作流文件或提交到代码中**。

### 手动部署（应急）

```bash
export CLOUDFLARE_API_TOKEN=<token>
export CLOUDFLARE_ACCOUNT_ID=31d381a721527e778df14df6c73e2bfb
wrangler pages deploy <站点目录> --project-name=chanferpack-website --branch=main --commit-dirty=true
```

注意：直接上传会**整体替换**站点，缺失文件会被删除，必须上传完整站点目录。
