import React, { useEffect, useContext, useState } from "react";
import moment from "moment";
import NavBar from "components/NavBar";

import {
  Container,
  Row,
  Col,
  Image,
  Jumbotron,
  Button,
  Form,
  Table,
  Modal,
} from "react-bootstrap";
import { useParams, Link, useHistory, useLocation } from "react-router-dom";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const history = useHistory();

  const handleShow = () => setShow(true);
  const [jadwal, setJadwal] = useState([]);
  const [editData, setEditData] = useState([]);

  const baseURL = "http://localhost/Festine_Amalia_P_Tes_25_7_2023_Server";

  const fetchJadwalData = () => {
    axios.get(`${baseURL}/jadwal`).then((response) => {
      setJadwal(response.data);
    });
  };

  const fetchEditData = () => {
    axios.get(`${baseURL}/grouppiket`).then((response) => {
      setEditData(response.data);
    });
  };

  const handleEditData = (id) => {
    axios
      .post(`${baseURL}/grouppiket/2222`, {
        id_group_piket: 2222,
        id_pekerja: 2,
        id_jabatan: 22,
        id_group: 333,
      })
      .then(function (response) {
        setShow(true);
        console.log(response);
      })
      .catch(function (error) {
        setShow(true);
        console.log(error);
      });
  };

  // console.log("users", users.data);
  useEffect(() => {
    // refetch();
    fetchJadwalData();
    fetchEditData();
  }, []);

  const handleSubmit = () => {
    // refetch();
  };
  const handleClick = (e) => {
    setQuery(e.target.value);
  };
  return (
    <>
      {/* isLoading ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>error {error.message} </h1>
  ) : ( */}
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <div className="row mt-5">
              <NavBar />
            </div>
            <div>
              <div className="d-flex row mt-5 justify-content-between">
                <div className="col">
                  <div className="row">
                    <div>- Group Piket -</div>
                  </div>
                  <div className="row">
                    <div className="col col">Piket Hadir</div>
                    <div className="col col-auto"> : </div>
                    <div className="col"> A </div>
                  </div>
                  <div className="row">
                    <div className="col col">Cadangan Piket</div>
                    <div className="col col-auto"> : </div>
                    <div className="col"> B </div>
                  </div>
                  <div className="row">
                    <div className="col">Lepas Piket</div>
                    <div className="col col-auto"> : </div>
                    <div className="col"> C </div>
                  </div>
                </div>
                <div className="d-flex col justify-content-end">
                  {moment().format("D MMMM YYYY")}
                </div>
              </div>
              <div className="row mt-5">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Nama</th>
                      <th scope="col">Jabatan</th>
                      <th scope="col">Status Piket</th>
                      <th scope="col">Keterangan</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editData.data &&
                      editData.data.map((dt, i) => (
                        <tr>
                          <td>{dt.nama}</td>
                          <td>{dt.nama_jabatan}</td>
                          <td>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                            >
                              <option>Group Piket</option>
                              <option
                                selected={dt.Nama_group == "A" ? true : false}
                                value="1"
                              >
                                Piket Hadir
                              </option>
                              <option
                                selected={dt.Nama_group == "B" ? true : false}
                                value="2"
                              >
                                Cadangan Piket
                              </option>
                              <option
                                selected={dt.Nama_group == "C" ? true : false}
                                value="3"
                              >
                                Lepas Piket
                              </option>
                              <option
                                selected={
                                  dt.Nama_group == "Izin" ? true : false
                                }
                                value="3"
                              >
                                Tidak Hadir
                              </option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              id="keterangan"
                              placeholder={dt.Ket}
                            ></input>
                          </td>
                          <td>
                            <Button
                              style={{
                                backgroundColor: "#005792",
                                border: "none",
                                color: "#FFFFFF",
                                borderRadius: "5px",
                              }}
                              onClick={() => handleEditData()}
                            >
                              Edit
                            </Button>

                            {/* <button
                            type="button"
                            class="btn btn-primary"
                            onClick={handleShow}
                          >
                            Primary
                          </button> */}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Alert</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Data Berhasil Di Edit</Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      Ok
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
