import toast from "react-hot-toast";
import baseAxios from "../../../Config";
import { useNavigate, useParams } from 'react-router-dom';


function UpdatePass() {
    let { email } = useParams();
    console.log(email)
    const navigate = useNavigate();

    const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // here check password and confirm password are same or not and give toast message
        if (e.currentTarget.password.value !== e.currentTarget.confirmPassword.value) {
            toast.error("Le mot de passe et la confirmation du mot de passe ne sont pas identiques");

        } else {
            baseAxios.post('/api/users/reset/password', { email, password: e.currentTarget.password.value })
                .then((res) => {
                    console.log(res);
                    toast.success(res?.data?.message);
                    navigate(`/auth/signin`);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err.response.data.message);
                });
            
        }


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
                            src="https://i.ibb.co/FHDwr1r/Group-2.png"
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

                        Se connecter
                    </h1>
                    <h1 className="text-2xl font-semibold mb-4">Mettre à jour le mot de passe</h1>
                    <p className="mb-5">Entrez votre nouveau mot de passe ici</p>
                    <form onSubmit={handleUpdatePassword}>
                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600">
                            Nouveau mot de passe
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        {/* Password Input */}
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-600">
                            Confirmez le mot de passe
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                                autoComplete="off"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white font-semibold rounded-md flex justify-center mx-auto px-[100px] py-3"
                        >
                            Mise à jour
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdatePass