import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header: {
      fontSize: 20,
      marginBottom: 10,
      textAlign: 'center',
      color: 'black',
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
});

const PDFGenerator = ({ data }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Historial de Bienes</Text>
          {data.map((item, index) => (
            <View key={index}>
              <Text style={styles.text}>Nombre: {item.nombre}</Text>
              <Text style={styles.text}>Modelo: {item.modelo}</Text>
              <Text style={styles.text}>Estado: {item.estado}</Text>
              <Text style={styles.text}>Fecha: {item.fecha}</Text>
              <Text style={styles.text}>-----------------------------</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
);

export default PDFGenerator;    
