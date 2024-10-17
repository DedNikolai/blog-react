import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import {BrowserRouter} from 'react-router-dom';
import "./index.scss";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './components/AuthProvider/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
          <ToastContainer position="top-center"/>
        </BrowserRouter>
        </AuthProvider>
    </ThemeProvider>
  </>
);
