
import { useEffect, useState } from "react";
import useAxiosHook from "../../../../UseHook/UseAxiosHook";
import UseAuth from "../../../../UseHook/UseAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyProducts = () => {
    const { user } = UseAuth();
    const axios = useAxiosHook();
    const [products, setProducts] = useState([]);
    const[control, setControl] = useState(false)

            
const handleDelete = (id) => {
    axios.delete(`/deshbord/myproduct/delete/${id}`)
        .then(response => {
            if (response.data.deletedCount > 0) {
                setControl(!control); 
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } 
            
        })
       
};
    useEffect(() => {
        if (user?.email) {
            axios.get(`/mylist/${user.email}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`, 
                    
                }
            })
            .then(res => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    console.error('Access forbidden: You do not have permission to view this resource.');
                } else {
                    console.error('An error occurred:', error);
                }
            });
        }
    }, [user?.email, axios, control]);

    return (
        <div className="bg-[#2a5264] w-full">
            {/* <table className=" bg-white overflow-scroll ">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Number of votes</th>
                        <th>Status</th>
                        <th>Update/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(item => (
                        <tr key={item._id}>
                            <td>{item.productsName}</td>
                            <td>Vote</td>
                            <td>Stauts</td>
                            <td className="flex gap-5">
                                
                                <Link to={`/deshbord/myproduct/update/${item._id}`}><button  className="btn btn-success">Update</button> </Link>
                                <button onClick={()=>handleDelete(item._id)} className="btn btn-error">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
             <div className="overflow-x-auto">
                <table className="min-w-full bg-white  overflow-hidden">
                    <thead className=" border-b-4">
                        <tr>
                            <th className="py-2 px-4">Product Name</th>
                            <th className="py-2 px-4">Number of votes</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Update/Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map(item => (
                            <tr key={item._id} className="text-center">
                                <td className="py-3 px-4 whitespace-nowrap">{item.productsName}</td>
                                <td className="py-3 px-4">{/* Vote */}</td>
                                <td className="py-3 px-4">{/* Status */}</td>
                                <td className="py-3 px-4">
                                    <Link to={`/deshbord/myproduct/update/${item._id}`}>
                                        <button className="btn btn-success">Update</button>
                                    </Link>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-error ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyProducts;
