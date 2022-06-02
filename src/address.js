import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Body from "../components/Body";
import InputField from "../components/InputField";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useApi } from "../contexts/ApiProvider";
import { useFlash } from "../contexts/FlashProvider";
import SearchLocationInput from "./SearchLocationInput";


export default function AddressPage() {

  const [formErrors, setFormErrors] = useState({});
  const usernameField = useRef();
  const firstnameField = useRef();
  const lastnameField = useRef();
  const emailField = useRef();
  const passwordField = useRef();
  const password2Field = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    firstnameField.current.focus();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <Body sidebar>
      <h1>Check</h1>
      <Container>
      <SearchLocationInput onChange={() => null} />
      
      <Form onSubmit={onSubmit}>
        <Container>
          <Row>
            <Col>
              <InputField
                name="firstname"
                label="First name"
                error={formErrors.name}
                fieldRef={firstnameField}
              />
            </Col>
            <Col>
              <InputField
                name="lastname"
                label="last name"
                error={formErrors.name}
                fieldRef={lastnameField}
              />
            </Col>
          </Row>

          <InputField
            name="email"
            label="Email address"
            error={formErrors.email}
            fieldRef={emailField}
          />
          <InputField
            label="Street address"
            id="main-address"
            name="main-address"
          />
          <InputField
            id="address2"
            name="address2"
            label="Address 2"
            type="text"
          />
          <Row>
            <Col>
              <InputField
                id="locality"
                name="locality"
                label="City"
                type="text"
              />
            </Col>
            <Col>
              <InputField id="state" name="state" label="State" type="text" />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputField
                id="postcode"
                name="postcode"
                label="Postal code"
                type="text"
              />
            </Col>
            <Col>
              <InputField
                id="country"
                name="country"
                label="Country"
                type="text"
              />
            </Col>
          </Row>
        </Container>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      </Container>
    </Body>
  );
}
