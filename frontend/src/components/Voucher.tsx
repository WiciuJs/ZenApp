import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import scssStyles from '../styles/Voucher.module.scss';



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
        const pdf = new jsPDF('p', 'mm', 'a5');
        pdf.addImage(imgData, 'PNG', 0, 0, 148, 210);
        pdf.save('voucher.pdf');
      });
    }
  };

  return (
    <div className={scssStyles['voucher-container']}>
      <div className={scssStyles['voucher-form-container']}>
        <h1 className={scssStyles['voucher-header']}>Voucher Generator</h1>
        <form className={scssStyles['voucher-form']}>
          <label className={scssStyles['voucher-label']} htmlFor="firstName">
            Imię:
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={scssStyles['voucher-input']}
              onChange={handleInputChange}
            />
          </label>
          <label className={scssStyles['voucher-label']} htmlFor="lastName">
            Nazwisko:
            <input
              type="text"
              id="lastName"
              name="lastName"
              className={scssStyles['voucher-input']}
              onChange={handleInputChange}
            />
          </label>
          <label className={scssStyles['voucher-label']} htmlFor="massageType">
            Rodzaj masażu:
            <input
              type="text"
              id="massageType"
              name="massageType"
              className={scssStyles['voucher-input']}
              onChange={handleInputChange}
            />
          </label>
          <label className={scssStyles['voucher-label']} htmlFor="date">
            Data:
            <input
              type="date"
              id="date"
              name="date"
              className={scssStyles['voucher-input']}
              onChange={handleInputChange}
            />
          </label>
          <button className={scssStyles['voucher-button']} onClick={generatePDF}>
            Generuj PDF
          </button>
        </form>
      </div>
      <div id="voucher-content" className={scssStyles['voucher-pdf-preview']}>
        <PDFViewer width="100%" height="100%">
          <Document>
            <Page size="A5" style={styles.page}>
              <View style={styles.section}>
                <Text>{formData.firstName} {formData.lastName}</Text>
                <Text>{formData.massageType}</Text>
                <Text>{formData.date}</Text>
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
    backgroundSize: 'cover',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default Voucher;