import { useGetAllUsers } from "@/hooks/empHooks";
import useGpsStore from "@/store/gpsStore";
import { userLocation } from "@/utils/helperfn";
import React, { useEffect } from "react";

function GPS() {
  const { data: users, isPending: loading } = useGetAllUsers({
    page: 1,
    limit: 10,
  });

  const handleGetLocation = useGpsStore((state) => state.handleGetLocation);
  const location = useGpsStore((state) => state.location);

  console.log(location);

  return (
    <div>
      <table className="table ">
        <thead>
          <th>#</th>
          <th>Name</th>
          <th>Location</th>
          <th>Location</th>
        </thead>
        <tbody>
          {users?.data?.length &&
            users?.data?.map((user, idx) => (
              <tr key={user?._id}>
                <td>{idx + 1}</td>
                <td>
                  <div onClick={handleGetLocation}>
                    {user.firstname} {user.middlename} {user.lastname}
                  </div>
                </td>
                <td>{idx + 1}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default GPS;
