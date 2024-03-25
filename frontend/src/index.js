import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './Context/Modal';
import { AuthWrapper } from './Auth/AuthWrapper';
import App from './App';
import "./Styling/index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <AuthWrapper>
          <App /> {/* App is passed as children to AuthWrapper */}
        </AuthWrapper>
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
