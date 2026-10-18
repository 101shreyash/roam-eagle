import { Routes , Route } from "react-router-dom";
import Homepage from "./components/homepage";
import Signup from "./components/signup";
import Login from "./components/login";
import UserInfo from "./components/info"
import AboutUS from "./components/aboutUs";
import UploadProfile from "./components/uploadProfile";
import FAQ from "./components/faq";
import ExploreProperty from "./components/exploreProperty";
import MyProfile from "./components/profile";

function App()  {

  return <>

<Routes>

<Route path="/" element = {<Homepage/>}/>
<Route path="/signup" element = {<Signup/>}/>


<Route path="/login" element = {<Login/>}/>
<Route path="/userinfo" element = {<UserInfo/>}/>
<Route path="/uploadprofile" element = {<UploadProfile/>}/>
<Route path="/myprofile" element = {<MyProfile/>}/>
<Route path="/exploreproperties" element = {<ExploreProperty/>}/>


<Route path="/aboutus" element = {<AboutUS/>}/>
<Route path="/faq" element = {<FAQ/>}/>
<Route path="*" element = {<h1 style={{marginTop : "10%" , fontSize : "40px"}}>404 Not Found</h1>}/>

</Routes>



  </>

}


export default App;
