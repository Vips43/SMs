import AdminMap from "@/components/gps/AdminMap";
import { useGetAllUsers } from "@/hooks/empHooks";

function GPS() {
  const { data: users, isPending: loading } = useGetAllUsers({
    page: 1,
    limit: 10,
  });
 

  console.log(users);
  return (
    <div>
      <AdminMap users={users?.data} />
    </div>
  );
}

export default GPS;
