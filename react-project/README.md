# React Admin Template

一个基于 React + Vite + Ant Design 的后台管理系统模板。

## 技术栈

- React 18
- Vite 5
- Ant Design 5
- TypeScript
- Less

## 开始使用

1. 安装依赖
bash
pnpm install

2. 启动开发服务器

bash
pnpm dev


3. 构建生产版本

bash
pnpm build

4. 运行生产版本

bash
pnpm preview

## 特性

- 🚀 基于 Vite 的快速开发体验
- 📦 开箱即用的 Ant Design 组件
- 🎨 支持主题定制
- 📱 响应式布局
- 🔐 基础的登录/注册功能
- 📝 TypeScript 类型支持

## 目录结构
src/
├── assets/        # 静态资源目录
├── pages/         # 页面组件目录
│   ├── Login/     # 登录页面
│   ├── Register/  # 注册页面
│   └── ForgetPassword/  # 忘记密码页面
├── store/         # Redux 状态管理
│   ├── index.js   # Store 配置
│   └── userSlice.js  # 用户状态切片
├── utils/         # 工具函数
│   └── formValidators.js  # 表单验证规则
├── App.jsx        # 根组件
├── App.css        # 根组件样式
├── main.jsx      # 入口文件
└── index.css     # 全局样式