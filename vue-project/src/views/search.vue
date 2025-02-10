<template>
    <div class="common-layout">
        <el-container>
            <el-header style="background-color: #ffffff;width: 100%;">
                <div class="header-content">
                    <!-- 导航菜单 -->
                    <div class="nav-menu">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
                            <div class="menu-left">
                                <el-menu-item index="0">
                                    <div style="display: flex; align-items: center; height: 100%;">
                                        <i class="iconfont icon-toubide" style="font-size: 24px; color: #409EFF;"></i>
                                        <div class="menu-divider">|</div>
                                        <i class="iconfont icon-i_journal_normal"
                                            style="font-size: 24px; color: #67C23A;"></i>
                                    </div>
                                </el-menu-item>
                            </div>
                            <div class="menu-right">
                                <el-menu-item index="1">期刊详情查询</el-menu-item>
                                <div class="menu-divider">|</div>
                                <el-menu-item index="2">AI智能选刊</el-menu-item>
                                <div class="menu-divider">|</div>
                                <el-menu-item index="3">期刊解析与推荐</el-menu-item>
                                <div class="menu-divider">|</div>
                                <el-menu-item index="4">iThenticate查重</el-menu-item>
                                <div class="menu-divider">|</div>
                                <el-menu-item index="6">关于我们</el-menu-item>
                                <el-button type="primary" style="border-radius: 0%;">登录/注册</el-button>
                            </div>
                        </el-menu>
                    </div>
                    <!-- 搜索框部分 -->
                    <div class="search-box">
                        <div class="search-input-group">
                            <el-select v-model="value" class="search-select" placeholder="请选择">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                            <el-input v-model="input" class="search-input" :placeholder="getPlaceholder(value)"
                                @keyup="handleKeyup" />
                            <el-button type="primary" class="search-button" @click="handleSearch">
                                <el-icon>
                                    <Search />
                                </el-icon>
                            </el-button>
                        </div>
                        <div class="filter-group">
                            <div class="filter-item">
                                <span>影响因子</span>
                                <div class="range-input">
                                    <el-input v-model="ifStart" class="range-input-field" @keyup.enter="handleSearch" />
                                    <span class="range-separator">-</span>
                                    <el-input v-model="ifEnd" class="range-input-field" @keyup.enter="handleSearch" />
                                </div>
                            </div>
                            <div class="filter-item">
                                <span>JCR分区</span>
                                <el-dropdown trigger="click" @command="handleJcrCommand">
                                    <span class="el-dropdown-link">
                                        {{ jcrZone || '不限' }}
                                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item command="">不限</el-dropdown-item>
                                            <el-dropdown-item command="1">Q1</el-dropdown-item>
                                            <el-dropdown-item command="2">Q2</el-dropdown-item>
                                            <el-dropdown-item command="3">Q3</el-dropdown-item>
                                            <el-dropdown-item command="4">Q4</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                            <div class="filter-item">
                                <span>分区</span>
                                <el-dropdown trigger="click" @command="handleChinaCommand">
                                    <span class="el-dropdown-link">
                                        {{ chinaZone ? `${chinaZone}区` : '不限' }}
                                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item command="">不限</el-dropdown-item>
                                            <el-dropdown-item command="1">1区</el-dropdown-item>
                                            <el-dropdown-item command="2">2区</el-dropdown-item>
                                            <el-dropdown-item command="3">3区</el-dropdown-item>
                                            <el-dropdown-item command="4">4区</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                            <div class="filter-item">
                                <span>综述占比</span>
                                <el-dropdown trigger="click" @command="handleReviewCommand">
                                    <span class="el-dropdown-link">
                                        {{ getReviewRateText(reviewRate) }}
                                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item command="">不限</el-dropdown-item>
                                            <el-dropdown-item command="0-5">0~5%</el-dropdown-item>
                                            <el-dropdown-item command="5-10">5%~10%</el-dropdown-item>
                                            <el-dropdown-item command="10-20">10%~20%</el-dropdown-item>
                                            <el-dropdown-item command="20-30">20%~30%</el-dropdown-item>
                                            <el-dropdown-item command="30-50">30%~50%</el-dropdown-item>
                                            <el-dropdown-item command="50-100">50%以上</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </el-header>
            <el-main v-loading="loading">
                <el-table :data="tableData" style="width: 100%" border @sort-change="handleSortChange">
                    <el-table-column prop="name" label="期刊名称" min-width="180">
                        <template #default="{ row }">
                            <div style="white-space: pre-line;">{{ row.name }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="database" label="数据库" min-width="150" sortable />
                    <el-table-column prop="impactFactor" label="影响因子" width="100" align="center" sortable />
                    <el-table-column prop="citationIndex" label="引文指标" width="100" align="center" sortable />
                    <el-table-column prop="jcrZone" label="JCR分区" width="120" align="center" sortable />
                    <el-table-column prop="chinaZone" label="国内分区" width="100" align="center" sortable />
                    <el-table-column prop="yearPapers" label="年发文量" width="100" align="center" sortable />
                    <el-table-column prop="citationRate" label="综述占比" width="100" align="center" sortable />
                    <el-table-column prop="openRate" label="是否开源/开源占比" width="100" align="center" sortable />
                    <el-table-column prop="isChina" label="是否国产" width="100" align="center" sortable />
                </el-table>

                <!-- 修改分页组件 -->
                <div class="pagination-container">
                    <el-pagination :current-page="searchParams.pageNum" :total="searchParams.total"
                        :page-size="searchParams.pageSize" layout="prev, pager, next, jumper" :jump-text="'第%page%页'"
                        @update:current-page="handleCurrentChange" />
                </div>
            </el-main>
            <el-footer class="footer">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-logo-group">
                            <i class="iconfont icon-toubide" style="font-size: 24px; color: #409EFF;"></i>
                            <div class="menu-divider">|</div>
                            <i class="iconfont icon-i_journal_normal" style="font-size: 24px; color: #67C23A;"></i>
                        </div>
                        <div class="footer-links">
                            <a href="#">首页</a>
                            <a href="#">关于我们</a>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h3>相关服务</h3>
                        <a href="#">论文服务</a>
                        <a href="#">查重服务</a>
                    </div>
                    <div class="footer-section">
                        <h3>战略合作伙伴</h3>
                        <a href="#">投必得学术公众号</a>
                        <a href="#">投必得学术知乎账号</a>
                        <a href="#">智慧科研公众号</a>
                    </div>
                    <div class="footer-section">
                        <h3>联系我们</h3>
                        <a href="#">iJournal平台客服</a>
                    </div>
                </div>
                <div class="footer-bottom">
                    <span>© 2019 Topedit All Rights Reserved</span>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios' // 确保已安装 axios
import { ElMessage } from 'element-plus'

const activeIndex = ref('')
const input = ref('')
const value = ref('期刊名称')
const tableData = ref([])
const loading = ref(false)
const jcrZone = ref('')
const chinaZone = ref('')
const reviewRate = ref('')
const ifStart = ref('')
const ifEnd = ref('')

// 搜索参数
const searchParams = ref({
    pageNum: 1,
    pageSize: 10,
    total: 0,
    keywordType: 'title',
    keyword: '',
    ifStart_2019: '',
    ifEnd_2019: '',
    ifStart: '',
    ifEnd: '',
    jcr: '',
    sub: '',
    selfCitingRate: 'all',
    compatriotRate: 'all',
    isDomestic: '',
    totalReviewRatio: 'all',
    categoryId: '1e78b26454e2878930f44c6a571be497',
    recommend: 0
})

const options = [
    {
        value: 'journalTitle',
        label: '期刊名称',
    },
    {
        value: 'issn',
        label: 'ISSN',
    },
    {
        value: 'abbrJournal',
        label: '简称',
    },
    {
        value: 'subjectDcac',
        label: '学科分类',
    },
]

// 表格筛选方法
const filterHandler = (value, row, column) => {
    const property = column.property
    return row[property] === value
}

// 修改综述占比的选项值
const reviewRateMap = {
    '': '不限',
    '0-5': '0~5%',
    '5-10': '5%~10%',
    '10-20': '10%~20%',
    '20-30': '20%~30%',
    '30-50': '30%~50%',
    '50-100': '50%以上'
}

// 获取期刊数据
const fetchJournals = async () => {
    try {
        loading.value = true

        // 搜索关键词处理
        searchParams.value.keyword = input.value
        searchParams.value.keywordType = value.value === '期刊名称' ? 'title' : value.value.toLowerCase()

        // 1. 影响因子处理
        if (ifStart.value || ifEnd.value) {
            searchParams.value.ifStart = ifStart.value || ''
            searchParams.value.ifEnd = ifEnd.value || ''
        } else {
            searchParams.value.ifStart = ''
            searchParams.value.ifEnd = ''
        }

        // 2. JCR分区处理
        searchParams.value.jcr = jcrZone.value ? jcrZone.value.replace('Q', '') : ''  // 使用 jcr 参数

        // 3. 国内分区处理
        searchParams.value.sub = chinaZone.value || ''

        // 4. 综述占比处理
        if (reviewRate.value) {
            const [start, end] = reviewRate.value.split('-')
            searchParams.value.trrl = start  // 使用起始值
            searchParams.value.trrr = end    // 使用结束值
        } else {
            searchParams.value.trrl = ''
            searchParams.value.trrr = ''
        }

        const response = await axios.get('https://test-ijournal-service.topeditsci.com/api/v1/journal/search', {
            params: searchParams.value
        })

        if (response.data.code === 0) {
            const journalList = response.data.data_original.data
            tableData.value = journalList.map(item => ({
                name: item.journalTitle + (item.abbrJournal ? `\n${item.abbrJournal}` : ''),
                database: item.journalDb || '-',
                impactFactor: item.impactFactor ? Number(item.impactFactor).toFixed(3) : '-',
                citationIndex: item.quote_factor ? Number(item.quote_factor).toFixed(3) : '-',
                jcrZone: item.jcrZone ? `Q${item.jcrZone}` : '-',  // 显示时添加 Q 前缀
                chinaZone: item.subZone ? `${item.subZone}区` : '-',
                yearPapers: item.annualPublication || '-',
                citationRate: item.totalReviewRatio ? `${Number(item.totalReviewRatio).toFixed(1)}%` : '-',  // 显示百分比
                openRate: item.open_ratio ? `${(Number(item.open_ratio) * 100).toFixed(1)}%` : '-',
                isChina: item.isDomestic ? '是' : '否'
            }))

            searchParams.value.total = response.data.data_original.total
        }
    } catch (error) {
        console.error('获取期刊数据失败:', error)
    } finally {
        loading.value = false
    }
}

// 修改搜索处理函数
const handleSearch = () => {
    searchParams.value.pageNum = 1  // 重置页码

    // 有搜索内容时的处理
    searchParams.value.keyword = input.value.trim()
    searchParams.value.keywordType = value.value

    // 不清空其他筛选条件，保持当前的筛选状态
    fetchJournals()
}

// 修改回车搜索处理
const handleKeyup = (e) => {
    if (e.key === 'Enter') {
        handleSearch()
    }
}

// 修改排序处理函数
const handleSortChange = ({ prop, order }) => {
    // 字段映射
    const sortFieldMap = {
        'name': 'journalTitle',
        'database': 'journalDb',
        'impactFactor': 'impactFactor',
        'citationIndex': 'quote_factor',
        'jcrZone': 'jcrZone',
        'chinaZone': 'subZone',
        'yearPapers': 'annualPublication',
        'citationRate': 'selfCites',
        'openRate': 'open_ratio',
        'isChina': 'isDomestic'
    }

    searchParams.value.order = sortFieldMap[prop] || prop  // 使用映射后的字段名
    searchParams.value.orderType = order === 'ascending' ? 'asc' : order === 'descending' ? 'desc' : ''
    searchParams.value.pageNum = 1  // 重置页码
    fetchJournals()
}

// 添加分页处理函数
const handleSizeChange = (val) => {
    searchParams.value.pageSize = val
    searchParams.value.pageNum = 1  // 切换每页条数时重置为第一页
    fetchJournals()
}

const handleCurrentChange = (val) => {
    searchParams.value.pageNum = val
    fetchJournals()
}

// 修改国内分区的处理逻辑
const handleChinaCommand = (command) => {
    chinaZone.value = command
    searchParams.value.pageNum = 1  // 重置页码
    searchParams.value.sub = command  // 直接设置分区值
    fetchJournals()  // 重新获取数据
}

// 修改 JCR 分区的处理逻辑
const handleJcrCommand = (command) => {
    jcrZone.value = command ? `Q${command}` : ''  // 显示值带 Q 前缀
    searchParams.value.pageNum = 1
    searchParams.value.jcr = command  // 使用 jcr 参数
    fetchJournals()
}

// 修改综述占比的处理逻辑
const handleReviewCommand = (command) => {
    reviewRate.value = command
    searchParams.value.pageNum = 1
    if (command) {
        const [start, end] = command.split('-')
        searchParams.value.trrl = start  // 使用起始值
        searchParams.value.trrr = end    // 使用结束值
    } else {
        searchParams.value.trrl = ''
        searchParams.value.trrr = ''
    }
    fetchJournals()
}

// 修改获取显示文本的函数
const getReviewRateText = (value) => {
    return reviewRateMap[value] || '不限'
}

// 添加占位符处理函数
const getPlaceholder = (type) => {
    switch (type) {
        case 'journalTitle':
            return '请输入期刊名称'
        case 'issn':
            return '请输入ISSN'
        case 'abbrJournal':
            return '请输入期刊简称'
        case 'subjectDcac':
            return '请输入学科分类'
        default:
            return '请输入搜索内容'
    }
}

// 页面加载时获取数据
onMounted(() => {
    fetchJournals()
})
</script>

<style scoped>
.header-content {
    display: flex;
    flex-direction: column;
    width: 1200px;
    margin: 0 auto;
    padding: 0;
}

.nav-menu {
    width: 100%;
}

.search-box {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 20px auto;
}

.search-input-group {
    display: flex;
    align-items: stretch;
    width: fit-content;
    border: 1px solid var(--el-color-primary);
    background-color: #fff;
    /* 添加白色背景 */
}

.search-select {
    width: 120px;
    /* 调整宽度 */
}

/* 调整下拉框的样式 */
.search-select :deep(.el-input__wrapper) {
    box-shadow: none !important;
    border-right: 1px solid var(--el-color-primary);
    border-radius: 0;
    height: 40px;
    /* 调整高度 */
    padding: 0 8px;
    background-color: #fff;
}

/* 调整下拉框的内容样式 */
.search-select :deep(.el-input__inner) {
    height: 46px;
    line-height: 46px;
}

/* 移除下拉框的箭头背景和边框 */
.search-select :deep(.el-input__suffix) {
    background-color: transparent;
    border: none;
    height: 46px;
    line-height: 46px;
}

/* 移除下拉框的箭头 */
:deep(.el-popper__arrow) {
    display: none;
}

/* 移除下拉框的圆角 */
:deep(.el-select-dropdown) {
    border-radius: 0;
}

.search-input {
    width: 600px;
    /* 调整宽度 */
}

.search-input :deep(.el-input__wrapper) {
    box-shadow: none !important;
    border-radius: 0;
    height: 40px;
    /* 调整高度 */
    padding: 0 12px;
    background-color: #fff;
}

.search-button {
    width: 50px;
    height: 46px !important;
    /* 调整高度 */
    border-radius: 0;
    margin: 0;
    padding: 0;
    border: none;
}

.search-button :deep(.el-icon) {
    font-size: 20px;
}

/* 移除所有组件的默认边框和阴影 */
:deep(.el-input__wrapper),
:deep(.el-button) {
    box-shadow: none !important;
}

.el-header {
    height: auto !important;
    padding: 0;
    width: 100%;
    border-bottom: 1px solid #ebeef5;
}

.el-container {
    width: 100%;
    min-width: 1200px;
    margin: 0;
    padding: 0;
    background-color: #f6f6f8;
}

.common-layout {
    width: 100%;
    min-width: 1200px;
    background-color: #fff;
}

.el-main {
    padding: 20px 0;
    width: 1200px;
    /* 固定宽度 */
    margin: 0 auto;
    /* 居中对齐 */
}

.el-table {
    width: 1200px !important;
    /* 强制表格宽度 */
    margin-top: 20px;
    --el-table-border-color: #ebeef5;
    --el-table-header-bg-color: #f5f7fa;
}

.el-table :deep(th) {
    background-color: var(--el-table-header-bg-color);
    color: #606266;
    font-weight: 500;
    border-bottom: 1px solid var(--el-table-border-color);
    padding: 12px 0;
}

.el-table :deep(td) {
    color: #606266;
    padding: 12px 0;
}

.el-table :deep(.cell) {
    padding: 0 12px;
}

/* 调整表格行高 */
.el-table :deep(.el-table__row) {
    height: 50px;
}

/* 移除表格外边框 */
.el-table :deep(.el-table__inner-wrapper::before) {
    display: none;
}

.menu-divider {
    color: #dcdfe6;
    display: flex;
    align-items: center;
    padding: 0 5px;
}

.el-menu {
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.menu-left {
    display: flex;
    align-items: center;
}

.menu-right {
    display: flex;
    align-items: center;
}

.el-menu-item {
    padding: 0 10px;
}

.el-tabs__item.is-active {
    background-color: transparent !important;
}

.el-tabs__active-bar {
    display: none !important;
}

.iconfont {
    color: inherit;
}

/* 移除之前添加的自定义排序图标样式 */
.el-table :deep(.sort-caret) {
    display: block;
    /* 恢复默认的排序图标 */
}

/* 移除其他自定义排序相关样式 */
.el-table :deep(th.el-table__cell.is-sortable .cell::after) {
    display: none;
}

/* 调整表头样式 */
.el-table :deep(th.el-table__cell) {
    background-color: #f5f7fa;
    color: #606266;
    font-weight: 500;
    padding: 12px 0;
}

/* 移除不需要的样式 */
.custom-header,
.custom-header i {
    display: none;
}

/* 调整分页样式 */
.pagination-container {
    display: flex;
    justify-content: center;
    /* 改为居中对齐 */
    margin-top: 20px;
}

/* 调整分页组件样式 */
.el-pagination {
    padding: 0;
    margin: 0;
}

/* 修改跳转文字样式 */
.el-pagination :deep(.el-pagination__jump) {
    margin-left: 12px;
}

/* 修改 Go to 文字 */
.el-pagination :deep(.el-pagination__jump) .el-pagination__goto {
    display: none;
    /* 隐藏原有的 Go to 文字 */
}

/* 添加新的文字 */
.el-pagination :deep(.el-pagination__jump)::before {
    content: '第';
    margin-right: 4px;
}

.el-pagination :deep(.el-pagination__jump)::after {
    content: '页';
    margin-left: 4px;
}

.filter-group {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    padding: 0;
}

.filter-item {
    display: flex;
    align-items: center;
    gap: 30px;
}

.filter-select {
    width: 100px;
}

.filter-select :deep(.el-input__wrapper) {
    box-shadow: none !important;
    border: 1px solid #dcdfe6;
    border-radius: 15px;
    /* 增加圆角 */
    padding: 0 12px;
}

.range-input {
    display: flex;
    align-items: center;
    gap: 4px;
}

.range-input-field {
    width: 50px;
}

.range-input-field :deep(.el-input__wrapper) {
    box-shadow: none !important;
    border: 1px solid #dcdfe6;
    border-radius: 15px;
    /* 增加圆角 */
    padding: 0 12px;
}

.range-separator {
    color: #909399;
}

/* 下拉菜单的样式 */
:deep(.el-select-dropdown) {
    border-radius: 8px;
    /* 下拉菜单也使用圆角 */
}

:deep(.el-select-dropdown__item) {
    padding: 0 12px;
}

:deep(.el-select-dropdown__item.selected) {
    color: var(--el-color-primary);
    font-weight: bold;
}

.el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 12px;
    color: #606266;
}

.el-dropdown-link:hover {
    color: var(--el-color-primary);
}

/* 添加下拉图标的样式 */
.el-dropdown-link .el-icon {
    font-size: 12px;
    margin-left: 4px;
}

:deep(.el-dropdown-menu) {
    border-radius: 8px;
    margin-top: 8px;
    /* 增加一点下拉菜单的间距 */
}

:deep(.el-dropdown-menu__item) {
    padding: 8px 16px;
    /* 调整下拉菜单项的内边距 */
}

:deep(.el-dropdown-menu__item:hover) {
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);
}

/* 页脚样式 */
.footer {
    background-color: #2d3a4b;
    padding: 40px 0 20px;
    color: #fff;
    height: auto !important;
}

.footer-content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding-bottom: 30px;
}

.footer-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.footer-section h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
    color: #fff;
}

.footer-section a {
    color: #909399;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s;
}

.footer-section a:hover {
    color: #fff;
}

.footer-bottom {
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #909399;
    font-size: 14px;
}

.footer-logo {
    height: 30px;
}

.footer-logo-group {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
}

.footer-links {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.menu-divider {
    color: #909399;
    margin: 0 8px;
}
</style>