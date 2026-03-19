import {useNavigate} from "react-router-dom";
import { Side_Menu_Data } from '../../utils/data';
import { useContext} from 'react';
import { UserContext } from '../../context/userContext';

const SideMenu = ({activeMenu}) => {

    const {user,clearUser} = useContext(UserContext);

    const navigate = useNavigate();

    const handleClick = (route) =>{
        if(route === "logout"){
            handleLogOut();
            return;
        }
        navigate(route);
    };

    const handleLogOut = () =>{
        localStorage.clear();
        clearUser();
        navigate("/login");
    };
  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
        <div className='flex flex-col items-center justify-center gap-3 mbt-3 mb-7 '>
            {user?.profileImageUrl?(
                <img src={user?.profileImageUrl || " "} alt="Profile Photo"
                className='w-20 h-20 bg-slate-400 rounded-full ' />
            ):<></> }
            <h5 className='text-gray-950 font-medium leading'>
                {user?.fullName || " "}
            </h5>
        </div>

        {Side_Menu_Data.map((item,index) => (
            <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] 
                ${activeMenu == item.label ? "text-white bg-purple-600":" "} py-3 px-6 rounded-lg mb-3 `}
                onClick={() => handleClick(item.path)}>
                    <item.icon className='text-xl'/>
                    {item.label}
                </button>
        ))}
    </div>
  );
}

export default SideMenu
