import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import Modal from '../../../../UI/Modal/Modal';
import IcTable from './IcTable';
import PackingTable from '../PTable/PackingTable';

const PtcTable = () => {

  const [showModal, setShowModal] = useState(false);
  const showPTableHandler = () => {
    console.log('showIcTableHandler called');
    setShowModal(true);
  };
  
  const hideModalHandler = () => {
    setShowModal(false);
  };
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    textAlign: 'center',
    margin: '20px',
    backgroundColor: 'rgb(242, 242, 242)',
    border: '1px solid rgb(177, 191, 195)', 
    
    
  };
    
  const thStyle = {
    backgroundColor: 'rgb(0, 92, 185)',
    height: '50px',
    color: 'white', 
    border: '1px solid rgb(177, 191, 195)',
    
  };
    
      const tStyle = {
        border: '1px solid rgb(177, 191, 195)',
        backgroundColor: '#f01831'
      };
      const trStyle = {
        
        border: '1px solid rgb(177, 191, 195)'
      };
      const oddRowStyle = {
        backgroundColor: '#FFFFFF', // Background color for odd rows
      };
      const inputStyle = {
        border: 'none', 
        borderBottom: '1px solid #000', 
        background: 'transparent', 
        borderRadius: '0', 
        outline: 'none', 
        boxShadow: 'none',
        height: '15px',
        textAlign: 'center'
      };
      const tdBorderStyle = {
        border: '1px solid rgb(177, 191, 195)', 
      };
      
      const firstColumnStyle = {
        ...tdBorderStyle,
        cursor: 'pointer',
        backgroundColor: '#1d2430',
        color: 'white',
        width:'20vw',
        textAlign: 'left', 
      };
  return (
    <>
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={{...thStyle, ...tdBorderStyle}}>Description</th>
          <th style={thStyle}>Cost</th>
          <th style={thStyle}>Calculate</th>
        </tr>
      </thead>
      <tbody>
        <tr style={trStyle}>
          <td style={firstColumnStyle}>Packing</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle} />
          </td>
          <td onClick={showPTableHandler}>Icon</td>
        </tr>
        <tr style={{ ...trStyle, ...oddRowStyle }}>
          <td style={firstColumnStyle}>Transport</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle} />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle} />
          </td>
        </tr>
             </tbody>
      </table>
      {showModal && (
        <Modal onClose={hideModalHandler} width="50%" >
          <PackingTable />
        </Modal>
      )}
    </>
  );
};

export default PtcTable;








