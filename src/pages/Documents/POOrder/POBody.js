import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';


const POBody = ({ invoice }) => (
    <Fragment>
        <View style={styles.invoiceNoContainer}>
            <Text style={styles.label}>Invoice No:</Text>
            <Text style={styles.invoiceDate}>{invoice.invoice_no}</Text>
        </View >
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Date: </Text>
            <Text >{invoice.trans_date}</Text>
        </View >
    </Fragment>
);

export default POBody;