import { Link } from "react-router-dom";
import Navigations from "./navigation";

function Homepage() {
  return (
    <div className="universal-div">

      <Navigations/>
      <br /><br />

      <h1 style={{textDecoration : "underline wavy white" , textUnderlineOffset : "20px"}} className="main-heading">RoamEagle</h1>
      <p className="sub-heading">
       List your properties, save your favourites, and connect directly with landlords.
      </p>
       <p className="sub-heading"> Zero Commission Included , Contact Landlords Directly . </p>

    <br /><br /><br />
      <Link className="get-started-btn" to="/signup">
        Get started
      </Link>
    </div>
  );
}

export default Homepage;
