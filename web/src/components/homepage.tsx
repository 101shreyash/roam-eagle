import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div className="universal-div">

      <h1 className="main-heading">RoamEagle</h1>
      <br />
      <p className="sub-heading">
        List your properties | Bookmark your favourite Property | Contact
        Landlord directly
      </p>

      <br /><br></br>
      <Link className="get-started-btn" to="/signup">
        Get started
      </Link>
    </div>
  );
}

export default Homepage;
