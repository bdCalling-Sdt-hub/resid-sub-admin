import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb';
import { useEffect, useState } from 'react';
import baseAxios from '../../Config';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';


function ResidenceDetails() {
    let { id } = useParams();
    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    const [data, setData] = useState<any>();
    const [open, setOpen] = useState(false);
    const [feedback, setFeedback] = useState("");

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    useEffect(() => {
        baseAxios.get(`/api/residences/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => {
                setData(res.data.data.attributes.residences);

            })
            .catch((error) => {
                console.log(error);
                if (
                    "You are not authorised to sign in now" === error.response.data.message || "Error authorization" === error.response.data.message
                ) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("yourInfo");
                }

            })
    }, []);

    const handleAccept = () => {
        baseAxios.put(`/api/residences/${id}`, { acceptanceStatus: "accepted" },
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => {
                navigate(`/residence`)
                toast.success("Accepted successfully");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                console.log(error);
                if (
                    "You are not authorised to sign in now" === error.response.data.message || "Error authorization" === error.response.data.message
                ) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("yourInfo");
                }

            })
    }

    const handleBlock = () => {
        if (!feedback) return toast.error("Please enter your feedback")
        baseAxios.put(`/api/residences/${id}`, { acceptanceStatus: "blocked", feedBack: feedback },
            {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            }
        )
            .then((res) => {
                navigate(`/residence`)
                toast.success("Blocked successfully");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                console.log(error);
                if (
                    "You are not authorised to sign in now" === error.response.data.message || "Error authorization" === error.response.data.message
                ) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("yourInfo");
                }

            })
    }



    return (
        <>

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="py-6 px-4 md:px-6 xl:px-7.5">
                    <Breadcrumb pageName="Détails de la résidence" />
                    <div className='text-xl md:text-2xl  font-extrabold flex items-center '><h1> {data?.residenceName} </h1><span className={`ml-2 mt-2 text-sm text-black ${data?.acceptanceStatus === "pending" && 'bg-meta-6'} ${data?.acceptanceStatus === "accepted" && 'bg-success'} ${data?.acceptanceStatus === "blocked" && 'bg-meta-1'}  p-[2px] rounded-xl px-3  dark:text-white`}>{
                        data?.acceptanceStatus === "pending" ? "En attente" :
                            data?.acceptanceStatus === "accepted" ? "Accepté" :
                                data?.acceptanceStatus === "blocked" ? "Bloqué" : <></>
                    }</span></div>

                    <div className="px-1 my-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-3 grid-cols-gallery ">
                        {data?.photo?.map((item: any) => (
                            <Zoom key={item?._id}>
                                <img className='w-[250px] h-[150px] rounded-xl ' src={item?.publicFileUrl} alt="" />
                            </Zoom>
                        ))}

                    </div>


                    <div>Résidence À propos : {data?.aboutResidence}</div>
                    <div>Notes : {data?.ratings || 0.0}</div>
                    <div>Montant quotidien : ${data?.dailyAmount}</div>
                    <div>Montant horaire : ${data?.hourlyAmount}</div>
                    <div>Catégorie : {data?.category?.translation?.en}</div>
                    <div>Capacité : {data?.capacity}</div>
                    <div>Des lits : {data?.beds}</div>
                    <div>Thermes : {data?.baths}</div>
                    <div>Popularité : {data?.popularity}</div>
                    <div>Municipalité : {data?.municipality}</div>
                    <div>Plus bizarre : {data?.quirtier}</div>
                    <div className='flex flex-wrap'>
                    Agréments  :&nbsp;{data?.amenities?.map((item: any) => (
                            <div key={item?.translation?.fr}> {item?.translation?.fr},&nbsp;</div>
                        ))}
                    </div>

                    <p className='text-black dark:text-white font-bold mt-5'>Informations sur le propriétaire :</p>
                    <div>Le nom du propriétaire : {data?.ownerName}</div>
                    <div>Propriétaire À propos : {data?.aboutOwner}</div>
                    <div>Adresse : {data?.address}</div>
                    <div>Ville : {data?.city}</div>

                    <div className='mt-5'>
                        <p className='text-black dark:text-white font-bold'>Informations sur l'hôte:</p>
                        <p>Nom d'hôte : {data?.hostId?.fullName}</p>
                        <p>E-mail de l'hôte : {data?.hostId?.email}</p>
                        <p>Adresse de l'hôte : {data?.hostId?.address}</p>
                        <p>Numéro de téléphone de l'hôte : {data?.hostId?.phoneNumber}</p>
                    </div>
                    <br />
                    {data?.feedBack && <p className='font-extrabold dark:text-white text-black'>Commentaires de l'administrateur : <span className='text-meta-1 font-extrabold'>{data?.feedBack}</span></p>}

                    {data?.acceptanceStatus === "pending" ? <div className='flex gap-2 justify-center items-center mt-5'><button onClick={handleAccept} className='bg-meta-3 text-white rounded-md px-5 py-[1.5px]'>Accept</button> <button onClick={e => setOpen(!open)} className='bg-meta-1 text-white rounded-md px-5 py-[1.5px]'>Bloc</button></div> : data?.acceptanceStatus === "accepted" ? <div className='flex gap-2 justify-center items-center mt-5'> <button onClick={e => setOpen(!open)} className='bg-meta-1 text-white rounded-md px-5 py-[1.5px]'>Bloc</button></div> : <div className='flex gap-2 justify-center items-center mt-5'><button onClick={handleAccept} className='bg-meta-3 text-white rounded-md px-5 py-[1.5px]'>Accepter</button></div>}

                    <Modal open={open} onClose={onCloseModal} center>
                        <div className='p-10 flex flex-col gap-2'>
                            <input type="text" placeholder='Enter your feedback' value={feedback} onChange={e => setFeedback(e.target.value)} className='border-2 px-3 py-2 border-meta-1' />
                            <button onClick={handleBlock} className='bg-meta-3 py-[1px] rounded-md text-white mt-3'>Soumettre</button>
                        </div>
                    </Modal>
                </div>
            </div>

        </>
    )
}

export default ResidenceDetails