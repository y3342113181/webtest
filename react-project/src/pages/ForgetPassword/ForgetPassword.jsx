import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './ForgetPassword.css';
import { formRules } from '../../utils/formValidators';
import { setUserInfo } from '../../store/userSlice';

const ForgetPassword = () => {
    const [form] = Form.useForm();
    const [countdown, setCountdown] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            // 验证默认值
            if (
                values.phone === '18881323634' && 
                values.code === '666555'
            ) {
                // 验证通过，更新用户信息
                dispatch(setUserInfo({
                    username: 'admin',  // 保持用户名不变
                    password: values.password,  // 更新密码
                    phone: values.phone
                }));
                message.success('密码重置成功！');
                navigate('/login');
            } else {
                message.error('验证信息有误！');
            }
        } catch (error) {
            message.error('密码重置失败，请重试！');
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
        <div className="forget_password-container">
            <div className="forget_password-box">
                <h3>找回密码</h3>
                <Form
                    form={form}
                    name="forget_password"
                    initialValues={{ phone: '', password: '' }}
                    onFinish={onFinish}
                >

                    <Form.Item
                        name="phone"
                        rules={formRules.phone}
                    >
                        <Input placeholder="请输入手机号" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={formRules.password}
                    >
                        <Input.Password placeholder="请输入新密码" />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={formRules.code}
                    >
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



                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            确定
                        </Button>
                    </Form.Item>

                    <div className="forget_password-bottom">
                        <Button type="link" href="/login">
                            立即登录
                        </Button>
                        <div>
                            <span>没有账号？</span>
                            <Button type="link" href="/register">
                                立即注册
                            </Button>
                        </div>
                    </div>

                </Form>
            </div>
        </div>
    );
};

export default ForgetPassword;
