import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {DataProvider} from './context/DataProvider'
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <DataProvider>
    <App />
  </DataProvider>
  </BrowserRouter>
);
