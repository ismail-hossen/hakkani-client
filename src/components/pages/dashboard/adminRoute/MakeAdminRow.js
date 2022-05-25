import React from "react";

const MakeAdminRow = ({ index, user }) => {
  const handleUser = (id) => {
    console.log(id);

    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{user.email}</td>
      <td>
        {user?.role === "admin" ? (
          "Admin"
        ) : (
          <button onClick={() => handleUser(user._id)} className="btn btn-sm">
            Make Admin
          </button>
        )}
      </td>
    </tr>
  );
};

export default MakeAdminRow;
