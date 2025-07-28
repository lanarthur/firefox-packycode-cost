# PackyCode Cost (Firefox Edition) - Privacy Policy

## 数据收集和使用

PackyCode Cost (Firefox Edition) 扩展程序承诺保护用户隐私，遵循 Mozilla 附加组件隐私准则，具体说明如下：

### 我们收集什么数据

**本扩展不会收集、存储或传输任何个人身份信息。**

扩展程序仅会：
- 读取 PackyCode 网站的登录 Token（仅用于 API 请求）
- 缓存 API 响应数据（用于离线显示）
- 存储用户偏好设置（如刷新频率等）

### 数据存储

所有数据均存储在用户本地设备上，使用 Firefox 原生存储 API：
- 登录 Token（存储在 Firefox 扩展存储中）
- API 使用数据缓存（临时存储，用于快速显示）
- 用户设置（本地存储）

### 数据传输

扩展程序仅向以下域名发送请求：
- `packycode.com` - 获取 API 使用数据
- `packy.te.sb` - PackyCode 相关服务
- `packy-status.te.sb` - 状态检查服务

**不会向任何第三方服务器发送数据。**

### Firefox 特定权限使用

扩展程序请求的 Firefox 权限及用途：

- **storage**: 使用 Firefox 原生存储 API 存储用户设置和缓存数据
- **cookies**: 读取 PackyCode 网站的登录状态（仅限指定域名）
- **tabs**: 检测用户访问 PackyCode 网站以自动获取登录信息
- **alarms**: 使用 Firefox 定时器 API 定期刷新数据
- **activeTab**: 与当前标签页交互以获取登录信息
- **host permissions**: 仅访问 PackyCode 相关域名，严格限制访问范围

### 数据安全

- 所有数据仅在本地处理，使用 Firefox 安全存储机制
- 不会上传到任何外部服务器
- Token 信息通过 Firefox 扩展存储加密保护
- 定期清理过期缓存数据
- 遵循 Mozilla 安全最佳实践

### 第三方服务

本扩展不使用任何第三方分析、广告或追踪服务，完全遵循 Firefox 附加组件准则。

### Mozilla 合规性

本扩展完全遵循：
- Mozilla 附加组件政策
- Firefox 扩展安全准则
- WebExtensions API 最佳实践

### 联系方式

如有隐私相关问题，请通过以下方式联系：
- GitHub Issues: https://github.com/lanarthur/firefox-packycode-cost/issues
- Email: lancelot.hga@gmail.com

### 开源透明

本扩展完全开源，源代码可在 GitHub 上查看：
https://github.com/lanarthur/firefox-packycode-cost

### 政策更新

本隐私政策可能会更新。重大变更会通过扩展程序更新说明通知用户。

---

**Firefox 版本开发者**: lanarthur  
**基于原项目**: https://github.com/94mashiro/packycode-cost  
**最后更新时间**: 2025年1月28日