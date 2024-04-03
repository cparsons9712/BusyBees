import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './Context/Modal';
import { AuthWrapper } from './Auth/AuthWrapper';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import "./Styling/index.css";

// Create a new instance of QueryClient
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <AuthWrapper>
            <App />
          </AuthWrapper>
        </ModalProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
