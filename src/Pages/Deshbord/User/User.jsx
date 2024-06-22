


import { useQuery } from "@tanstack/react-query";
// import useAxiosHook from "../../../UseHook/UseAxiosHook";
import { FcBusinessman } from "react-icons/fc";
import { FaPeopleGroup } from "react-icons/fa6";
import Swal from "sweetalert2";
import UseAxios from "../../../UseHook/UseAxios";
import Loader from "../../../Route/Loader";

const User = () => {
  const axiosSecure = UseAxios();

  const { data: users = [], refetch , isLoading} = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure.get('/alluser', 

      );
      return res.data;
    },
  });

  const handleAdmin = (user) => {
    axiosSecure.patch(`/alluser/admin/${user._id}`)

      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          isLoading
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName} is an admin now`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error('Error promoting user to admin', error);
      });
  };

 const handlModaretor = (user) => {
   axiosSecure.patch(`/alluser/moderator/${user._id}`)
    .then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        isLoading
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} is an Moderator Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
   };
   if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader></Loader>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-2xl italic font-semibold text-red-800">Total Users: {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Make Moderator</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="bg-base-200">
                <th>{index + 1}</th>
                <td className="text-[#353333b2] font-bold italic">{user.displayName}</td>
                <td className="text-[#353333b2] font-bold italic">{user.email}</td>
                <td className="text-2xl flex flex-row justify-center">
                  {user.role ==='moderator'?(
                      <h2 className="font-semibold text-base"> modaretor</h2>
                  ): (
                    
                    <button onClick={() => handlModaretor(user)}> <FaPeopleGroup /></button>
                  )
                }
                </td>

                <td className="text-2xl text-center m-auto justify-center">
                  {user.role === 'admin' ? (
                    <h2 className="font-semibold text-base">Admin</h2>
                  ) : (
                    <button onClick={() => handleAdmin(user)}><FcBusinessman /></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;

