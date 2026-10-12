import { Routes , Route } from "react-router-dom";
import Homepage from "./components/homepage";
import Signup from "./components/signup";
import Login from "./components/login";


function App()  {


  return <>


<Routes>

<Route path="/" element = {<Homepage/>}/>
<Route path="/signup" element = {<Signup/>}/>
<Route path="/login" element = {<Login/>}/>
<Route path="*" element = {<h1 style={{marginTop : "10%" , fontSize : "40px"}}>404 Not Found</h1>}/>

</Routes>



  </>

}


export default App;
