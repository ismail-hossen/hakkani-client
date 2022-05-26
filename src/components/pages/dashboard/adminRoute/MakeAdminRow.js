import React from "react";

const MakeAdminRow = ({ index, user, refetch }) => {
  const handleUser = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
        }
      });
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
