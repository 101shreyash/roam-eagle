import { Routes , Route } from "react-router-dom";
import Homepage from "./components/homepage";
import Signup from "./components/signup";
import Login from "./components/login";
import UserInfo from "./components/info"
import AboutUS from "./components/aboutUs";
import UploadProfile from "./components/uploadProfile";
import FAQ from "./components/faq";
import MyProfile from "./components/profile";
import Settings from "./components/settings";
import DeleteAccount from "./components/deleteAccount";
import ChangePassword from "./components/changePassword";
import ListProperty from "./components/listproperty";
import AddPropertyVisuals from "./components/propertyVisual";
import ChangeProfileDetails from "./components/changeProfileDetails";

function App()  {

  return <>

<Routes>

<Route path="/" element = {<Homepage/>}/>
<Route path="/signup" element = {<Signup/>}/>
<Route path="/login" element = {<Login/>}/>
<Route path="/userinfo" element = {<UserInfo/>}/>
<Route path="/uploadprofile" element = {<UploadProfile/>}/>
<Route path="/myprofile" element = {<MyProfile/>}/>
<Route path="/mysettings" element = {<Settings/>}/>
<Route path="/mysettings/deleteaccount" element = {<DeleteAccount/>}/>
<Route path="/mysettings/changepassword" element = {<ChangePassword/>}/>
<Route path="/mysettings/changeprofile" element = {<ChangeProfileDetails/>}/>


<Route path="/listproperty" element = {<ListProperty/>}/>
<Route path="/propertyvisuals" element = {<AddPropertyVisuals/>}/>




<Route path="/aboutus" element = {<AboutUS/>}/>
<Route path="/faq" element = {<FAQ/>}/>
<Route path="*" element = {<h1 style={{marginTop : "10%" , fontSize : "40px"}}>404 Not Found</h1>}/>

</Routes>



  </>

}


export default App;
