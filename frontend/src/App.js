import { BrowserRouter } from 'react-router-dom';
import './Styling/App.css'
import { AuthWrapper } from './Auth/AuthWrapper';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
