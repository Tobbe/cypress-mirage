import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Server, Response } from "miragejs"
import { makeServer } from "./server";
import * as serviceWorker from "./serviceWorker";

import "./index.css";

if (window.Cypress) {
  new Server({
    environment: "test",
    routes() {
      let methods = ["get", "put", "patch", "post", "delete"]
      methods.forEach((method) => {
        this[method]("/*", async (schema, request) => {
          let [status, headers, body] = await window.handleFromCypress(request)
          return new Response(status, headers, body)
        })
      })
    },
  })
} else if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
