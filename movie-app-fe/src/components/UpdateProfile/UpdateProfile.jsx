import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { getApi, patchApi } from "../../api/api";
import { ShowToast } from "../ShowToast/ShowToast";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, setProfile } from "../../store/profile/profileSlice";
import Header from "../Header/Header";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const profile = useSelector(getProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      delete values.email;
      const res = await patchApi(`/user/update-profile`, values);
      dispatch(setProfile(res?.data));
      ShowToast("Profile updated successfully");
      navigate("/");
    } catch (error) {
      ShowToast(error?.response?.data?.message, "error");
    }
  };

  const fetchProfile = async () => {
    const response = await getApi("/user/profile");
    dispatch(setProfile(response?.data));
  };

  useEffect(() => {
    if (!Object.keys(profile).length) fetchProfile();
  }, []);

  return (
    <div>
      <Header />
      <div>UpdateProfile</div>
      {Object?.keys(profile)?.length > 0 && (
        <Form
          layout="vertical"
          initialValues={{
            ...profile,
            dob: profile?.dob ? dayjs(profile?.dob) : undefined,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input disabled={true} />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Profile URL"
            name="profileURL"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Date of Birth" name="dob">
            <DatePicker format="MM-DD-YYYY" />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default UpdateProfile;
