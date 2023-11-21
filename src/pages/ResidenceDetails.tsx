import { useParams } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb';

function ResidenceDetails() {
    let { id } = useParams();
    console.log(id)
    return (
        <>
            <Breadcrumb pageName="Residence Details" />
            <div>ResidenceDetails id : {id}</div>
        </>
    )
}

export default ResidenceDetails