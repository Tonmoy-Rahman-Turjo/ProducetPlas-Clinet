
import { Link } from 'react-router-dom';

const Error = () => {
    return (
      <div className='bg-[#60ccec] py-20 h-screen'>
           <div className=" bg-slate-500 w-1/3 px-3 m-auto rounded-lg ">
        <h2 className="text-5xl text-center font-extrabold pt-7 text-[#fff]">404</h2>
        <h2 className="text-center text-3xl font-bold  text-white">Page Not Found </h2>

    <h2 className="text-center clear-start font-boled py-7 text-[#ffffff83]">  Sorry, the page you are looking for could not be found.</h2>
    <Link to="/"> <button className=" btn w-full px-6 mb-4 text-white font-bold text-2xl btn-primary text-center  ">Go Back</button></Link>
    </div>
      </div>
    );
};

export default Error;