import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import React ,{useState,Component,useLocalStorage,useContext} from 'react';
import Header from './Navbar/Header'
import Login from './pages/Login';
import { modalActions } from "./store/modal-Slice";
import { alertActions } from "./store/alert-slice";
import { Alert,Row,Col,Modal as ModalBoots,Button, Container} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./UI/Modal/Modal";
import { Provider } from 'use-http'
import AuthContext from './store/auth-context';
import AllRoutes from './Routes'
import { useHistory } from 'react-router-dom';
import Protected from './Components/Protected';
import {history} from './index'

function App() {
const [modalIsShown, setModalIsShown] = useState(false);
const AlertHandler=(alertContent,alertType)=>{
  dispatch(
   alertActions.showAlertHandler({
    showAlert : !showAlert, 
    alertMessage : alertContent,
    alertVariant : alertType
  }
   )
  );
}

const [showModal, selectedForm, selectedData] = useSelector((state) => [
  state.modalProps.showModal,
  state.modalProps.selectedForm,
  state.modalProps.selectedData,
]);

const dispatch = useDispatch();
const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
  state.alertProps.showAlert,
  state.alertProps.alertMessage,
  state.alertProps.alertVariant,
]);
const authCtx = useContext(AuthContext); 
let token =  authCtx.token;

const isLoggedIn = authCtx.isLoggedIn;

const options = {
  interceptors: {
    // every time we make an http request, this will run 1st before the request is made
    // url, path and route are supplied to the interceptor
    // request options can be modified and must be returned
    
    request: async ({ options, url, path, route }) => {
      options.headers.Authorization = `Bearer  ${token}`
      return options
    }
  }
}
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

return (
    <>
      <ModalBoots show={showAlert} onHide={() => AlertHandler("", "")}>
        <ModalBoots.Header closeButton>
          <ModalBoots.Title>Alert Message</ModalBoots.Title>
        </ModalBoots.Header>
        <ModalBoots.Body><p style={{color:`${alertVariant=="success" ? "Green" : "Red"}`}}> {alertMessage}</p></ModalBoots.Body>
        <ModalBoots.Footer>
          <Button variant="secondary" onClick={() => AlertHandler("", "")}>
            Close
          </Button>
        </ModalBoots.Footer>

      </ModalBoots>
     <Switch>
      <Route path='/' exact component={Login}/>
      <Provider options={options}>
      <Header>
      {showModal && (
        <Modal onClose={()=>dispatch(modalActions.hideModalHandler())} size={12}>
          {selectedForm}
        </Modal>
      )}
      <>
      <Protected isSignedIn={isLoggedIn}>
       <React.Suspense fallback={loading}>
        {AllRoutes}
        </React.Suspense>
        </Protected>
        </>
        </Header>
        </Provider>
      </Switch> 
    </>
  );
}

export default App;