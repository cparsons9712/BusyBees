import { BrowserRouter } from 'react-router-dom';
import './Styling/App.css'
import { AuthWrapper } from './Auth/AuthWrapper';
import { ModalProvider } from './Context/Modal';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ModalProvider>
          <AuthWrapper />

        </ModalProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
