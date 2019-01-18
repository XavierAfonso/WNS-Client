import React, { Component,  } from 'react'; //PropTypes
import PDFObject from '../pdfobject';

class PdfViewer extends Component {
  componentDidMount() {
    const { pdfBlob, containerId } = this.props;

    PDFObject.embed(pdfBlob, `#${containerId}`);
  }

  render() {
    const { width, height, containerId } = this.props;
    console.log(containerId);
    return <div style={{ width, height }} id={containerId} />;
  }
}

PdfViewer.defaultProps = {
  width: '100%',
  height: '100%',
  containerId: 'pdf-viewer',
};

export default PdfViewer;