import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Login.css';
import { setUserInfo } from '../../store/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 从 Redux 获取已注册的用户信息
    const registeredUser = useSelector(state => state.user);

    const onFinish = (values) => {
        const { username, password } = values;
        
        // 验证用户名和密码
        if (
            (username === 'admin' && password === '123456') || 
            (username === registeredUser.username && password === registeredUser.password)
        ) {
            dispatch(setUserInfo({
                username,
                password,
                isLoggedIn: true
            }));

            message.success('登录成功！');
            navigate('/');
        } else {
            message.error('用户名或密码错误！');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h3>登录</h3>
                <Form
                    name="login"
                    initialValues={{ username: '', password: '' }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名！' }]}
                    >
                        <Input placeholder="用户名" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码！' }]}
                    >
                        <Input.Password placeholder="密码" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            登录
                        </Button>
                    </Form.Item>
                    <div className="login-bottom">
                        <Button type="link" href="/forget-password">
                            忘记密码
                        </Button>
                        <div>
                            <span>没有账号？</span>
                            <Button type="link" href="/register">
                                快速注册
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;