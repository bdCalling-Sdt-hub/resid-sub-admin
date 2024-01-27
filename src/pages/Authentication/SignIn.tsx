import React from 'react';
import { useNavigate } from 'react-router-dom';
import baseAxios from '../../../Config';
import toast from 'react-hot-toast';

const Signin: React.FC = () => {
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate('/auth/forget-password');
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    baseAxios.post('api/users/signin', { email: e.currentTarget.email.value, password: e.currentTarget.password.value })
      .then((res) => {
        console.log(res);
        if (res.data.data.attributes.role === 'admin') {
          localStorage.setItem('yourInfo', JSON.stringify(res.data.data.attributes));
          localStorage.setItem("token", res?.data?.data?.token);
          toast.success(res?.data?.message);
          navigate('/residence');
        } else {
          toast.error("Vous n'êtes pas administrateur");
        }
      })
      .catch((err) => {
        console.log(err);  
        toast.error(err.response.data.message);
      });
  };


  return (
    <div className="h-screen">
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        {/* Left: Image */}
        <div className="w-1/2 h-screen hidden lg:block">
          <div className='h- flex justify-center items-center'>
            <img
              src="https://i.ibb.co/YjBqNfm/illustration-1.png"
              alt="Placeholder Image"
              className="object-cover w-full h-full mt-[200px]"
            />
          </div>
        </div>
        {/* Right: Login Form */}
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="flex justify-center text-[44px] mb-10 font-semibold">
          Bienvenue
          </h1>
          <h1 className="text-2xl font-semibold mb-4">Se connecter</h1>
          <form onSubmit={handleLogin}>
            {/* Username Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                E-mail
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>
            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
              Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="mb-6 font-medium font-['Montserrat'] text-primary">
              <p onClick={handleForgotPassword} className="cursor-pointer">
              Mot de passe oublié?
              </p>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="bg-primary text-white font-semibold rounded-md flex justify-center mx-auto px-[100px] py-3"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
