


import { useEffect, useState } from "react";
import useAxiosHook from "../../../../UseHook/UseAxiosHook";
import UseAuth from "../../../../UseHook/UseAuth";
import { Link } from "react-router-dom";

const MyProducts = () => {
    const { user } = UseAuth()
    const axios = useAxiosHook()
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get(`/mylist/${user?.email}`)
            .then(res => {
                console.log(res.data)
                setProducts(res.data)
            })
    }, [])

    return (
        <div className="bg-[#2a5264]">
            {
                products?.map(item => (<div key={item._id}>


                    <table className="table rounded-none bg-white mb-2">
                        {/* head */}
                        <thead>
                            <tr>

                                <th>Product Name</th>
                                <th>Number of votes
                                </th>
                                <th>Status</th>
                                <th>Update/Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>

                                <td>{item.productsName}</td>
                                <td>votes  </td>
                                <td>Status </td>
                                <td className="flex gap-5">
                                    <button className="btn btn-success">Success</button>
                                   
                                    <button className="btn btn-error">Error</button>
                                </td>

                            </tr>


                        </tbody>
                    </table>

                </div>))
            }
        </div>
    );
};

export default MyProducts;
