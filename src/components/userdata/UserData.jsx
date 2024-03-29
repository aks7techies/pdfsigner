import React from "react";
import Header from "../../layouts/header/Header";
import Footer from "../../layouts/footer/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import AddIcon from "@mui/icons-material/Add";
// import  {useNavigate}  from 'react-router-dom';
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import DeleteIcon from '@mui/icons-material/Delete';
// import Modal from "@mui/material/Modal";
// import {Formik, Field, ErrorMessage} from "formik";
// import * as Yup from "yup";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserData() {

  // const confirmFunction = ()=>{

  // }

  return (
    <>
    
      <Header />
         {/* <ToastContainer /> */}
      <section className="container-fluid px-4 pt-3">
        <a role="button" className="btn btn-dark" href="/dashboard">
          <ArrowBackIosNewIcon /> Back
        </a>
      </section>
      <section className="shifted container-fluid p-4 col-md-10 col-sm-12">
        <div className="card w-100 border-0">
          <div className="card-header">
            <div className="row">
              <div className="d-flex justify-content-between">
                <h3>Processed Documents List</h3>               
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="overflow-auto ">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date Time</th>
                    <th scope="col">Document Name</th>
                    <th scope="col">Orginal Document</th>
                    <th scope="col">Sign Document</th>
                    <th scope="col">Received Date Time</th>
                  </tr>
                </thead>
                <tbody>
                  
                  <tr>
                    <th scope="row">2</th>
                    <td>Mark</td>
                    <td>Otto@gmail.com</td>
                    <td>{new Date().toLocaleDateString()} <br />{new Date().toLocaleTimeString()} </td>
                    <td>@mdo</td>
                    <td><a href="/"> View </a></td>
                    <td><a href="/"> View </a></td>
                    <td>
                    <td>{new Date().toLocaleDateString()} <br />{new Date().toLocaleTimeString()} </td>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default UserData;
