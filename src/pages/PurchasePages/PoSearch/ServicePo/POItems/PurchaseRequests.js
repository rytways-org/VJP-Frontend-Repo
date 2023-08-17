import react,{useState} from 'react'
import Table from '../../../../../Components/tables/Table'
import SimpleCard from '../../../../../UI/cards/SimpleCard'
import PORequestsTable from './PoRequestsTable'


export const PurchaseRequests=(props)=>{

    const handleEdit = (changedvalue,mulReq)=>{
        props.handleEditRequests("QuantityEdit",changedvalue,mulReq,props.rowData)
    }
    console.log(props.matReqs)
    const [table,setTable] = useState()
    return(
        <SimpleCard>
            <Table data={props.matReqs} cols={PORequestsTable(handleEdit,props.isDefault)}/>
         </SimpleCard>
    )
}

export default PurchaseRequests