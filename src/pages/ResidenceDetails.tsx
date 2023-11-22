import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb';
import { useEffect, useState } from 'react';
import baseAxios from '../../Config';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

function ResidenceDetails() {
    let { id } = useParams();

    const [data, setData] = useState<any>();
    let token = localStorage.getItem("token");

    console.log(data);

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
            .catch((err) => {
                console.log(err);
            })
    }, []);


    return (
        <>

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="py-6 px-4 md:px-6 xl:px-7.5">
                    <Breadcrumb pageName="Residence Details" />
                    <div className='text-xl md:text-2xl  font-extrabold flex items-center '><h1>Name : {data?.residenceName} </h1><span className={`ml-2 mt-2 text-sm text-black ${data?.acceptanceStatus === "pending" && 'bg-meta-6'} ${data?.acceptanceStatus === "accepted" && 'bg-success'} ${data?.acceptanceStatus === "blocked" && 'bg-meta-1'}  p-[2px] rounded-xl px-3  dark:text-white`}>{
                        data?.acceptanceStatus === "pending" ? "Pending" :
                            data?.acceptanceStatus === "accepted" ? "Accepted" :
                                data?.acceptanceStatus === "blocked" ? "Blocked" : <></>
                    }</span></div>

                    <div className="px-1 my-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-3 grid-cols-gallery ">
                        {data?.photo?.map((item: any) => (
                            <Zoom key={item?._id}>
                                <img className='w-[250px] h-[150px] rounded-xl ' src={item?.publicFileUrl} alt="" />
                            </Zoom>
                        ))}

                    </div>
                    <div>Residence About : {data?.aboutResidence}</div>
                    <div>Ratings : {data?.ratings || 0.0}</div>
                    <div>Daily Amount : ${data?.dailyAmount}</div>
                    <div>Hourly Amount : ${data?.hourlyAmount}</div>
                    <div>Category : {data?.category.translation.en}</div>
                    <div>Capacity : {data?.capacity}</div>
                    <div>Beds : {data?.beds}</div>
                    <div>Baths : {data?.baths}</div>
                    <div>Popularity : {data?.popularity}</div>
                    <div>Municipality : {data?.municipality}</div>
                    <div>Quirtier : {data?.quirtier}</div>
                    <div className='flex'>
                        Amenities : {data?.amenities?.map((item: any) => (
                            <div key={item?.translation?.en}> {item?.translation?.en}, </div>
                        ))}
                    </div>

                    <p className='text-black dark:text-white font-bold mt-5'>Owner Information:</p>
                    <div>Owner Name : {data?.ownerName}</div>
                    <div>Owner About : {data?.aboutOwner}</div>
                    <div>Address : {data?.address}</div>
                    <div>City : {data?.city}</div>

                    <div className='mt-5'>
                        <p className='text-black dark:text-white font-bold'>Host Information:</p>
                        <p>Host Name : {data?.hostId?.fullName}</p>
                        <p>Host Email : {data?.hostId?.email}</p>
                        <p>Host Address : {data?.hostId?.address}</p>
                        <p>Host Phone Number : {data?.hostId?.phoneNumber}</p>
                    </div>

                </div>
            </div>

        </>
    )
}

export default ResidenceDetails