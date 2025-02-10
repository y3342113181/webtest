import { createSlice } from '@reduxjs/toolkit';

// 初始状态：从 localStorage 获取，如果没有则使用默认值
const initialState = JSON.parse(localStorage.getItem('userInfo')) || {
    username: '',
    password: '',
    phone: '',
    isLoggedIn: false
};

// 创建 Redux slice
const userSlice = createSlice({
    name: 'user',  // slice 的名称
    initialState,  // 初始状态
    reducers: {
        // 设置用户信息的 action
        setUserInfo: (state, action) => {
            // 直接使用扩展运算符合并状态
            Object.assign(state, {
                ...action.payload,
                isLoggedIn: true
            });
            // 保存完整状态到 localStorage
            localStorage.setItem('userInfo', JSON.stringify({
                ...action.payload,
                isLoggedIn: true
            }));
        },
        // 清除用户信息的 action
        clearUserInfo: (state) => {
            Object.assign(state, {
                username: '',
                password: '',
                phone: '',
                isLoggedIn: false
            });
            localStorage.removeItem('userInfo');
        }
    }
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer; 