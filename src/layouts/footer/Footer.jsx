import React from "react";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import './footer.css';

function Footer() {
const Year = new Date().getFullYear();
  return (
    <>
      <div className=" shifted container-fluid bg-color fixed-bottom">
        <footer className="d-flex flex-wrap justify-content-between align-items-center  my-1 ">
          <div className="col-md-4 d-flex align-items-center">
            
            <span className=" mb-md-0 text-body-secondary">
            © {Year} PDF Signature, Inc
            </span>
          </div>

          <ul className="nav col-md-4 list-unstyled d-flex me-5">
            <li className="ms-3">
              <a className="text-body-secondary" href="/">
                <TwitterIcon color="dark" />
              </a>
            </li>
            <li className="ms-3">
              <a className="text-body-secondary" href="/">
              <InstagramIcon color="dark" />
              </a>
            </li>
            <li className="ms-3">
              <a className="text-body-secondary" href="/">
                <FacebookIcon color="dark"  />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}

export default Footer;
