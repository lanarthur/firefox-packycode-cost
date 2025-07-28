# Firefox 插件上架清单

## 📋 上架前准备清单

### ✅ 必需材料

- [x] **插件包**: `firefox-mv2-prod.zip` (已生成)
- [x] **应用描述**: `FIREFOX_STORE_DESCRIPTION.md`
- [x] **隐私政策**: `PRIVACY_POLICY.md`
- [x] **图标**: 16px, 32px, 48px, 64px, 128px (已包含)
- [ ] **截图**: 至少 1 张，推荐 3-5 张
- [x] **源代码**: GitHub 仓库链接

### 📊 插件信息

**名称**: PackyCode Cost (Firefox Edition)  
**版本**: 1.2.0  
**分类**: Developer Tools  
**许可证**: MIT  
**开发者**: lanarthur  
**主页**: https://github.com/lanarthur/firefox-packycode-cost  
**原始项目**: https://github.com/94mashiro/packycode-cost  

### 🖼️ 截图要求

Firefox 附加组件商店截图要求：
- 尺寸: 1280x800 像素 (推荐)
- 格式: PNG 或 JPG
- 数量: 1-10 张
- 内容: 展示插件的主要功能界面

建议截图内容：
1. **登录状态检测** - 显示未登录提示界面
2. **额度显示界面** - 显示日/月预算使用情况的主界面
3. **数据刷新功能** - 显示刷新按钮和加载状态
4. **Firefox 集成** - 显示在 Firefox 中的集成效果
5. **徽章显示** - 浏览器图标显示使用百分比

### 🔒 权限说明

为 Firefox 附加组件审核准备的权限说明：

- **storage**: 使用 Firefox 原生存储 API 保存用户设置和API数据缓存
- **cookies**: 读取 PackyCode 网站的登录 token，仅限指定域名
- **tabs**: 检测用户访问 PackyCode 网站以自动获取登录状态
- **alarms**: 使用 Firefox 定时器 API 定期自动刷新使用数据
- **activeTab**: 与当前标签页交互以获取登录信息
- **host permissions**: 仅访问 PackyCode 相关域名 (packycode.com, packy.te.sb, packy-status.te.sb)

### 🎯 Firefox 特色说明

向审核员强调的 Firefox 适配特性：
- 完全兼容 Firefox Manifest V2 规范
- 使用 Firefox 原生 API (browser.* 命名空间)
- 针对 Firefox 扩展生态优化
- 支持 Firefox 开发者工具调试
- 遵循 Mozilla 附加组件最佳实践

### 📝 上架流程

1. **访问 Mozilla 开发者中心**
   - 网址: https://addons.mozilla.org/developers/
   - 使用 Firefox 账号登录

2. **提交插件**
   - 上传 `firefox-mv2-prod.zip` 文件
   - 填写插件信息和描述（使用准备好的材料）
   - 上传截图和图标
   - 标明这是基于开源项目的 Firefox 适配版本

3. **审核过程**
   - 自动审核 (通常几分钟到几小时)
   - 人工审核 (如果需要，1-3 个工作日)
   - Mozilla 可能会要求提供源代码解释

4. **发布后维护**
   - 监控用户反馈和评分
   - 及时修复 Firefox 特定问题
   - 跟进原项目更新并适配

### ⚠️ Firefox 特别注意事项

- **致谢原作者**: 在所有材料中明确致谢原作者 Mashiro
- **避免混淆**: 使用 "Firefox Edition" 后缀区分版本
- **开源透明**: 强调完全开源，便于 Mozilla 审核
- **API 兼容性**: 确保使用的都是 Firefox 支持的 API
- **权限最小化**: 只请求必要的权限，避免过度权限

### 🔄 与原项目的关系

- 基于 Mashiro 的开源项目进行 Firefox 适配
- 保持功能一致性，专注于 Firefox 兼容性
- 独立维护 Firefox 版本的 bug 修复和更新
- 适当时向原项目贡献 Firefox 相关改进

---

**下一步**: 创建插件功能截图，突出 Firefox 适配特性，然后提交到 Mozilla 附加组件商店！