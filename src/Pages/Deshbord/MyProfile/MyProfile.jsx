
import UseAuth from '../../../UseHook/UseAuth';
import { Link } from 'react-router-dom';
import Member from '../../../UseHook/Member';

// import UseAuth from '../../../UseHook/UseAuth';
// const{user} = UseAuth()
const MyProfile = () => {
    // স্টেট ডিক্লেয়ার করুন
    const { user } = UseAuth()
   
    const [isMember] = Member();
   
    return (
      
        <div className='sm:w-96'>
            <div className='bg-[#ffffffc4] p-5 rounded shadow-2xl flex-col justify-center'>
                <img className='flex justify-center w-24 rounded-full m-auto' src={user?.photoURL} alt="" />
                <h2 className='text-2xl font-bold italic text-center py-2'>{user?.displayName}</h2>
                <h2 className='text-center font-semibold w-full italic'>Email: {user?.email}</h2>
               <div>
               {!isMember && (
          <Link to="/payment">
                   
            <button className=" bg-[#42ccc5] p-2 rounded shadow-2xl"> Membership <span className="">$ 100</span> </button>
          </Link>
        )}
        {isMember && (
          <span className="inline-block px-4 py-1 font-semibold text-teal-900 bg-teal-200 rounded-full">
            Verified
          </span>
        )}
               </div>
            </div>
           
        </div>
        
    );
};

export default MyProfile;









