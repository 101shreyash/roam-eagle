import { MdDelete } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Settings() {
  const navigate = useNavigate();

 async function Logout() {

    const result = await fetch("http://localhost:8001/auth/logout", {
      credentials : "include",
      method: "DELETE",
    });

    const msg = await result.json();
    console.log(msg);

    if (result.status === 200 && msg.success === true && msg.message === "Logged Out Sucessfull") {
      toast.success("Logged Out Successfull");
      return navigate("/");
    }
  }

  function DeleteAccount() {

    return navigate("deleteaccount")

  }

 function ChangePassword() {

 return navigate("changepassword")

 }

function ChangeProfileDetails() {

  return navigate("changeprofile")

}


  return (
    <div className="universal-div">
      <h1 className="main-heading">  <IoSettingsSharp /> Settings.  </h1>

      <button onClick={Logout} className="setting-links"> Logout <CiLogout /> </button>
      <br /><br />
      <button onClick={DeleteAccount} className="setting-links">   Delete Account <MdDelete /> </button>
      <br /><br />
      <button onClick={ChangePassword} className="setting-links"> Change Account Password <FaArrowsRotate /> </button>
      <br /><br />
      <button onClick={ChangeProfileDetails} className="setting-links"> Change Profile Details <FaArrowsRotate /> </button>
    </div>
  );
}

export default Settings;
