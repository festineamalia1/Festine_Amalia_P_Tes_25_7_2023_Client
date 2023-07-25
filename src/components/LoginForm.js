import React, { useState, useContext } from "react";
import { TaskContext } from "context/TaskContext";

import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { API, setAuthToken } from "config/api";
const LoginForm = () => {
  const [state, dispatch] = useContext(TaskContext);
  const history = useHistory();

  const [userName, setUserName] = useState("Pemimpin.Kelompok");
  const [password, setPassword] = useState("12345678");
  console.log("userName user", userName);
  console.log("password user", password);

  const handleLogin = () => {
    if (userName == "Pemimpin.Kelompok") {
      history.push(`/home`);
    } else {
      history.push(`/homeapel`);
    }
  };
  return (
    <Col>
      <Row>
        <Modal.Dialog>
          <Modal.Body>
            <div
              style={{
                marginBottom: "28px",
              }}
            >
              <h1>Sign In</h1>
            </div>
            <Form>
              <Form.Label>Username</Form.Label>
              <Form.Group controlId="userName">
                <Form.Control
                  type="text"
                  name="userName"
                  required
                  placeholder="UserName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <Form.Label htmlFor="inputPassword5">Password</Form.Label>
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Link>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#005792",
                    border: "none",
                    color: "#FFFFFF",
                    width: "350px",
                    height: "50px",
                    borderRadius: "5px",
                    marginTop: "28px",
                  }}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
              </Link>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </Row>
    </Col>
  );
};
export default LoginForm;
