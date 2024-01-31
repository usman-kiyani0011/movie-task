import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import "./Header.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProfile, setProfile } from "../../store/profile/profileSlice";
import { getApi, putApi } from "../../api/api";
import ChangePasswordModal from "../ChangePassword/ChangePassword";
import { ShowToast } from "../ShowToast/ShowToast";

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const profile = useSelector(getProfile);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      delete values.confirmPassword
      await putApi(`/user/change-password`, values);
      ShowToast('Password successfully changed');
      setIsModalVisible(false)
    } catch (error) {
      ShowToast(error?.response?.data?.message, "error");
    }
  };

  const fetchProfile = async () => {
    const response = await getApi('/user/profile');
    dispatch(setProfile(response?.data));
  }

  useEffect(() => {
    if (!Object.keys(profile).length)
      fetchProfile();
  }, []);
  return (
    <div>
      <div className="header">
        <Link to="/">
          <div className="logo">Movie App</div>
        </Link>
        <div className="flex gap-5">
          <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <div className="logo">Home</div>
          </Link>
          <Link to="/recomended-movies" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <div className="logo">Recomended Movies</div>
          </Link>
        </div>
        <div className=" flex">
          <button
            onClick={() => setIsModalVisible(true)}
            className=" text-white font-bold py-2 px-4 rounded"
          >
            Change Password
          </button>

          <Link
            to='/profile'
            className=" text-white font-bold py-2 px-4 rounded"
          >
            Profile
          </Link>
          <img src={profile?.profileURL ? profile?.profileURL : user} alt="user" className="user-image rounded" />

        </div>
      </div>
      {isModalVisible && <ChangePasswordModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} handleSubmit={handleSubmit} />}
    </div>
  );
};

export default Header;
