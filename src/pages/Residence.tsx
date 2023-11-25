
import { useState } from 'react'
import CardFour from '../components/CardFour'
import CardOne from '../components/CardOne'
import CardThree from '../components/CardThree'
import CardTwo from '../components/CardTwo'
import TableTwo from '../components/TableTwo'

function Residence() {
  const [statusData, setStatusData] = useState<any[]>([]);
  console.log(statusData);
  return (
    <div>
      <div className="grid grid-cols-1 mb-10 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardFour statusData={statusData} />
        <CardOne statusData={statusData} />
        <CardTwo statusData={statusData} />
        <CardThree statusData={statusData} />
      </div>
      <TableTwo setStatusData={setStatusData} title="Résidence" type="all" />
    </div>
  )
}

export default Residence