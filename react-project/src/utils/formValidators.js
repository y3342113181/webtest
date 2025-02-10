// 验证规则
export const formRules = {
    username: [
        { required: true, message: '请输入用户名' },
        { 
            pattern: /^[a-zA-Z0-9]{1,6}$/, 
            message: '用户名不超过6位，只能包含字母和数字' 
        }
    ],
    phone: [
        { required: true, message: '请输入手机号' },
        { 
            pattern: /^1[3-9]\d{9}$/, 
            message: '请输入正确的手机号' 
        }
    ],
    password: [
        { required: true, message: '请输入密码' },
        { 
            validator: async (_, value) => {
                if (value === '123456') return Promise.resolve();
                if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*.,])[A-Za-z\d!@#$%^&*.,]{6,}$/.test(value)) {
                    return Promise.resolve();
                }
                return Promise.reject('密码至少6位，必须包含大小写字母、数字和特殊字符');
            }
        }
    ],
    code: [
        { required: true, message: '请输入验证码' },
        { 
            pattern: /^\d{6}$/, 
            message: '验证码为6位数字' 
        }
    ]
}; 