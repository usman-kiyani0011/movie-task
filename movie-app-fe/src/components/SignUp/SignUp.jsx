import React from "react";
import { Form, Input, DatePicker } from "antd";
import { postApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { ShowToast } from "../../components/ShowToast/ShowToast";

const SignUp = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await postApi(`/user/signup`, values);
      await postApi(`/movies/seed-categories`);
      postApi(`/movies/seed-movies`);
      navigate("/signin");
    } catch (error) {
      ShowToast(error?.response?.data?.message, "error");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="p-4 space-y-6"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { type: "email", message: "The input is not valid E-mail!" },
          { required: true },
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input type="password" placeholder="Enter password" />
      </Form.Item>
      <Form.Item label="Date of Birth" name="dob" rules={[{ required: true }]}>
        <DatePicker />
      </Form.Item>
      <Form.Item label="Address" name="address" rules={[{ required: true }]}>
        <Input.TextArea rows={4} placeholder="Enter address" />
      </Form.Item>
      <Form.Item>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
