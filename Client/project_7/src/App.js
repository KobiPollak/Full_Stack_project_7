import logo from "./logo.svg";
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  redirect as Redirect,
  Navigate,
} from "react-router-dom";

import NotFound from "./components/notFound";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import Application from "./components/application";
import PaymentPage from "./components/payment";
import Details from "./components/details";
import ManagerApplication from "./components/managerApplication";
import Reports from "./components/reports";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signIn" replace />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/application/:id" element={<Application />}>
            <Route
              index
              path="/application/:id/details"
              element={<Details />}
            />
            <Route path="/application/:id/payment" element={<PaymentPage />} />
            <Route path="/application/:id/reports" element={<Reports />} />
          </Route>
          <Route path="/m-application/:id" element={<ManagerApplication />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div> */}
    </>
  );
}

export default App;
