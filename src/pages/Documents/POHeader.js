import React from "react";
import { Text, View, StyleSheet , Image,Font} from "@react-pdf/renderer";
import classes from "./POheader.module.css";
import POOrderLogo from "../../images/VJPLogo.jpg";
import { grid } from "@mui/system";

Font.register({
    family: "Roboto",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
  });


const styles = StyleSheet.create({
    parent : {
        border: "1px solid black",
        margin: "1rem",
        padding: "2rem 2rem",
        textAlign: "center",
        
      },
    page: {
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        lineHeight: 1.5,
        flexDirection: 'column',

    },
    logo: {
        marginTop: 14,
        width: 84,
        height: 70,
        marginLeft: 4,
        marginRight: 4,
        objectPosition: "left",
        display: "inline-block",
       
    },
    titleContainer: {
        marginTop: 6,
        color: '#000000',
        letterSpacing: 1,
        fontSize: 8,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily:"Roboto",
       
    },
    titleContainer1: {
        marginTop: 2,
        color: '#000000',
        letterSpacing: 1,
        fontSize: 4,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily:"Roboto",
       
    },
    titleConta: {
        display: "inline-block",
       
    }
});

const POHeader = ({ title }) => (
  <View style={styles.parent}> 
      <Image  src={POOrderLogo} style={styles.logo} size={4}>
          </Image>
          <Text style={styles.titleConta}>
     <Text style={styles.titleContainer}>
            VEE J PEE Aluminium Foundry Private Limited
            {'\n'}</Text>
            <Text style={styles.titleContainer1}>  Registered Office: No. 9, Sowripalayam Road, Opposite Sujini Mills,
            Coimbatore 641 028
            {'\n'}
            Factory: SF No 162/2A 12 East, Chennappa Chetty Pudur Post,
            Padhuvampalli Village, {'\n'}
            Coimbatore 641 659, Tamil Nadu {'\n'}
            Phone: +91 422 2319777, Fax: +91 422 2314000, Email: purchase@vjp.in
            {'\n'}
            PAN: AACCV7072Q GSTIN: 33AACCV7072Q1ZR CIN: U26999TZ2002PTC010140
            {'\n'}
            Purchase Order
          </Text> </Text>
  </View>
);

export default POHeader;
