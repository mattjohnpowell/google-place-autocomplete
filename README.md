<p> This is a fork of Gapur's code but added the ability to populate the address into address fields so that it can be submit in unified format</p>

<p align="center">
  <img width="700"src="https://github.com/mattjohnpowell/google-place-autocomplete/blob/master/ezgif.com-gif-maker.gif">
</p>

# Google Place Autocomplete

The best practice with Google Place Autocomplete API on React

Using Google Place Autocomplete without third-party library

Autocomplete is a feature of the Places library in the Maps JavaScript API. When a user starts typing an address, autocomplete fills in the rest.

## Setting up the Project

Install the repository:
```sh
git clone https://github.com/Gapur/google-place-autocomplete.git
```

After that, move it into the google-place-autocomplete directory and run it from the terminal:
```
cd google-place-autocomplete
npm start
```

Before we get started, you need the API-Key for the Google Places API. You can get that key [here](https://developers.google.com/maps/documentation/javascript/places-autocomplete). I store Google API Key in the .env file — you should too.


## Usage
```js
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Body from "../components/Body";
import InputField from "../components/InputField";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SearchLocationInput from "./SearchLocationInput";

export default function CheckPage() {

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
      <h1>Check NFTs</h1>
      <Container id="address-container" className="main-container">
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

```

## Magic Code

Let’s implement the main SearchLocationInput component to work with the Google Place Autocomplete API. First, we have to create a function to load the script for working with Google API. Let’s create SearchLocationInput.js with loadScript function:

```js
// dynamically load JavaScript files in our html with callback when finished
const loadScript = (url, callback) => {
  let script = document.createElement("script"); // create script tag
  script.type = "text/javascript";

  // when script state is ready and loaded or complete we will call callback
  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url; // load by url
  document.getElementsByTagName("head")[0].appendChild(script); // append to head
};
```

I used this script for dynamic JavaScript for fast page speed load on our public pages. It dynamically loads JavaScript files with a callback when finished. Next, we have to assign the Google Place Map to the autoComplete variable when the component is rendered:

```js
// handle when the script is loaded we will assign autoCompleteRef with google maps place autocomplete
function handleScriptLoad(updateQuery, autoCompleteRef) {
  // assign autoComplete with Google maps place one time
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]); // specify what properties we will get from API
  // add a listener to handle when the place is selected
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}
```

Then we attach to the autocomplete listener, which listens for whenever a user selects one of the autocomplete suggestions. Let’s createthe handlePlaceSelect method to handle selection:

```js
async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace(); // get place from google api
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
}
```

This method is called when the event is triggered and gets place data from API. Then we can do any operation with data.

## Google API result

<p align="center">
  <img width="800"src="https://github.com/Gapur/google-place-autocomplete/blob/master/public/result.png">
</p>

## Article on Medium

[How to Use Google Place Autocomplete With React Without a Third-Party Library](https://medium.com/better-programming/the-best-practice-with-google-place-autocomplete-api-on-react-939211e8b4ce)

## How to contribute?

1. Fork this repo
2. Clone your fork
3. Code 🤓
4. Test your changes
5. Submit a PR!
