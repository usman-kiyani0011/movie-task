import React from "react";
import { Form, Input } from "antd";
import { postApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { ShowToast } from "../../components/ShowToast/ShowToast";
import { Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await postApi(`/user/signin`, values);
      const token = res?.data?.accessToken;
      localStorage.setItem("_token", token);
      navigate("/");
    } catch (error) {
      ShowToast(error?.response?.data?.message, "error");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="p-4 space-y-4"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your username or email!" },
        ]}
      >
        <Input placeholder="Username or Email" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in
        </button>
      </Form.Item>
      <Form.Item className="text-center text-sm">
        Click here to <Link to="/signup">Sign up</Link>
      </Form.Item>
    </Form>
  );
};

export default SignIn;
