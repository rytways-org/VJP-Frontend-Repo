import React from "react";
import { Page, Document, StyleSheet, Image,View } from "@react-pdf/renderer";
import Header from './Header'

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
        lineHeight: 1.5,
    }
});

const PoPdf = (props) => {
    return(
        <Document>
            <Page size="A4" style={styles.page} >
             <Header></Header>
            </Page>
        </Document>
    )
}

export default PoPdf