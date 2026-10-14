import { useNavigate } from "react-router-dom";



function UserInfo() {

 let navigate =  useNavigate();

function AfterSubmit() {

  navigate("/uploadprofile")


}


  return <div style={{marginTop : "5%"}}>

  <h1 className="main-heading">Lets us Know More About You !</h1>


<form onSubmit={AfterSubmit}>


<h2 className="aux-head">What Should We Call You ?</h2>
<input type="text" placeholder="Your fullname..."  className="form-fields" required  />
  <br /><br />
  <h2 className="aux-head"> Where Do You Live ?</h2>
  <input type="text" placeholder="Country Name" required  style={{height : "0.3in"}}  />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <input type="text" placeholder="City Name" required   style={{height : "0.3in"}} />
  <br /><br />
  <h2 className="aux-head">What Do You Do For Living ?</h2>
<input type="text" placeholder="eg..doctor , police officer , bodybuilder"  className="form-fields" required  />
  <br /><br />
  <h2 className="aux-head">Which Religion Do You Follow  ?</h2>
 <select className="form-fields" required>

<option hidden value="other">Select Below</option>
 <option>hinduism</option>
 <option>islam</option>
 <option>buddhism</option>
 <option>christianity</option>
 <option>unaffiliated</option>
 <option>other</option>

 </select>


  <br /><br />
  <button type="submit" className="get-in-btn">Get started</button>

</form>


  </div>

}



export default UserInfo;
