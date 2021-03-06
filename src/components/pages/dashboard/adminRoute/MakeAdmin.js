import React from "react";
import { useQuery } from "react-query";
import useJwtVerify from "../../../hooks/useJwtVerify";
import MakeAdminRow from "./MakeAdminRow";

const MakeAdmin = () => {
  const fetchData = async () => {
    const { data } = await useJwtVerify.get("https://pure-refuge-14003.herokuapp.com/users");
    return data;
  };
  const { data: users, loading, refetch } = useQuery("OCollection", fetchData);

  if (loading) {
    return <h1>loading...</h1>;
  }
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
          {users?.user?.map((user, index) => (
            <MakeAdminRow
              key={user._id}
              refetch={refetch}
              index={index}
              user={user}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MakeAdmin;
