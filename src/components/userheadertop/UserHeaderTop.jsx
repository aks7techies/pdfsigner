import React from "react";
const UserHeaderTop = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg  mb-2 " style={{ backgroundColor:" rgb(117 176 235)",width: "97%" }}>
        <div className="container-fluid">
           
          <a className="navbar-brand text-white " href="#">
          Client Name:  Mark
          </a>
          {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
          {/* <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Pricing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div> */}
        </div>
      </nav>
    </>
  );
};

export default UserHeaderTop;
