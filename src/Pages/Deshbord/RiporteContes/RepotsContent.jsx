import Swal from "sweetalert2";
import Loader from "../../../Route/Loader";
import { NavLink } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UseAxios from "../../../UseHook/UseAxios";


const RepotsContent = () => {
    const axiosSecure = UseAxios();

    const { data, isLoading } = useQuery({
      queryKey: ["reportedProductes"],
      queryFn: async () => await axiosSecure.get("/reportdProduct"),
    });
  
    const allReportedContent = data?.data;
  
    const queryClient = useQueryClient();
    const { mutateAsync: deleteProduct } = useMutation({
      mutationFn: async (id) => await axiosSecure.delete(`/producted/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries(["reportedPro"]);
      },
    });
  
    const handleDelete = async (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to Delete this Product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteProduct(id);
            Swal.fire({
              title: "Deleted!",
              text: "Reported Product has been deleted successfully.",
              icon: "success",
            });
          } catch (error) {
            // console.log(error)
          }
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
           
      <div className="">
        <div className="bg-white shadow-md rounded my-6">
         
          <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Product Name
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Product Details
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Action
      </th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {allReportedContent?.map((reported) => (
      <tr key={reported._id} className="hover:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap">
          {reported.productsName}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <NavLink to={`/detels/${reported._id}`}>
            <button className="text-white font-semibold py-2 px-4 rounded-md text-sm bg-green-600 hover:bg-green-700">
              View Details
            </button>
          </NavLink>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button
            onClick={() => handleDelete(reported._id)}
            className="text-white font-semibold py-2 px-4 rounded-md text-sm bg-red-500 hover:bg-red-600"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </div>
      </div>
        </div>
    );
};

export default RepotsContent;