import React, { useEffect, useState } from "react";
import MakeAdminRow from "./MakeAdminRow";

const MakeAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.user));
  }, []);
  return (
    <div className="overflow-x-auto w-5/6 mx-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Email</th>
            <th>Role</th>
            <th>X</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <MakeAdminRow key={user._id} index={index} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MakeAdmin;
