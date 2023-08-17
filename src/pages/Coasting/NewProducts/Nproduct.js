import React from 'react';
import { FormControl } from 'react-bootstrap';

const Nproduct = ({ showRmTableHandler,showCvTableHandler,showPrTableHandler,
  showMcTableHandler,showQcTableHandler,showOscTableHandler,showOvTableHandler,showPtcTableHandler, actions }) => {
  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    textAlign: 'center',
    margin: '20px',
    backgroundColor: 'rgb(242, 242, 242)',
    border: '1px solid rgb(177, 191, 195)', 
    borderRight: '1px solid rgb(177, 191, 195)',
    
  };

  const thStyle = {
    backgroundColor: 'rgb(0, 92, 185)',
    
    color: 'white', 
    
  };

  const cStyle = {
    
    backgroundColor: '#fa0522'
  };
  const trStyle = {
    border: '1px solid rgb(177, 191, 195)',
    height: '10px', // Increase the height here as needed
  };
  const oddRowStyle = {
    backgroundColor: '#FFFFFF', // Background color for odd rows
  };

  const inputStyle = {
    
    
    border: 'none', // Remove the border
    borderBottom: '1px solid #000', // Add an underline border
    background: 'transparent', // Make the background transparent
    borderRadius: '0', // Remove border radius
    outline: 'none', // Remove outline on focus mode
    boxShadow: 'none',
    
    height: '15px',
    textAlign: 'center'
  };
  const tdBorderStyle = {
    border: '1px solid rgb(177, 191, 195)', // White right border for all td elements
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
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={{ ...thStyle, ...tdBorderStyle }}>Contribution Statement</th>
          <th style={{ ...thStyle, ...tdBorderStyle }}>Normal Contribution</th>
          
              
          <th style={thStyle}>With Loading factor</th>
        </tr>
      </thead>      <tbody>
      <tr style={{ ...trStyle, ...oddRowStyle }}>
      <td onClick={showRmTableHandler}  style={firstColumnStyle}>RM Cost - RMC</td>
          <td style={{ ...cStyle, ...tdBorderStyle }}>#Tot Cost RM
</td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={trStyle}>
          <td onClick={showPrTableHandler}  style={firstColumnStyle} >Purchase Cost - PC</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={{ ...trStyle, ...oddRowStyle }}>
          <td onClick={showCvTableHandler}  style={firstColumnStyle}>As Cast Variable Cost</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={trStyle}>
          <td onClick={showMcTableHandler} style={firstColumnStyle}>Machining Cost </td>
          <td   style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={{ ...trStyle, ...oddRowStyle }}>
          <td onClick={showQcTableHandler}  style={firstColumnStyle} >Quality Cost</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={trStyle}>
          <td  onClick={showOscTableHandler} style={firstColumnStyle} >Out Sourcing Cost </td>
          <td  style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={{ ...trStyle, ...oddRowStyle }}>
          <td onClick={showOvTableHandler} style={firstColumnStyle}>Other Variable </td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={trStyle}>
          <td onClick={showPtcTableHandler}  style={firstColumnStyle}>Packing & Transport Cost </td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={{ ...trStyle, ...oddRowStyle }}>
          <td  style={firstColumnStyle} >Total Variable Cost</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={trStyle}>
          <td  style={firstColumnStyle} >Rejection Cost </td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={{ ...trStyle, ...oddRowStyle }}>
          <td style={firstColumnStyle}>Interest Cost on Receivables </td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={trStyle}>
          <td style={firstColumnStyle}>Die Amortization Cost </td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={{ ...trStyle, ...oddRowStyle }}>
          <td style={firstColumnStyle}>Total Cost - RMC </td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={trStyle}>
          <td  style={firstColumnStyle}>Net Realization Price</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={{ ...trStyle, ...oddRowStyle }}>
          <td style={firstColumnStyle} >Contribution = Net Realization Price - Total Cost</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
        <tr style={trStyle}>
          <td  style={firstColumnStyle}>Contribution % = Contribution / Total Cost</td>
          <td style={tdBorderStyle}>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
          <td>
            
            <FormControl type="text" style={inputStyle}  />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Nproduct;
