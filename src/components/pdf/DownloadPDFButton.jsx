import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFGenerator from './PDFGenerator';

const DownloadPDFButton = ({ data }) => (
  <PDFDownloadLink document={<PDFGenerator data={data} />} fileName="historial_bienes.pdf">
    {({ blob, url, loading, error }) => (
        <button className="boton">
            {loading ? 'Generando PDF...' : 'Descargar Reporte'}
        </button>
    )}
  </PDFDownloadLink>
);

export default DownloadPDFButton;