import React, { useState } from "react";

const PageOne = () => {
  const [inputValue, setInputValue] = useState("");
  const [validationStatus, setValidationStatus] = useState("");

  const onBlur = (event) => {
    setValidationStatus("validating...");

    fetch("/api/validate")
      .then((res) => res.json())
      .then((res) => {
        setValidationStatus(res.valid ? "valid" : "not valid");
      });
  };

  const onClick = () => {};

  return (
    <>
      <h1>Page One</h1>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onBlur={onBlur}
      />
      <p>Validation status: {validationStatus}</p>
      <button onClick={onClick}>Click me</button>
    </>
  );
};

const PageTwo = () => {
  const [inputValue, setInputValue] = useState("");
  const [validationStatus, setValidationStatus] = useState("");

  const onBlur = () => {
    setValidationStatus("validating...");

    fetch("/api/validate")
      .then((res) => res.json())
      .then((res) => {
        setValidationStatus(res.valid ? "valid" : "not valid");
      });
  };

  const onClick = () => {};

  return (
    <>
      <h1>Page Two</h1>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onBlur={onBlur}
      />
      <p>Validation status: {validationStatus}</p>
      <button onClick={onClick}>Click me</button>
    </>
  );
};

function App() {
  let Page = () => null;

  if (window.location.search.includes("page=1")) {
    Page = PageOne;
  } else if (window.location.search.includes("page=2")) {
    Page = PageTwo;
  }

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          <li>
            <a href="/?page=1">Page 1</a>
          </li>
          <li>
            <a href="/?page=2">Page 2</a>
          </li>
        </ul>
      </header>
      <Page />
    </div>
  );
}

export default App;
