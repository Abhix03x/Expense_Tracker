import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout';
import Input from '../../components/inputs/Input';
import {Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/Helper';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic,setProfilePic]=useState(null);
  const [fullName, setFullName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const [error, setError] =useState(null);

  const {updateUser} = useContext(UserContext);

  const navigate = useNavigate();
  const handleSignUp = async (e) =>{
    e.preventDefault();

    let profileImageUrl = "";
   
    if(!fullName){
      setError("enter all fields");
      return;
    }
     if(!validateEmail(email)){
      setError("enter valid Email");
      return;
    }
    if(!password){
      setError("all fields are required");
      return;
    }
    setError('');

    // Api call

    try{

      // upload image

      if(profilePic){
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || " ";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl, 
      });

      const {token,user} = response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("something went wrong..please try again");
      }
    }
  }
  return (
    <AuthLayout>
      <div className='w-full h-auto md:h-full mt-10 flex flex-col justify-center'>
        <h3 className='text-xl text-slate-900 font-bold mt-3 mb-6'>Create an Account</h3>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input 
        value={fullName}
        onChange={({target}) =>setFullName(target.value)}
        label="full Name"
        placeholder="Enter Name"
        type="text"/>
        <Input 
          value={email}
          onChange={({target}) => setEmail(target.value)}
          label = "Email"
          placeholder="johndoe@gmail.com"
          type="text"/>
          
          <div className='col-span-2'>
          <Input 
          value={password}
          onChange={({target}) => setPassword(target.value)}
          label = "Password"
          placeholder=""
          type="password"/>
          </div>

          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
          <button type="submit" className='w-full text-sm font-medium text-white bg-violet-500 shadow-lg shadow-purple-600/5 p-2.5 rounded-md my-1 hover:bg-purple-500'>Register</button>
          <p className='flex justify-center text-[13px] text-slate-800 mt-3 '>Already Have an Account ? <Link className='font-medium text-blue-600 underline' to="/login">Login</Link></p>
        </form>
        
      </div>
    </AuthLayout>
  )
}

export default SignUp;
