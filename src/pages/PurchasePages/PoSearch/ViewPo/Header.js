import react from 'react'
import { Text, View, StyleSheet,Image } from '@react-pdf/renderer';
import logo from "../../../../images/VJPLogo.jpg";
import { borderColor } from '@mui/system';

function Header(props){
    const styles = StyleSheet.create({
        row1:{
            border: '1pt',
            borderColor:'#000',
            borderStyle:'solid',
            height:'10vh',
            flexDirection: "row",
            display:'flex'
        },
        colLogo:{
          width: 20,
          height: 70,
              borderRight: '1pt',
            borderColor:'#000',
            borderStyle:'solid',
            paddingTop:'3vh',
            flex:1
             
        }
        ,colCompanyDetails :{
          width:'100%',
          },
          colCompanyDetailsPre:{
            
          },bold: {
            fontWeight: '600',
            textAlign:'center'
          },l1 :{
            fontSize: '1.5',
          },l2 :{
            fontSize: '1',
          }


    })
    return(
        <View style={styles.row1}>
          <Image src={logo} style={ ` ${styles.colLogo}`} />
         <View style={ `${styles.colCompanyDetails}`}>
 <Text style={`${styles.bold} ${styles.l1}`}>VEE J PEE Aluminium Foundry Private Limited</Text>{"\n"}
<Text style={`${styles.bold} ${styles.l2}`}>Registered Office:</Text> No. 9, Sowripalayam Road, Opposite Sujini Mills, Coimbatore 641 028
<Text style={`${styles.bold} ${styles.l1}`}>Factory:</Text> SF No 162/2A 12 East, Chennappa Chetty Pudur Post, Padhuvampalli Village,
Coimbatore 641 659, Tamil Nadu
Phone: +91 422 2319777, Fax: +91 422 2314000, Email: purchase@vjp.in
<Text style={`${styles.bold} ${styles.l1}`}>PAN:</Text> AACCV7072Q    <Text style={`${styles.bold} ${styles.l1}`}>GSTIN:</Text> 33AACCV7072Q1ZR  
  <Text style={`${styles.bold} ${styles.l1}`}>CIN:</Text> U26999TZ2002PTC010140
<Text style={`${styles.bold} ${styles.l1}`}>Service Purchase Order</Text>
        </View>
      </View>
    )
}

export default Header