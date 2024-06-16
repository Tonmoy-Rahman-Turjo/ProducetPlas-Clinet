import { NavLink, Outlet } from "react-router-dom";


const Deshbord = () => {
    return (
       <div className="bg-[#49c6e6]">
         <div className="flex md:flex-row flex-col w-10/12  p-10  rounded  m-auto">
            <div className=" md:w-64 w-full md:min-h-screen   rounded ">
            <h2 className="  text-center font-extrabold text-white border-b-4 text-2xl">DeshBord</h2>
                <ul className="manu flex md:flex-col flex-row">
                   
                 <NavLink className={({isActive}) => isActive ? " text-red w-full bg-[#3bc44d]  rounded font-semibold my-2  md:text-2xl text-base text-center" : "text-[#6fda5a] bg-[#fff] rounded font-semibold my-2  md:text-2xl text-base text-center" }  to="/deshbord/myprofile">My Profile</NavLink>
                   
                 <NavLink className={({isActive}) => isActive ? " text-red w-full bg-[#3bc44d]  rounded font-semibold my-2  md:text-2xl text-base text-center" : "text-[#5c5656] bg-[#fff] rounded font-semibold my-2  md:text-2xl text-base text-center" }  to="/deshbord/myproducts">My Products</NavLink>

                     <NavLink className={({isActive}) => isActive ? " text-red w-full bg-[#3bc44d]  rounded font-semibold my-2  md:text-2xl text-base text-center" : "text-[#5c5656] bg-[#fff] rounded font-semibold my-2  md:text-2xl text-base text-center" } to="/deshbord/user">User</NavLink>

                  <NavLink className={({isActive}) => isActive ? " text-red w-full bg-[#3bc44d]  rounded font-semibold my-2  md:text-2xl text-base" : "text-[#5c5656] bg-[#fff] rounded font-semibold my-2  md:text-2xl text-base" } to="/deshbord/addpost"> <button className="w-full">Add Post</button></NavLink>
                    
                </ul>

            </div>
            <div className="md:flex-1 md:m-7">
                <Outlet> </Outlet>
            </div>
        </div>
       </div>
    );
};

export default Deshbord;
