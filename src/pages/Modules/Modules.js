import React,{useEffect,useCallback,useState,useLocalStorage} from 'react'
import{ModulesData} from "./ModulesData"
import { Container,Row,Col} from 'react-bootstrap';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import ModuleCard from './ModuleCard';
import { IconContext } from 'react-icons/lib';
import classes from './Modules.module.css'
import {moduleActions} from '../../store/module-slice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useFetch, { Provider } from "use-http";
import api from "../../Api";
const getRowwise=(array,rowWise)=>{
  let result = [],
      i = 0;
  while (i < array.length) result.push(array.slice(i, i += rowWise));
  console.log(result)
  return result;
}

function Modules() {
  const history = useHistory()
  let role = localStorage.getItem('roleId');;
  const authCtx = useContext(AuthContext);
  const { get, post,request, response, loading, error} = useFetch({ data: [] });
  const [modules,setModules] = useState([]);
  const loadInitialData = useCallback(async () => {
    // const { ok } = response // BAD, DO NOT DO THIS
    const initialModules = await post(api + "/loadMenu/loadModules",{"roleId":role});
    console.log(initialModules)
    if (response.ok) setModules(initialModules);
    //  console.log(initialCusts)
  }, [get, response]);
  //const modules = authCtx.modules;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      moduleActions.selectModuleId({
        moduleId:""
      })
    );
  }, []);
  useEffect(() => {
    loadInitialData();
}, []);
  const addmodules = (selectedmodule) => {
    dispatch(
      moduleActions.selectModuleId({
        moduleId:selectedmodule.id
      })
    );
    history.push(selectedmodule.path)
  };
  
  const renderModules=(modules)=>{
    const groupedModules= getRowwise(modules,4)
    return (
      <div>
        {groupedModules.map((rowModules,index) => {
          return (
            <Container key={index} className={classes.Container}>
              <Row>
              {rowModules.map(module => {
                return (
                  <Col md={3}>
                 <ModuleCard module={module} onModuleSelect={addmodules}/>
                 </Col>
                );
              })}
              </Row>
            </Container>
          );
        })}
      </div>
    );
      
  }

  return (
    <IconContext.Provider value={{ color: 'blue', size:80 }}>
        {renderModules(modules)}
    </IconContext.Provider>
  )
}

export default Modules
