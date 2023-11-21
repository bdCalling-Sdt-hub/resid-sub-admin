import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb';

function ResidenceDetails() {
    let { id } = useParams();
    console.log(id)
    return (
        <>

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="py-6 px-4 md:px-6 xl:px-7.5">
                    <Breadcrumb pageName="Residence Details" />
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Residence List
                    </h4>
                    <div>ResidenceDetails id : {id}</div>

                </div>
            </div>

        </>
    )
}

export default ResidenceDetails