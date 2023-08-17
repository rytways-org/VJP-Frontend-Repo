import React from 'react'
import Table from 'react-bootstrap/Table';

function DisplaySpecifications(props) {
    const getGrouped = array => {
        let result = [],
            i = 0;
        
        while (i < array.length) result.push(array.slice(i, i += 2));

        return result;
    };
    
    const renderFields = (specifications) => {
        const fields = specifications;
        const fieldsKeys=getGrouped(Object.keys(fields));

       // const finalContents=content(fieldsKeys,fields)
   
        return (
            fieldsKeys.map((row, idx) => (
                <tr key={idx}>    
                  { row.map( fieldName => <><td key={fieldName} className="col-md-3">{ fieldName }</td> 
                    <td key={fieldName} className="col-md-3">{ fields[fieldName] }</td> </>)}
                </tr> )
            )
        )
    }
  return (
   
    <div>
      <Table striped>
      <thead>
          <tr>
          <th className="col-md-3">Specifications</th>
          <th className="col-md-3">Value</th>
          <th className="col-md-3">Specifications</th>
          <th className="col-md-3">Value</th>
          </tr></thead>
          <tbody>
             {renderFields(props.specifications)} 
          </tbody>
          </Table>
    </div>
  )
}

export default DisplaySpecifications
