import React, { useState } from "react";
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Register.css';
import { formRules } from '../../utils/formValidators';
import { setUserInfo } from '../../store/userSlice';

const Register = () => {
    const [form] = Form.useForm();
    const [countdown, setCountdown] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = (values) => {
        // 验证默认值和用户名
        if (!values.username) {
            message.error('请输入用户名！');
            return;
        }

        if (
            values.phone === '18881323634' && 
            values.code === '666555'
        ) {
            // 验证通过，存储用户信息
            dispatch(setUserInfo({
                username: values.username,
                password: values.password,
                phone: values.phone
            }));
            message.success('注册成功！');
            navigate('/login');
        } else {
            message.error('验证信息有误！');
        }
    };

    const handleSendCode = async () => {
        try {
            const { phone } = await form.validateFields(['phone']);
            setLoading(true);
            
            // 验证默认手机号
            if (phone === '18881323634') {
                message.success('验证码已发送');
                setCountdown(30);
                const timer = setInterval(() => {
                    setCountdown(time => {
                        if (time <= 1) {
                            clearInterval(timer);
                            return 0;
                        }
                        return time - 1;
                    });
                }, 1000);
            } else {
                message.error('手机号未注册');
            }
        } catch (error) {
            message.error('请输入正确的手机号');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h3>用户注册</h3>
                <Form
                    form={form}
                    name="register"
                    initialValues={{ username: '', password: '' }}
                    onFinish={onFinish}
                >
                    <Form.Item name="username" rules={formRules.username}>
                        <Input placeholder="用户名" />
                    </Form.Item>

                    <Form.Item name="phone" rules={formRules.phone}>
                        <Input placeholder="手机号" />
                    </Form.Item>

                    <Form.Item name="code" rules={formRules.code}>
                        <div className="code-input-group">
                            <Input placeholder="验证码" />
                            <Button 
                                type="primary"
                                loading={loading}
                                disabled={countdown > 0}
                                onClick={handleSendCode}
                            >
                                {countdown > 0 ? `${countdown}s后重试` : '获取验证码'}
                            </Button>
                        </div>
                    </Form.Item>

                    <Form.Item name="password" rules={formRules.password}>
                        <Input.Password placeholder="密码" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            立即注册
                        </Button>
                    </Form.Item>

                    <div className="register-bottom">
                        <Button type="link" href="/forget-password">
                            忘记密码
                        </Button>
                        <div>
                            <span>已有账号？</span>
                            <Button type="link" href="/login">
                                马上登录
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;
