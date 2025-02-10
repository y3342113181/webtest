import { createApp } from 'vue'
import App from './App.vue'
import router from './router'  // 添加路由导入
import './assets/iconfont/iconfont.css'  // 添加图标字体

// 导入 Element Plus 样式
import 'element-plus/dist/index.css'
import './styles/element/element-theme.css'  // 自定义主题必须在 element-plus 样式之后导入

// Element Plus 组件按需引入
import {
    ElContainer,
    ElHeader,
    ElMain,
    ElFooter,
    ElMenu,
    ElMenuItem,
    ElButton,
    ElSelect,
    ElOption,
    ElInput,
    ElIcon,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElLoading,
    ElMessage
} from 'element-plus'

// Element Plus 图标
import { Search, ArrowDown } from '@element-plus/icons-vue'

const app = createApp(App)

// 注册 Element Plus 组件
const components = [
    ElContainer,
    ElHeader,
    ElMain,
    ElFooter,
    ElMenu,
    ElMenuItem,
    ElButton,
    ElSelect,
    ElOption,
    ElInput,
    ElIcon,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElTable,
    ElTableColumn,
    ElPagination
]

components.forEach(component => {
    app.component(component.name, component)
})

// 注册 Element Plus 图标
app.component('Search', Search)
app.component('ArrowDown', ArrowDown)

// 注册 Element Plus 指令
app.use(ElLoading)

app.use(router)  // 使用路由

app.mount('#app')
