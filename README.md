# EventNest - 社交活动管理小程序

一款基于 Taro 框架开发的跨端社交活动管理小程序，支持微信小程序和 H5 双端运行。

## ✨ 功能特性

- **首页展示** - 活动列表浏览、搜索过滤、分类筛选
- **活动发布** - 创建新活动、上传图片、设置时间地点
- **活动详情** - 查看活动详情、参与/取消参与
- **消息系统** - 活动通知、系统消息
- **个人中心** - 用户信息管理、参与的活动列表

## 🛠️ 技术栈

| 分类 | 技术 | 版本 |
|------|------|------|
| 框架 | Taro | 4.1.9 |
| 语言 | TypeScript | 5.1.x |
| UI框架 | React | 18.x |
| 状态管理 | Zustand | 4.5.x |
| 构建工具 | Webpack | 5.x |
| 包管理 | pnpm | - |
| 后端服务 | 微信云开发 | CloudBase |
| 样式 | SCSS | - |
| 测试 | Jest | 29.x |

## 📁 项目结构

```
eventnest/
├── cloudfunctions/          # 云函数目录
│   ├── login/               # 用户登录
│   ├── getEvents/           # 获取活动列表
│   ├── getEventDetail/      # 获取活动详情
│   ├── createEvent/         # 创建活动
│   ├── participateEvent/    # 参与活动
│   ├── getMessages/         # 获取消息
│   ├── sendMessage/         # 发送消息
│   ├── getUserInfo/         # 获取用户信息
│   └── updateUserInfo/      # 更新用户信息
├── config/                  # 配置文件
│   ├── dev.ts               # 开发环境配置
│   ├── prod.ts              # 生产环境配置
│   └── index.ts             # 主配置（含代码分割）
├── src/
│   ├── assets/              # 静态资源（图片、图标）
│   ├── components/          # 公共组件
│   │   ├── EventCard/       # 活动卡片
│   │   ├── StatCard/        # 统计卡片
│   │   ├── MessageItem/     # 消息项
│   │   ├── UserAvatar/      # 用户头像
│   │   └── ImageUploader/   # 图片上传
│   ├── pages/               # 页面
│   │   ├── home/            # 首页
│   │   ├── message/         # 消息页
│   │   ├── publish/         # 发布页
│   │   ├── mine/            # 个人中心
│   │   └── detail/          # 详情页
│   ├── services/            # 服务层
│   │   ├── cloud.ts         # 云函数调用封装
│   │   ├── auth.ts          # 认证服务
│   │   ├── event.ts         # 活动服务
│   │   └── message.ts       # 消息服务
│   ├── store/               # 状态管理
│   ├── data/                # Mock 数据（H5预览）
│   ├── styles/              # 全局样式
│   ├── types/               # TypeScript 类型定义
│   ├── utils/               # 工具函数
│   ├── app.tsx              # 应用入口
│   └── app.config.ts        # 应用配置
├── start.bat                # Windows 启动程序（双击运行）
├── start.ps1                # PowerShell 启动脚本
├── package.json
├── tsconfig.json
└── jest.config.js
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0
- 微信开发者工具（微信小程序开发）

### 安装依赖

```bash
pnpm install
```

### 启动开发

#### 方式一：使用启动程序（推荐）

双击 `start.bat` 文件，按照菜单提示选择启动模式。

#### 方式二：使用命令行

```bash
# H5 开发模式
pnpm run dev:h5

# 微信小程序开发模式
pnpm run dev:weapp
```

#### 方式三：使用 PowerShell 脚本

```powershell
# H5 开发模式（默认）
.\start.ps1

# 指定模式
.\start.ps1 -Mode weapp
.\start.ps1 -Mode build:h5
.\start.ps1 -Mode test
```

### 启动模式说明

| 模式 | 命令 | 说明 |
|------|------|------|
| H5 开发 | `pnpm run dev:h5` | 启动 H5 开发服务器，访问 http://localhost:10086 |
| 微信小程序开发 | `pnpm run dev:weapp` | 启动小程序开发服务器，用微信开发者工具打开 dist 目录 |
| H5 生产构建 | `pnpm run build:h5` | 构建 H5 生产版本，产物在 dist 目录 |
| 微信小程序构建 | `pnpm run build:weapp` | 构建小程序生产版本，产物在 dist 目录 |
| 单元测试 | `pnpm test` | 运行 Jest 单元测试 |

## ☁️ 云开发配置

### 数据库集合

| 集合名 | 用途 | 核心字段 |
|--------|------|----------|
| users | 用户信息 | _openid, nickname, avatar, createTime |
| events | 活动信息 | title, description, images, location, startTime, endTime |
| messages | 消息 | userId, type, content, read |

### 云函数列表

| 函数名 | 用途 | 入参 | 返回 |
|--------|------|------|------|
| login | 用户登录 | 无 | { openid, user } |
| getEvents | 获取活动列表 | { keyword?, category? } | { events[] } |
| getEventDetail | 获取活动详情 | { eventId } | { event } |
| createEvent | 创建活动 | { title, description, images, location, startTime, endTime } | { event } |
| participateEvent | 参与/取消活动 | { eventId } | { success } |
| getMessages | 获取消息列表 | 无 | { messages[] } |
| sendMessage | 发送消息 | { userId, type, content } | { success } |
| getUserInfo | 获取用户信息 | 无 | { user } |
| updateUserInfo | 更新用户信息 | { nickname, avatar } | { user } |

### 部署说明

1. 在微信开发者工具中导入项目
2. 右键云函数目录，选择「上传并部署：云端安装依赖」
3. 在云开发控制台创建数据库集合
4. 配置数据库权限规则

## 🧪 测试

```bash
# 运行所有测试
pnpm test

# 运行指定测试文件
pnpm test -- filterEvents.test.ts
```

## 📊 性能优化

项目已实施以下性能优化：

- **代码分割** - Webpack SplitChunks 拆分 vendors、taro、react、common 模块
- **组件缓存** - React.memo 缓存公共组件
- **回调优化** - useCallback 优化回调函数引用
- **图片懒加载** - 所有图片组件启用 lazyLoad
- **预打包** - Taro 预打包常用依赖
- **Tree Shaking** - 启用 usedExports 和 providedExports

## 📝 代码规范

- TypeScript 严格模式
- ESLint + Prettier 代码检查
- SCSS 模块化样式

## 📄 License

MIT