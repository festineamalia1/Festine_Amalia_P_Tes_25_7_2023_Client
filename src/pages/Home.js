import React, { useEffect, useContext, useState } from "react";

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
  // const {
  //   isLoading,
  //   error,
  //   data: videos,
  //   refetch,
  // } = useQuery("getdata", () => API.get(`mahasiswa`));
  const handleShow = () => setShow(true);
  const [jadwal, setJadwal] = useState([]);
  const [editData, setEditData] = useState([]);

  const baseURL = "http://localhost/SimpleApiPHP";

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
                  <input
                    type="text"
                    class="form-control"
                    id="keterangan"
                    placeholder="keterangan"
                  ></input>
                </div>
                <div className="d-flex col justify-content-end">
                  25 Juli 2023
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
                          <td>{dt.id_group_piket}</td>
                          <td>{dt.id_pekerja}</td>
                          <td>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>Group Piket</option>
                              <option value="1">Piket Hadir</option>
                              <option value="2">Cadangan Piket</option>
                              <option value="3">Lepas Piket</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              class="form-control"
                              id="keterangan"
                              placeholder="keterangan"
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
