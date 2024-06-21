

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UseAxios from "../../../UseHook/UseAxios";
import HookProducts from "../../../UseHook/HookProducts";
import Loader from "../../../Route/Loader";
import { ToastContainer, toast } from "react-toastify";

const ProductRivew = () => {
    const [products, loading, refetch] = HookProducts();
    const axiose = UseAxios();
  
    // getitem from sessionStorage
    const initialDisabledButtons =
      JSON.parse(sessionStorage.getItem("disabledButtons")) || {};
    const [disabledButtons, setdisableButton] = useState(
      initialDisabledButtons
    );

  useEffect(() => {
        sessionStorage.setItem("disabledButtons", JSON.stringify(disabledButtons));
      }, [disabledButtons]);
    
      // Accepted product
      const handleAcceptuserProduct = async (productId) => {
        try {
          await axiose.put(`/accepteduserproduct/${productId}`, {
            status: "Accepted",
          });
          setdisableButton((prev) => ({ ...prev, [productId]: true }));
          refetch();
          toast.success("Product accepted successfully");
          // console.log("Product accepted successfully");
        } catch (error) {
          console.error("Error accepting product:", error);
        }
      };

       // Featured products
  const handleuserFeaturedProduct = async (productId) => {
    try {
      await axiose.put(`/productdseType/${productId}`, {
        status: "Featured",
        
      });
      refetch();
     
      toast.success("Successfully mark  Featured");
    } catch (error) {
      console.error("Error  updating product:", error);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (a.ProductStatus === "Pending") {
      return -1; 
    }
    if (a.ProductStatus === "Accepted" && b.ProductStatus === "Accept") {
      return -1; 
    }
    if (a.ProductStatus === "Rejected" && b.ProductStatus !== "Rejected") {
      return 1;
    }
    return 0; 
  });
  


  const handleuserProductReject = async (productId) => {
        try {
          await axiose.put(`/rejecteduserproduct/${productId}`, {
            status: "Rejected",
          });
          setdisableButton((prev) => ({ ...prev, [productId]: true }));
          refetch();
          toast.success("Product rejected successfully");
        
        } catch (error) {
          // console.error("Error rejecting product:", error);
        }
      };

  if (loading) {
    return (
      <div className="flex justify-center mt-8">
        <Loader />
      </div>
    );
  }

  

  return (
    <>
   
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="p-6 w-full">
          <table className="w-full table-auto text-left bg-white shadow-md rounded-lg">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-4 border">Product Name</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Accept</th>
                <th className="py-2 px-4 border">Reject</th>
                <th className="py-2 px-4 border">Featured</th>
                <th className="py-2 px-4 border">Details</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => (
                <tr key={product._id} className="bg-white">
                  <td className="p-4 border-b border-gray-200">{product.productsName}</td>
                  <td className="p-4 border-b border-gray-200">
                    <div
                      className={`py-1 px-2 text-sm rounded-md ${
                        product.ProductStatus === "Accepted"
                          ? "bg-green-200 text-green-800"
                          : product.ProductStatus === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {product.ProductStatus}
                    </div>
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <button
                      onClick={() => handleAcceptuserProduct(product._id)}
                      disabled={disabledButtons[product._id]}
                      className={`text-sm px-4 py-2 rounded ${
                        disabledButtons[product._id]
                          ? "bg-blue-400 text-white cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {product.ProductStatus === "Accepted" ? "Accepted" : "Accept"}
                    </button>
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <button
                      onClick={() => handleuserProductReject(product._id)}
                      disabled={disabledButtons[product._id]}
                      className={`text-sm px-4 py-2 rounded ${
                        disabledButtons[product._id]
                          ? "bg-red-300 text-white cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-700 text-white"
                      }`}
                    >
                      {product.ProductStatus === "Rejected" ? "Rejected" : "Reject"}
                    </button>
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <button
                      onClick={() => handleuserFeaturedProduct(product._id)}
                      className={`text-sm px-4 py-2 rounded ${
                        product.ProductType === "Featured"
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-gray-600 hover:bg-gray-800 text-white"
                      }`}
                      disabled={product.ProductType === "Featured"}
                    >
                      {product.ProductType === "Featured" ? "Featured" : "Make Featured"}
                    </button>
                  </td>
                  <td className="p-4 border-b border-gray-200">
                    <NavLink to={`/details/${product._id}`}>
                      <button className="text-sm px-4 py-2 rounded bg-green-400 hover:bg-green-600 text-white">
                        View Details
                      </button>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ProductRivew;








  
