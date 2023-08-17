import React,{useState} from 'react'
import Testing from './Testing/Testing'
import DieCasting from './DieCasting/DieCasting'
import GravityDieCasting from './GravityDieCasting/GravityDieCasting'
import GravityDieCastingSC from './GravityDieCastingSandCore/GravityDieCastingSC'
import HeatTreatment from './HeatTreatment/HeatTreatment'
import LowPreDC from './LowPressureDieCasting/LowPreDC'
import NDT from './NDT/NDT'
import Blasting from './Blasting/Blasting'
import PressureDieCasting from './PressureDieCasting/PressureDieCasting'
import Quality from './Quality/Quality'
import SandCasting from './SandCasting/SandCasting'
import SpecialProcess from './SpecialProcess/SpecialProcess'
import SurfaceTreatment from './SurfaceTreatment/SurfaceTreatment'
import Process from './Process'
import Button from 'react-bootstrap/Button';
import classes from './processSelected.module.css'


const allProcess={"1":false,"2":false,"3":false,
                  "4":false,"5":false,"6":false,
                "7":false,"8":false,"9":false,"10":false,"11":false,
              "12":false}

function ProcessSelected(props) {

  const[currentShow,setCurrentShow]=useState("")
  const [showProcess,setShowProcess] = useState(allProcess)

  const onCurrentShowChangeHandler=(event)=>{
    Object.keys(showProcess).forEach(v => showProcess[v] = false)
    setShowProcess({
      ...showProcess,
      [event.target.value]: !showProcess[event.target.value], //Here
    });
    setCurrentShow(event.target.value);
  }

  const onNewChanges=(process)=>{
    setShowProcess({
      ...showProcess,
      [process]: !showProcess[process], //Here
    });
  }

  const renderButtons = (Processes) => {
    return Processes.map(Process=>{
       console.log(props.selectedProcess)
       switch (Process) {
           case "1":
               return (
                 <Button className={classes.botton} variant="outline-primary"  value="1" onClick={onCurrentShowChangeHandler}>Testing</Button>
               )
           case "2":
                 return (
                  <Button className={classes.botton} variant="outline-primary" value="2" onClick={onCurrentShowChangeHandler}>Gravity Die Casting</Button>
                 )
          case "3":
                 return (
                  <Button className={classes.botton} variant="outline-primary" value="3" onClick={onCurrentShowChangeHandler}>Gravity Die Casting SC</Button>
                 )
                 case "4":
                  return (
                    <Button className={classes.botton} variant="outline-primary" value="4" onClick={onCurrentShowChangeHandler}>Sand Casting</Button>
                   )
                 case "5":
                 return (
                  <Button className={classes.botton} variant="outline-primary" value="5" onClick={onCurrentShowChangeHandler}>Low Pressure Die Casting</Button>
              )
                 case "6":
                 return (
                  <Button className={classes.botton} variant="outline-primary" value="6" onClick={onCurrentShowChangeHandler}>Pressure Die Casting</Button>
                 )
                 case "7":
                 return (
                  <Button className={classes.botton} variant="outline-primary" value="7" onClick={onCurrentShowChangeHandler}>Surface Treatment</Button>
                 )
                 case "9":
                 return (
                  <Button className={classes.botton} variant="outline-primary" value="9" onClick={onCurrentShowChangeHandler}>Quality</Button>
                 )
                 case "10":
                  return (
                    <Button className={classes.botton} variant="outline-primary" value="10" onClick={onCurrentShowChangeHandler}>NDT</Button>
                   )
                 case "12":
                 return (
                  <Button className={classes.botton} variant="outline-primary" value="12" onClick={onCurrentShowChangeHandler}>SpecialProcess</Button>
                 )
                 case "11":
                 return (
                  <Button className={classes.botton} variant="outline-primary" value="11" onClick={onCurrentShowChangeHandler}>Surface Treatment</Button>
                 )
                 case "8":
                 return (
                  <Button className={classes.botton} variant="outline-primary" value="8" onClick={onCurrentShowChangeHandler}>Blasting</Button>
                 )
                 case "13":
                 return (
                  <Button className={classes.botton} variant="outline-primary" value="13" onClick={onCurrentShowChangeHandler}>Gravity Die Casting SC</Button>
                 )
                 case "14":
                 return (
                  <Button className={classes.botton} variant="outline-primary" value="14" onClick={onCurrentShowChangeHandler}>Die Casting</Button>
                 )      
 }
}
   )
  
  }

  const renderProcess = (Processes) => {
    
    return Processes.map(Process=>{

       console.log(props.selectedProcess)
       
       switch (Process) {
           case "1":
               return (
                  <Testing displayProcess={showProcess["1"]}/>
               )
          case "2":
                 return (
                   <GravityDieCasting displayProcess={showProcess["2"]}></GravityDieCasting>
                 )
          case "3":
                 return (
                   <GravityDieCastingSC displayProcess={showProcess["3"]}></GravityDieCastingSC>
                 )
                 case "4":
                  return (
                    <SandCasting displayProcess={showProcess["4"]}></SandCasting>
                  )
                 case "5":
                 return (
                   <LowPreDC displayProcess={showProcess["5"]}></LowPreDC>
                 )
                 case "6":
                 return (
                  <PressureDieCasting displayProcess={showProcess["6"]}></PressureDieCasting>
                   
                 )
                 case "7":
                 return (
                  <SurfaceTreatment displayProcess={showProcess["7"]}></SurfaceTreatment>
                 )
                 case "9":
                 return (
                   <Quality displayProcess={showProcess["9"]}></Quality>
                 )
                 case "10":
                  return (
                    <NDT displayProcess={showProcess["10"]}></NDT>
                  )
                 case "12":
                 return (
                   <SpecialProcess displayProcess={showProcess["12"]}></SpecialProcess>
                 )
                 case "11":
                 return (
                   <SurfaceTreatment displayProcess={showProcess["11"]}></SurfaceTreatment>
                 )
                 case "8":
                 return (
                   <Blasting displayProcess={showProcess["8"]}></Blasting>
                 )
                 case "13":
                 return (
                   <Testing displayProcess={showProcess["13"]}></Testing>
                 )
                 case "14":
                 return (
                   <DieCasting displayProcess={showProcess["14"]}></DieCasting>
                 )
             
 }
}
   )
  
  }
    
  return (
    <> 
      {renderButtons(props.selectedProcess)}
      <hr/>
      {renderProcess(props.selectedProcess)}
    </>
  )
}

export default ProcessSelected
