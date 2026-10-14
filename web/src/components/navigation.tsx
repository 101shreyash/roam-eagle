

import { Link } from "react-router-dom"

function Navigations() {



  return <>

  <Link to= "/faq" className="main-links"> FAQ </Link>
  &nbsp; &nbsp; &nbsp;
  <Link to= "/aboutus" className="main-links"> About US </Link>
  &nbsp; &nbsp; &nbsp;
  <Link to= "/signup" className="main-links"> Signup </Link>
    &nbsp; &nbsp; &nbsp;
  <Link to= "/login" className="main-links"> Login </Link>


  </>

}



export default Navigations;
