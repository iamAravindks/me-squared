import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "aos/dist/aos.css";
import App from './App';
import MentorContextProvider from "./context/mentorContext/Context";
import { ErrorProvider } from "./context/errorContext/errorContext";
import MenteeContextProvider from "./context/menteeContext/MenteeContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorProvider>
      <MentorContextProvider>
        <MenteeContextProvider>
          <App />
        </MenteeContextProvider>
      </MentorContextProvider>
    </ErrorProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

