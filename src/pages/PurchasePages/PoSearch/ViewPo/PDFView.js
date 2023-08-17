import react from 'react'
import PoPdf from './PoPdf'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import Header from './Header';

function PDFView(props) {
  const fileName = "Invoice.pdf"
    return(
      <PDFViewer width={800} height={500} showToolbar={false}>
        <PoPdf/>
      </PDFViewer>
    )
}

export default PDFView;

{/* <div className={classes.downloadLink}>
        <PDFDownloadLink
          document={<PoPdf/>}
          fileName={"fileName.pdf"}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading..." : "Download Invoice"
          }
        </PDFDownloadLink>
      </div> */}