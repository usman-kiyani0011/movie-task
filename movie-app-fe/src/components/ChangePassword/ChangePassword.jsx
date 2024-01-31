import React from "react";
import { Form, Input, Modal } from "antd";

const ChangePasswordModal = ({
  isModalVisible,
  setIsModalVisible,
  handleSubmit,
}) => {
  return (
    <>
      <Modal
        title="Change Password"
        footer={false}
        centered
        closable={true}
        maskClosable={false}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Old Password"
            name="password"
            rules={[
              { required: true, message: "Please input your old password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your new password!" },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || value !== getFieldValue("newPassword")) {
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Change Password
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
