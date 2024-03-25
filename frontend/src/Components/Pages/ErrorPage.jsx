import { useRouteError } from "react-router-dom";
import '../../Styling/errorPage.css'

export default function ErrorPage() {


  return (
    <div id="error-page">
      <img src="/embarresedBee.png" alt="embarrasedBee" />
      <h1>Oh! This is embarrasing</h1>
      <p>Sorry, an unexpected error has occurred.</p>

    </div>
  );
}
