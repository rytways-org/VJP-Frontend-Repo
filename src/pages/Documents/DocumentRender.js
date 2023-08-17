import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import classes from "./POheader.module.css";
import PdfDocument from './POorder';

const DocumentRender = ({ invoicedata }) => {
    const fileName = "Invoice.pdf";

  return (
    <div className={classes.App}>
      <PDFViewer width={800} height={500} showToolbar={false}>
        <PdfDocument invoicedata={[]} />
      </PDFViewer>
    </div>
  );
}

export default DocumentRender;