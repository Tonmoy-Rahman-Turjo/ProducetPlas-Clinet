
// import Loader from "../../../Route/Loader";
// import { useQuery } from "@tanstack/react-query";
// import UseAxios from "../../../UseHook/UseAxios";
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

// import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
// const StaticPgae = () => {
//     const axiosSecure = UseAxios();

//   const { data: stats = {}, isLoading } = useQuery({
//     queryKey: ["admin-stats"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/admin-stats");
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex justify-center mt-8">
//         <Loader />
//       </div>
//     );
//   }

//   const data = [
//     { name: "Products", value: stats?.totalproduct || 0 },
//     { name: "Reviews", value: stats?.totalreviews || 0 },
//     { name: "Users", value: stats?.totalusers || 0 },
//   ];
//     return (
//         <div>
//              <div className="grid w-11/12  gap-10  md:grid-cols-2 xl:grid-cols-4">
//         <div className="w-11/12 mx-auto rounded-lg shadow-xs  hover:bg-[#f7546a] bg-[#41db33]">
//           <div className="p-4 flex items-center">
//             <div className="p-3 rounded-full text-orange-500 dark:text-orange-100 bg-orange-100 dark:bg-orange-500 mr-4">
//               <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
//                 <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
//               </svg>
//             </div>
//             <div>
//               <p className="mb-2 text-xl font-medium text-gray-600 dark:text-gray-400">
//                 Total Users
//               </p>
//               <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
//                 {stats?.users}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="w-11/12 mx-auto rounded-lg shadow-xs hover:bg-[#f7546a] bg-[#41db33]">
//           <div className="p-4 flex items-center">
//             <div className="p-3 rounded-full text-blue-500 dark:text-blue-100 bg-blue-100 dark:bg-blue-500 mr-4">
//               <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
//                 <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
//               </svg>
//             </div>
//             <div>
//               <p className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400">
//                 Total Products
//               </p>
//               <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
//                 {stats?.products}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="w-11/12 mx-auto rounded-lg shadow-xs  hover:bg-[#f7546a] bg-[#41db33]">
//           <div className="p-4 flex items-center">
//             <div className="p-3 rounded-full text-teal-500 dark:text-teal-100 bg-teal-100 dark:bg-teal-500 mr-4">
//               <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
//                 <path
//                   fillRule="evenodd"
//                   d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <div>
//               <p className="mb-2 text-xl font-medium text-gray-600 dark:text-gray-400">
//                 Total Reviews
//               </p>
//               <p className="text-3xl font-semibold text-gray-700 dark:text-gray-200">
//                 {stats?.reviews}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Pie chart */}
//       <div className="w-11/12 flex justify-center mx-auto">
//         <PieChart width={400} height={400}>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             label={true}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend/>
//         </PieChart>
//       </div>
//         </div>
//     );
// };

// export default StaticPgae;





import Loader from "../../../Route/Loader";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../../../UseHook/UseAxios";
import { Cell, Legend, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const StaticPage = () => {
  const axiosSecure = UseAxios();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chart-pai");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader />
      </div>
    );
  }

  const data = [
    { name: "Products", value: stats?.totalproduct || 0 },
    { name: "allreview", value: stats?.totalreviews || 0 },
    { name: "Users", value: stats?.totalusers || 0 },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transform transition duration-500 hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6 text-orange-500">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <div>
              <p className="mb-2 text-xl font-medium ">Total Users</p>
              <p className="text-2xl font-semibold ">{stats?.totalusers}</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transform transition duration-500 hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6 text-blue-500">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <div>
              <p className="mb-2 text-xl font-medium">Total Products</p>
              <p className="text-2xl font-semibold">{stats?.totalproduct}</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transform transition duration-500 hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-teal-100 mr-4">
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6 text-teal-500">
                <path
                  fillRule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="mb-2 text-xl font-medium ">Total Reviews</p>
              <p className="text-2xl font-semibold">{stats?.totalreviews}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mx-auto mt-10">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StaticPage;













