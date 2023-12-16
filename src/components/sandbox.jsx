import { useAuth } from "../contexts/auth.context";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import usersService from "../services/usersServices";
import "../style/sandbox.css";
import { showSuccessToast, showErrorToast } from "../utilities/toast";

const Sandbox = () => {
  const { user: userIn } = useAuth();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await usersService.getAllUsers();
        setUsers(data);
      } catch (error) {
        showErrorToast("Faild to fetch users");
      }
    };

    getUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await usersService.deleteUser(userId);
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      showSuccessToast("User deleted Successfully");
    } catch (error) {
      showErrorToast("Faild to delete user");
    }
  };

  const handlePatchBis = async (userId) => {
    try {
      await usersService.patchBusiness(userId);
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      showSuccessToast("User's Bis status changed Successfully");
    } catch (error) {
      showErrorToast("Faild to patch bis status");
    }
  };

  const redirectToEditUser = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  if (!userIn?.isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h1 className="display-2 text-center">Sandbox</h1>
      <p className="text-center" style={{ fontSize: "3vmin" }}>
        Your CRM system where you can control users.
      </p>
      <hr />
      <div className="table-responsive">
        <table className=" table-users table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>isBusiness</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name.first}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.isBusiness ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-success m-0 ms-1 mt-1"
                    style={{ width: "max-content" }}
                    onClick={() => redirectToEditUser(user._id)}
                  >
                    Edit User{" "}
                    <i className="bi bi-pencil-fill me-2 edit-user"></i>
                  </button>
                  <button
                    className="btn btn-success m-0 ms-1 mt-1"
                    style={{ width: "max-content" }}
                    onClick={() => handlePatchBis(user._id)}
                  >
                    <i className="bi bi-wrench"></i> Business Status
                  </button>
                  {!user.isAdmin && (
                    <>
                      <button
                        className="btn btn-success m-0 ms-1 mt-1"
                        style={{ width: "max-content" }}
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete User <i className="bi bi-trash3-fill"></i>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Sandbox;
