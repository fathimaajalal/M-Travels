import React, { useContext, useEffect, useState } from 'react';
import { BookContext } from '../context/BookContext';
import axios from 'axios';

const Profile = () => {
  const { backendUrl, token } = useContext(BookContext);
  const [profileData, setProfileData] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [editData, setEditData] = useState({ name: '', email: '', phone: '' });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const loadProfileData = async () => {
    try {
    //   if (!token) {
    //     console.error('Token is not available. Please log in.');
    //     return;
    //   }

      const response = await axios.get(`${backendUrl}/api/user/userprofile`, {
        headers: { token },
      });

      if (response.data.success) {
        setProfileData(response.data.user);
      } else {
        console.error('Failed to fetch profile data:', response.data.message);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const handleEditProfile = async () => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/user/editprofile`,
        editData,
        { headers: { token } }
      );

      if (response.data.success) {
        setProfileData(response.data.user);
        setIsProfileModalOpen(false); // Close the modal after saving
      } else {
        console.error('Failed to update profile:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirmation password don't match.");
      return;
    }

    try {
      const response = await axios.put(
        `${backendUrl}/api/user/editpassword`,
        passwordData,
        { headers: { token } }
      );

      if (response.data.success) {
        alert('Password updated successfully');
        setIsPasswordModalOpen(false); // Close the password modal
      } else {
        console.error('Failed to update password:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const openProfileModal = () => {
    setEditData({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone || '',
    });
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => setIsProfileModalOpen(false);

  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  const handleProfileChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  useEffect(() => {
    loadProfileData();
  }, [token]);

  if (!profileData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl font-semibold text-center">My Profile</div>

      <div className="mt-8 mx-auto max-w-xl bg-white shadow-md rounded-md p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl text-gray-500">
            {profileData.name[0].toUpperCase()}
          </div>
          <h2 className="text-xl font-medium text-gray-800">{profileData.name}</h2>
        </div>

        <div className="mt-6 text-gray-700">
          <p>
            <strong>Email:</strong> {profileData.email}
          </p>
          <p>
            <strong>Phone:</strong> {profileData.phone || 'N/A'}
          </p>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={openProfileModal}
            className="px-8 py-4 border border-black text-sm hover:bg-black hover:text-white transition-all duration-500"
          >
            Edit Profile
          </button>
          
          <button
            onClick={openPasswordModal}
            className="px-8 py-4 border border-black text-sm hover:bg-black hover:text-white transition-all duration-500"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={editData.name}
                onChange={handleProfileChange}
                className="w-full border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editData.email}
                onChange={handleProfileChange}
                className="w-full border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={editData.phone}
                onChange={handleProfileChange}
                className="w-full border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={closeProfileModal}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="currentPassword">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="newPassword">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={closePasswordModal}
                className="px-8 py-4 border border-black text-sm hover:bg-black hover:text-white transition-all duration-500"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-8 py-4 border border-black text-sm hover:bg-black hover:text-white transition-all duration-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
