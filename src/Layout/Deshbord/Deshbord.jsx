import { NavLink, Outlet } from "react-router-dom";
import Nav from "../../Shared/NavBar/Nav";
import Admin from "../../UseHook/Admin";
import Modaretor from "../../UseHook/Modaretor";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const Deshbord = () => {
    const [isAdmin] = Admin();
    const [isModerator] = Modaretor();
    const [open, setOpen] = useState(false)
    return (
       <div className="bg-[#49c6e6]">
               <Nav></Nav>
             
         <div className="flex md:flex-row flex-col w-10/12  p-10  rounded  m-auto">
      
            <div className=" md:w-64 w-full md:min-h-screen  text-center  flex flex-col rounded ">
             
            <h2 className="  text-center font-extrabold text-white border-b-4  text-2xl">DeshBord</h2>
            <div className=" text-3xl" onClick={() => setOpen(!open)}>
                            {
                                open === true ? <IoMdMenu /> : <IoClose className=" md:hidden"></IoClose>
                            }

                        </div>
               
                <ul className={` flex flex-col  justify-center  z-50
                  relative        ${open ? '-top-96 ' : ''}`}>
              {
                isAdmin?( <>
                         <NavLink className={({isActive}) => isActive ? " text-red w-full bg-[#3bc44d]   rounded font-semibold my-2  md:text-2xl text-base text-center" : "text-[#5c5656] bg-[#fff] rounded font-semibold my-2  md:text-2xl text-base text-center" } to="/deshbord/user">User</NavLink>
                         <NavLink className={({isActive}) => isActive ? " text-red w-full bg-[#3bc44d]  rounded font-semibold my-2  md:text-2xl text-base text-center" : "text-[#5c5656] bg-[#fff] rounded font-semibold my-2  md:text-2xl text-base text-center" } to="/deshbord/user">Statistics Page.</NavLink>
                         <NavLink className={({isActive}) => isActive ? " text-red w-full bg-[#3bc44d]  rounded font-semibold my-2  md:text-2xl text-base text-center" : "text-[#5c5656] bg-[#fff] rounded font-semibold my-2  md:text-2xl text-base text-center" } to="/deshbord/user">Manage Coupons. </NavLink>
                </>):isModerator ? (
                <>
                 <NavLink className={({isActive}) => isActive ? " text-red w-full bg-[#3bc44d]  rounded font-semibold my-2  md:text-2xl text-base text-center" : "text-[#5c5656] bg-[#fff] rounded font-semibold my-2  md:text-2xl text-base text-center" } to="/deshbord/productrivew"> Review Products </NavLink>
                 <NavLink className={({isActive}) => isActive ? " text-red w-full bg-[#3bc44d]  rounded font-semibold my-2  md:text-2xl text-base text-center" : "text-[#5c5656] bg-[#fff] rounded font-semibold my-2  md:text-2xl text-base text-center" } to="/deshbord/repotedcontens">  Reported Contents </NavLink>
               
                </>
              ): <>
           
              <NavLink className={({isActive}) => isActive ? " text-red w-full bg-[#3bc44d]  rounded font-semibold my-2  md:text-2xl text-base text-center" : "text-[#6fda5a] bg-[#fff] rounded font-semibold my-2  md:text-2xl text-base text-center" }  to="/deshbord/myprofile">My Profile</NavLink>
                   
                   <NavLink className={({isActive}) => isActive ? " text-red w-full bg-[#3bc44d]  rounded font-semibold my-2  md:text-2xl text-base text-center" : "text-[#5c5656] bg-[#fff] rounded font-semibold my-2  md:text-2xl text-base text-center" }  to="/deshbord/myproducts">My Products</NavLink>
  
                   
  
                    <NavLink className={({isActive}) => isActive ? " text-red w-full bg-[#3bc44d]  rounded font-semibold my-2  md:text-2xl text-base" : "text-[#5c5656] bg-[#fff] rounded font-semibold my-2  md:text-2xl text-base" } to="/deshbord/addpost"> <button className="w-full">Add Products</button></NavLink>   
                
            
                </>
              }
                    
                </ul>

            </div>
            <div className="w-full md:m-7">
         
                <Outlet> </Outlet>
            </div>
        </div>
       </div>
    );
};

export default Deshbord;








