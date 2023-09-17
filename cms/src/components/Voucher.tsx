import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../styles/Voucher.scss'; 

const Voucher = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    massageType: '',
    date: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePDF = () => {
    const input = document.getElementById('voucher-content');

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
        pdf.save('voucher.pdf');
      });
    }
  };

  return (
    <div className="voucher-container">
      <h1 className="voucher-header">Voucher Generator</h1>
      <form className="voucher-form">
        <label className="voucher-label" htmlFor="firstName">
          Imię:
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="voucher-input"
            onChange={handleInputChange}
          />
        </label>
        <label className="voucher-label" htmlFor="lastName">
          Nazwisko:
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="voucher-input"
            onChange={handleInputChange}
          />
        </label>
        <label className="voucher-label" htmlFor="massageType">
          Rodzaj masażu:
          <input
            type="text"
            id="massageType"
            name="massageType"
            className="voucher-input"
            onChange={handleInputChange}
          />
        </label>
        <label className="voucher-label" htmlFor="date">
          Data:
          <input
            type="date"
            id="date"
            name="date"
            className="voucher-input"
            onChange={handleInputChange}
          />
        </label>
      </form>
      <button className="voucher-button" onClick={generatePDF}>
        Generuj PDF
      </button>
      <div id="voucher-content" className="voucher-pdf-preview">
        <PDFViewer width={400} height={400}>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>{formData.firstName} {formData.lastName}</Text>
                <Text>Rodzaj masażu: {formData.massageType}</Text>
                <Text>Data: {formData.date}</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default Voucher;
