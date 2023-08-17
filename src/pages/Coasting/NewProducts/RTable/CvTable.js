import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import Modal from '../../../../UI/Modal/Modal';
import IcTable from './IcTable';
import MoldSandTable from '../PTable/MoldSandTable';
import SandCoreTable from '../PTable/SandCoreTable';
import HeatTreatmentTable from '../PTable/HeatTreatmentTable';
import ShotBlostTable from '../PTable/ShotBlostTable';
const CvTable = () => {

  
  const [showModal, setShowModal] = useState(false);
  
  const [isSandCoreTableVisible, setIsSandCoreTableVisible] = useState(false);
  const [isHTTableVisible, setHTTableVisible] = useState(false); 
  const [isSBTableVisible, setSBTableVisible] = useState(false); 
  

  const showIcTableHandler = () => {
    console.log('showIcTableHandler called');
    setShowModal(true);
  };

  const showSCTableHandler = () => {
    setIsSandCoreTableVisible(true); // Similar to showIcTableHandler, you can show the modal
  };
  const showHtTableHandler = () => {
    setHTTableVisible(true); // Similar to showIcTableHandler, you can show the modal
  };
  const showSBTableHandler = () => {
    setSBTableVisible(true); // Similar to showIcTableHandler, you can show the modal
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
              <td style={firstColumnStyle}>Mold Sand</td>
              <td style={tdBorderStyle}>
                
                <FormControl type="text" style={inputStyle} />
              </td>
              <td onClick={showIcTableHandler}>Icon</td>
            </tr>
            <tr style={{ ...trStyle, ...oddRowStyle }}>
              <td style={firstColumnStyle}>Sand Core</td>
              <td>
                
                <FormControl type="text" style={inputStyle} />
              </td>
              <td style={tdBorderStyle} onClick={showSCTableHandler}>(Icon1)</td>
             
            </tr>
            <tr style={trStyle}>
              <td style={firstColumnStyle}>Consumables</td>
              <td style={tdBorderStyle}>
                
                <FormControl type="text" style={inputStyle} />
              </td>
              <td>
                
                <FormControl type="text" style={inputStyle} />
              </td>
            </tr>
            <tr style={{ ...trStyle, ...oddRowStyle }}>
              <td style={firstColumnStyle}>Conversion</td>
              <td style={tdBorderStyle}>
                
                <FormControl type="text" style={inputStyle} />
              </td>
              <td>
                
                <FormControl type="text" style={inputStyle} />
              </td>
            </tr>
            <tr style={trStyle}>
              <td style={firstColumnStyle}>Heat Treatment</td>
              <td style={tdBorderStyle}>
                
                <FormControl type="text" style={inputStyle} />
              </td>
              <td onClick={showHtTableHandler}>Get</td>   
            </tr>
            <tr style={{ ...trStyle, ...oddRowStyle }}>
              <td style={firstColumnStyle}>Shot Blasting</td>
              <td style={tdBorderStyle}> 
                
                <FormControl type="text" style={inputStyle} />
              </td>
              <td onClick={showSBTableHandler}>Get</td>
            </tr>
            <tr style={trStyle}>
              <td style={firstColumnStyle}>Aluminum Oxide Blasting</td>
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
             <MoldSandTable />
            
             
            </Modal>
          )}
{isSandCoreTableVisible && (
            <Modal onClose={hideModalHandler} width="50%" >
             
            <SandCoreTable />
              
               
            </Modal>
          )}
          {isHTTableVisible && (
            <Modal onClose={hideModalHandler} width="50%" >
             
            <HeatTreatmentTable />
              
               
            </Modal>
          )}
          {isSBTableVisible && (
            <Modal onClose={hideModalHandler} width="50%" >
             
            <ShotBlostTable />
              
               
            </Modal>
          )}

        </>
      );
    };
export default CvTable;
