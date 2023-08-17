import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import Modal from '../../../../UI/Modal/Modal';


const IcTable = () => {

  
  
 
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
          <td style={firstColumnStyle}>Part Weight</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle} />
          </td>
          <td >Icon</td>
        </tr>
        <tr style={{ ...trStyle, ...oddRowStyle }}>
          <td style={firstColumnStyle}>No. Pieces</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle} />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle} />
          </td>
        </tr>
        <tr style={trStyle}>
          <td style={firstColumnStyle}>Alloy Grade</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle} />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle} />
          </td>
        </tr>
        <tr style={{ ...trStyle, ...oddRowStyle }}>
          <td style={firstColumnStyle}>Alloy Rate</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle} />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle} />
          </td>
        </tr>
        <tr style={trStyle}>
          <td style={firstColumnStyle}>Shot Weight</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle} />
          </td>
          <td >Get</td>
        </tr>
        <tr style={{ ...trStyle, ...oddRowStyle }}>
          <td style={firstColumnStyle}>As Cast Weight</td>
          <td style={tdBorderStyle}> 
            
            <FormControl type="text" style={inputStyle} />
          </td>
          <td >Get</td>
        </tr>
        <tr style={trStyle}>
          <td style={firstColumnStyle}>Raw Material</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle} />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle} />
          </td>
        </tr>
        <tr style={{ ...trStyle, ...oddRowStyle }}>
          <td style={firstColumnStyle}>Machining Scrap Generation Gain</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle} />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle} />
          </td>
        </tr>
        <tr style={trStyle}>
          <td style={firstColumnStyle}>Melting Loss 6%</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle} />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle} />
          </td>
        </tr>
        <tr style={{ ...trStyle, ...oddRowStyle }}>
          <td style={firstColumnStyle}>Total</td>
          <td style={{...tStyle, ...tdBorderStyle}}>#Tot Cost RM</td>
           <td>
            
            <FormControl type="text" style={inputStyle} />
          </td>
          
        </tr>
      </tbody>
      </table>
      
    </>
  );
};

export default IcTable;








