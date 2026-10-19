import { useState } from "react";
import "../css/UsersTable.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

function UsersTable() {
  const [users, setUsers] = useState([
    { id: 1, name: "Sakshi", email: "sakshi@gmail.com", role: "User", status: "Active" },
    { id: 2, name: "Rahul", email: "rahul@gmail.com", role: "User", status: "Active" },
    { id: 3, name: "Priya", email: "priya@gmail.com", role: "Admin", status: "Active" },
    { id: 4, name: "Amit", email: "amit@gmail.com", role: "User", status: "Inactive" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.role.toLowerCase().includes(search) ||
      user.status.toLowerCase().includes(search)
    );
  });

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleEdit = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" } : user
      )
    );
  };

  return (
    <div className="users-card">
      <div className="users-header">
        <div>
          <h2>👥 Recent Users</h2>
          <p>Showing {filteredUsers.length} of {users.length} users</p>
        </div>
        <div className="user-search">
          <FaSearch />
          <input placeholder="Search user..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <div className="users-table-wrapper">
        <table>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td><span className={user.status === "Active" ? "status active" : "status inactive"}>{user.status}</span></td>
                  <td>
                    <button className="edit" onClick={() => handleEdit(user.id)}><FaEdit /></button>
                    <button className="delete" onClick={() => handleDelete(user.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="no-users">No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;
