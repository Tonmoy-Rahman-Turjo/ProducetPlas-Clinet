import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { IoClose } from "react-icons/io5";
import UseAuth from "../../UseHook/UseAuth";
import './nav.css'
const Nav = () => {
    const [open, setOpen] = useState(false)
    
    const navigate = useNavigate()
    const { user, signOute } = UseAuth()
    // console.log(user)
    const [theme, setTheme] = useState('light')
    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localtheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', localtheme)
    }, [theme])

    const handeltogol = (e) => {
        
        if (e.target.checked) {
            setTheme('night')
        }
        else {
            setTheme('light')
        }

    }
    const handleLogout = () => {
        signOute().then(() => {
           navigate('/login');
        });
    };
    return (
        <div>
            <div className="flex  shadow-lg shadow-[#353333d2]  z-50  py-3 my5 bg-[#17181846] bg-gradient-to-r from-[#0c0b0bc5] to-[#07070756] justify-around items-center">
                <div className="flex  items-center gap-2">
                   
                    <h2 className="lg:text-3xl text-base font-extrabold italic bg-gradient-to-r from-[#0c1bf0] to-[#42dbba] bg-clip-text text-transparent briemhand ">ProductPulse</h2>
                </div>
                {/* scend */}
                <div className="item">

                    <ul className="flex gap-5">
                        <NavLink className={({ isActive }) => isActive ? 'border-b-4 px-2 shadow-2xl shadow-[#6fff8e] border-red-500 bg-[#ffff] itelic font-extrabold' : ' text-[#fff] italic poetsen text-lg '} to="/">Home</NavLink>

                        <NavLink className={({ isActive }) => isActive ? 'border-b-4 px-2 shadow-2xl shadow-[#6fff8e] border-red-500 bg-[#ffff] itelic font-extrabold' : ' text-[#fff] italic text-lg'} to="/products">Products</NavLink>




                        <NavLink className={({ isActive }) => isActive ? 'border-b-4 px-2 shadow-2xl shadow-[#6fff8e] border-red-500 bg-[#ffff] itelic font-extrabold ' : ' text-[#fff] flex gap-5 roboto italic text-lg '} to="/register">Register</NavLink>
                    </ul>
                </div>

                {/* thard */}
                <div className="flex items-center gap-3" >
                    <div className="then">
                        <div className="" onClick={() => setOpen(!open)}>
                            {
                                open === true ? <IoMdMenu /> : <IoClose className=" md:hidden"></IoClose>
                            }

                        </div>
                        <ul className={` flex flex-col text-2xl mt-4 md:flex-row items-center z-50 md:bg-white bg-[#63b7e7c0] p-2 rounded 
                 text-[rgba(19, 19, 19, 0.80)] absolute     md:mt-0 text-center  md:justify-center md:static  gap-5 ${open ? '-top-96' : ''}`}>
                            

                            <NavLink className={({ isActive }) => isActive ? 'border-b-4 px-2 shadow-2xl shadow-[#6fff8e] border-red-500 bg-[#ffff] itelic font-extrabold' : ' text-[#fff] italic poetsen text-lg '} to="/">Home</NavLink>

                            <NavLink className={({ isActive }) => isActive ? 'border-b-4 px-2 shadow-2xl shadow-[#6fff8e] border-red-500 bg-[#ffff] itelic font-extrabold' : ' text-[#fff] italic text-lg'} to="/products">Products</NavLink>




                            <NavLink className={({ isActive }) => isActive ? 'border-b-4 px-2 shadow-2xl shadow-[#6fff8e] border-red-500 bg-[#ffff] itelic font-extrabold ' : ' text-[#fff] flex gap-5 roboto italic text-lg '} to="/register">Register</NavLink>
                        </ul>
                    </div>
                    <div className="flex gap-4 items-center">
                        <label className="cursor-pointer grid place-items-center">
                            <input type="checkbox" onChange={handeltogol} value="synthwave" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                            <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                            <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </label>




                        {

                            user ? <div className="dropdown   bg-gradient-to-r shadow-xl from-[#e1e2e2] to-[#afbdbb]  w-12 h-12 m-auto items-center  z-50 rounded-full dropdown-end">
                                <label tabIndex={0} className="btn btn-circle btn-ghost avater" >
                                    <div className=" flex justify-center relative rounded-full"  >


                                        <div className=" w-10 ">

                                                {
                                                    user ? <img className="w-10 rounded-full" src={user?.photoURL} alt="" />
                                                        :
                                                        <p className=" w-24 h-24 rounded-full"></p>
                                                }
                                            
                                            <Tooltip id="my-tooltip" />

                                        </div>

                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>{user?.displayName}</li>
                                    <li><NavLink to="deshbord"><button className="text-center font-bold" >Desh Bord</button></NavLink></li>
                                    <li><button className="text-center font-bold" onClick={()=>handleLogout()} >logOut</button></li>
                                </ul>

                            </div>



                                : <Link to="/login"><button className="btn shadow-md shadow-[#686565] bg-gradient-to-r from-[#666966] to-[#1ae907] hover:bg-[#da4bbb]   text-white  font-extrabold italick rounded-full border-4 border-white "><span className=" btns text-[#db4242] lg:bg-white p-2 rounded-full bg-gradient-to-r from-[#6d4aeb] to-reed-500  "> </span>Login</button></Link>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nav;