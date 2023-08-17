import * as React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import classes from "./Login.module.css"
import NavBar from '../Navbar/NavBar';
import { useHistory } from 'react-router-dom';
import Loginimg from'../images/bglogin.jpg';
import {
  Container,
  Form,
  Button,
  Row,
  Col
  // InputGroup,
  // FormControl
} from "react-bootstrap";
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import AuthContext from '../store/auth-context';
import { ModulesData } from './Modules/ModulesData';
import LoginForm from "./LoginForm";
import useFetch, { Provider } from "use-http";
import api from "../Api";
import { alertActions } from "../store/alert-slice";
import { useSelector, useDispatch } from "react-redux";
import {ui} from '../Api'
//import {history} from '../index'

var sectionStyle = {
  
}

function Login() {
  const history =useHistory()
   const authCtx = useContext(AuthContext); 
  const { get, post, response, loading, error } = useFetch({ data: [] });
  const [showAlert, alertMessage, alertVariant] = useSelector((state) => [
    state.alertProps.showAlert,
    state.alertProps.alertMessage,
    state.alertProps.alertVariant,
  ]);
  const AlertHandler = (alertContent, alertType) => {
    dispatch(
      alertActions.showAlertHandler({
        showAlert: !showAlert,
        alertMessage: alertContent,
        alertVariant: alertType,
      })
    );
  };
  const dispatch = useDispatch();

  const isLoggedIn = authCtx.isLoggedIn;

    const initState = {
        email: "",
        password: "",
      };
    
      // eslint-disable-next-line no-unused-vars
      const [initialValues, setInitialValues] = React.useState(initState);
     
      const onSubmit = async(values)=>{
        const loginapi = "/login/signin";
        const returnObject = await post(api + loginapi, values);
        console.log(returnObject)
        if (returnObject.token) {
          authCtx.login(returnObject.token,returnObject.timeOut,returnObject.roleId,returnObject.userId);
          history.push('/modules')
        }else{
          AlertHandler("Incorrect Username and Password", "danger");
        }
      }
    
      const onError = (error) => {
        console.log("ERROR:::", error);
      };
    
      const {
        register,
        handleSubmit,
        getValues,
        watch,
        formState: { errors },
        setError, 
        clearErrors
      } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        // reValidateMode: "onChange",
       // defaultValues: defaultValues
      });
    
      // const x = JSON.stringify(data);
      // const y = JSON.stringify(listShow);
    
      React.useEffect(() => {
        const subscription = watch((value, { name, type }) => {
          console.log(">>", value, name, type);
          // {1: '1', 2: '9'} '2' 'change'
        });
    
        return () => subscription.unsubscribe();
      }, [watch]);
     
    
      return (
        <Row className={classes.logpg}>
         <Col md={7} style={{ backgroundImage: `url(${Loginimg})`, backgroundSize:"contain"}} className={classes.images}>
            <Row className={`${classes.emptyspace} d-flex align-items-center`}>
            <div className={classes.heading}>
                <p className={classes.header}> Vee J Pee Aluminium Foundry </p>  <p className={classes.jhead}>  A Journy Towards</p>
                <p className={classes.chead}> Digital Factory</p>
              </div>
            </Row>
          </Col>
          <Col md={5} style={{ width: "37.5vw" }} className={classes.formContainer}>
            <Form onSubmit={handleSubmit(onSubmit)} className={classes.loginform}>
              <h3 className={classes.login}>Login</h3>
      <Form.Group className={classes.forminside} controlId="formBasicEmail">
        <Form.Label  className={classes.labl}>Email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Your User Name" className={classes.myformCustominput}
          {...register("username", { required: "UserName is required"})} 

        />
        {errors.email && (
          <Form.Text className="text-danger">
            {errors.email.message}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label className={`${classes.flabl} ${classes.labl}`}>Password</Form.Label>


        <Form.Control
          type="password"
          placeholder="Password" className={classes.myformCustominput}
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <Form.Text className="text-danger">
            {errors.password.message}
          </Form.Text>
        )}
      </Form.Group >
      <Button variant="primary" type="submit" className={classes.bttn}>
        Submit
      </Button>
    </Form> 
    
    {/* <LoginForm className={classes.loginforms}/> */}
    </Col>
    </Row>
   )
}

export default Login
