import toast from "react-hot-toast";
import baseAxios from "../../../Config";
import { useNavigate } from 'react-router-dom';


function ForgetPassword() {
    const navigate = useNavigate();

    const handleForgetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        baseAxios.post('/api/users/forget/password', { email: e.currentTarget.email.value })
            .then((res) => {
                console.log(res);
                toast.success(res?.data?.message);
                navigate(`/auth/otp/${e.currentTarget.email.value}`);
            })
            .catch((err) => {
                console.log(err);
                toast.error(err?.response?.data?.message);
            });
        navigate(`/auth/otp/${e.currentTarget.email.value}`);
    }

    const changeRoute = () => {
        navigate('/auth/signin');
    }
    return (
        <div className="h-screen">
            <div className="bg-gray-100 flex justify-center items-center h-screen">
                {/* Left: Image */}
                <div className="w-1/2 h-screen hidden lg:block">
                    <div className='h- flex justify-center items-center'>
                        <img
                            src="https://i.ibb.co/rGy8ML7/Illustration-3.png"
                            alt="Placeholder Image"
                            className="object-cover  mt-[200px]"
                        />
                    </div>
                </div>
                {/* Right: Login Form */}
                <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                    <h1 onClick={changeRoute} className="flex cursor-pointer text-primary gap-2 text-xl items-center mb-5 font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>

                        Sign In
                    </h1>
                    <h1 className="text-2xl font-semibold mb-4">Forget Password</h1>
                    <p className="mb-5">Enter the email address associated with your account. We'll send you an OTP to your email.</p>
                    <form onSubmit={handleForgetPassword}>
                        {/* Username Input */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white font-semibold rounded-md flex justify-center mx-auto px-[100px] py-3"
                        >
                            Send OTP
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword