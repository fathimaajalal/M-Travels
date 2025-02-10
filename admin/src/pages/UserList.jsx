import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import ConfirmationModal from './ConfirmationModal'; // Reuse the modal component

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/list', {
        headers: { token },
      });
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Remove a user
  const removeUser = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/user/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchUsers(); // Refresh the list after removal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Handle click on the "X" button
  const handleRemoveClick = (id) => {
    setUserToRemove(id);
    setIsModalOpen(true);
  };

  // Confirm removal
  const handleConfirmRemove = () => {
    if (userToRemove) {
      removeUser(userToRemove);
      setIsModalOpen(false);
      setUserToRemove(null);
    }
  };

  // Cancel removal
  const handleCancelRemove = () => {
    setIsModalOpen(false);
    setUserToRemove(null);
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <p className="mb-2">All Users List</p>

      <div className="flex flex-col gap-2">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_2fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Name</b>
          <b>Email</b>
          <b>Phone</b>
          <b>Cart Data</b>
          <b className="text-center">Action</b>
        </div>

        {/* User List */}
        {users.map((user, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr] md:grid-cols-[1fr_2fr_2fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone || 'N/A'}</p>
            <p>{Object.keys(user.cartData).length} items</p>
            <p
              onClick={() => handleRemoveClick(user._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmRemove}
        message="Are you sure you want to remove this user?"
      />
    </>
  );
};

export default UserList;