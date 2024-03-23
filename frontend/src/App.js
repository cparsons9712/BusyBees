import Header from "./Components/Structure/HeaderWrapper";
import DynamicRouter from "./Navigation/Routes";
import Modal from "./Components/Modals/Modal";
import './Styling/App.css'

const App = () => {
  return (
    <>
      <Header />
      <DynamicRouter />
      <Modal />
    </>
  )
}
export default App
