import React, {useCallback, useEffect } from "react";
// import {Formik, Field, ErrorMessage} from "formik";
// import * as Yup from "yup";
import {useDropzone} from "react-dropzone";
import "./uploadSignature.css";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
// import Webcam from "react-webcam";
import {Document, Page, pdfjs} from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const UploadSignature = () => {
  const [numPages, setNumPages] = React.useState(null);
  // const [openbox, setOpenbox] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);
  const [writeName, setWriteName] = React.useState(null);
  const [scale, setScale] = React.useState(1.2);
  const [value, setValue] = React.useState("1");
  const [pdfBytes, setPdfBytes] = React.useState(null);

  

  useEffect(()=>{
    // modifyPdf();
    embedImages();

  },[])
 
    const modifyPdf = async () => {
      const url = 'assets/uploads/file2.pdf';
      try {
        const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();
        firstPage.drawText('Hello', {
          x: 480,
          y: height / 2 + 180,
          size: 8,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          rotate: degrees(0),
        });

        const pdfBytes = await pdfDoc.save();
        setPdfBytes(pdfBytes);
        console.log('PDF modification completed.');
      } catch (error) {
        console.error('Error modifying PDF:', error);
      }
    };

   
    


  const embedImages = async () => {
    const jpgUrl = 'assets/images/digital-signature.png';
    // const pngUrl = 'https://pdf-lib.js.org/assets/minions_banana_alpha.png';

    try {
      const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());
      // const pngImageBytes = await fetch(pngUrl).then((res) => res.arrayBuffer());

      const pdfDoc = await PDFDocument.create();

      const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
      // const pngImage = await pdfDoc.embedPng(pngImageBytes);

      const jpgDims = jpgImage.scale(0.5);
      // const pngDims = pngImage.scale(0.5);

      const page = pdfDoc.addPage();

      page.drawImage(jpgImage, {
        x: page.getWidth() / 2 - jpgDims.width / 2,
        y: page.getHeight() / 2 - jpgDims.height / 2 + 250,
        width: 100, // Adjusted width
        height: 100, // Adjusted height
      });
      // page.drawImage(pngImage, {
      //   x: page.getWidth() / 2 - pngDims.width / 2 + 75,
      //   y: page.getHeight() / 2 - pngDims.height + 250,
      //   width: 100, // Adjusted width
      //   height: 100, // Adjusted height
      // });

      const modifiedPdfBytes = await pdfDoc.save();
      setPdfBytes(modifiedPdfBytes);
    } catch (error) {
      console.error('Error embedding images:', error);
    }
  };

  embedImages();

  const handleSavePdf = () => {
    if (!pdfBytes) return;

    const uint8Array = new Uint8Array(pdfBytes);
    const blob = new Blob([uint8Array], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'modified_pdf.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const handleChange_123 = (event, newValue) => {
    setValue(newValue);
    
  };
 
  // console.log(error)
  // const handleZoomIn = () => {
  //   setScale(scale + 0.1);
  // };

  // const handleZoomOut = () => {
  //   setScale(scale - 0.1);
  // };

  const onDrop = useCallback((acceptedFiles) => {
    const valid = typeValidator(acceptedFiles[0]);
    if (valid.code) {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const binaryStr = reader.result;
          setPreview(binaryStr);
          setError(null);
          setFileName(acceptedFiles[0].name);
          setWriteName(null);
        };
      });
    } else {
      setError(valid.message);
      setPreview(null);
      setFileName(null);
      setWriteName(null);
    }
  }, []);

  const typeValidator = (file) => {
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      if (file.size > 9 * 1024 * 1024) {
        // 10MB limit
        return {
          code: false,
          message: "File is too large. Maximum size is 10 MB.",
        };
      }
      return {
        code: false,
        message: "Unsupported file format, Only  jpg and jpeg, png file",
      };
    }
    return {
      code: true,
      message: "formate right and file size right",
    };
  };
  const handleChange = (values) => {
    setWriteName(values);
    console.log(values);

    setFileName(null);
  };
  const submitForm_123 = () => {
    // console.log();
    if (fileName) {
       console.log(fileName);
    }
    
  };
  const submitForm = () => {
    if (writeName) {
      console.log(writeName);
    }
  };
  

  function onDocumentLoadSuccess({numPages}) {
    setNumPages(numPages);
  }

 
  // const customStyles = `
  //   .react-pdf__Page__textContent {
  //     display: none !important;
  //   }
  //   .react-pdf__Page__annotations {
  //     display: none !important;
  //   }
  // `;
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
    <>
      <nav className="navbar bg-background px-5 mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1 text-light">PDFSigner</span>
        </div>
      </nav>
      <div className="container-fluid ">
      <div>
      <div>Modifying PDF...</div>
      <button onClick={handleSavePdf} disabled={!pdfBytes}>Save PDF</button>
    </div>
        <section className="">
          <div className="card border-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12 mb-4">
                  <div className="card" style={{width: "100%"}}>
                    <div className="card-header text-center">
                      <Box sx={{width: "100%"}}>
                        <Tabs
                          value={value}
                          onChange={handleChange_123}
                          textColor="primary"
                          indicatorColor="primary"
                          aria-label="secondary tabs example"
                        >
                          <Tab value="1" label="Upload file" />
                          <Tab value="2" label="Written Type" />
                        </Tabs>
                      </Box>
                    </div>
                    <form method="post">
                      <div className={"card-body" + (value ==='1' ?" d-block": " d-none") }>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <label
                              htmlFor="uploadSignature"
                              className="form-label"
                            >
                              Upload Signature
                            </label>
                            <div className="image-upload-wrap ">
                              <div {...getRootProps()}>
                                <input
                                  {...getInputProps()}
                                  name="Uploadsign"
                                  type="file"
                                 
                                />
                                {isDragActive ? (
                                  <h4 className="text-center">
                                    <i>Drop the files</i>
                                  </h4>
                                ) : (
                                  <h4 className="text-center">
                                    <i> Drop down, or Select files</i>
                                  </h4>
                                )}
                              </div>
                            </div>
                            <span className="text-danger ">{error}</span>

                            <div className="d-flex justify-content-end align-content-center mt-2">
                              {preview ? (
                                <img
                                  style={{border: "1px solid #000"}}
                                  src={preview}
                                  alt={preview}
                                  width={150}
                                  height={50}
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </li>
                          
                        </ul>
                        <div className="mt-3">
                          <button
                            onClick={submitForm_123}
                            className="btn btn-primary"
                            name="btn"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                      </form>
                      <form method="post">
                      <div className={"card-body" + (value === '2' ?" d-block": " d-none")}>
                        <ul className="list-group list-group-flush">
                          
                          <li className="list-group-item">
                            
                         
                            <div className="">
                              <label
                                htmlFor="writentype"
                                className="form-label"
                              >
                                Enter Signature
                              </label>
                              <input
                                type="text"
                                name="writentype"
                                onChange={(e) => handleChange(e.target.value)}
                                id="writentype"
                                placeholder="Enter Signature"
                                className="form-control"
                                required={(value==='2'?true:false)}
                              />
                            </div>
                          </li>
                        </ul>
                        <div className="mt-3">
                          <button
                            onClick={submitForm}
                            className="btn btn-primary"
                            name="btn"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-md-9 col-lg-9 col-sm-12 col-xs-12 ">
                  <div className="card">
                    {/* <div className="button-css">
                      <button className="btn btn-outline-dark circles mb-2" onClick={handleZoomIn}><b>+</b></button>
                     <br />
                     <button className="btn btn-outline-dark circles" onClick={handleZoomOut}><b>-</b></button>
                    </div> */}
                    <div
                      className="card-body overflow-auto css_sty"
                      id="style-3"
                    >
                      <Document
                        file="assets/uploads/file2.pdf"
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="pdf-container"
                      >
                        {Array.from(new Array(numPages), (el, index) => (
                          <div
                            key={`page_${index + 1}`}
                            style={{
                              pageBreakAfter: "always",
                              marginBottom: "10px",
                            }}
                            className="pdf-page-wrapper"
                          >
                            <Page
                              key={`page_${index + 1}`}
                              pageNumber={index + 1}
                              renderTextLayer={false} // Disable text layer rendering
                              renderAnnotationLayer={false} // Disable annotation layer rendering
                              scale={scale}
                            />
                          </div>
                        ))}
                      </Document>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

// #endregion

export default UploadSignature;
