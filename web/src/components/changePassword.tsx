import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ChangePassword() {

  let navigate = useNavigate();

  let {register , handleSubmit , reset} = useForm();


  async function AfterSubmit(data : any) {

    const oldpassword : string = data.oldpassword
    const newpassword : string = data.newpassword
    const confirmationpassword : string = data.confirmpassword

    if (newpassword.length < 8) {

      reset();
     return toast.error("New password length must be greater than 8 characters or longer")


    }

    if (newpassword !== confirmationpassword) {

    reset();
     return toast.error("Confirmation Password didn't matched");

    }


    const result = await fetch("http://localhost:8001/api/settings/changepassword" , {

      credentials : "include",
      method : "POST",
      body : JSON.stringify({oldpassword : oldpassword , newpassword : newpassword , confirmpassword : confirmationpassword}),
      headers : ({
        'Content-Type' : 'application/json'
      })

    })

    const msg = await result.json();

    if (msg.message === "Previous Password didn't macthed try again" && result.status === 401 && msg.success === false) {

      reset();
      return toast.error("Previous Password didn't macthed try again with a valid password")

    }

    if (msg.success === true && result.status === 200) {

      navigate("/login")
      return toast.success("Password Changed Sucessfully")


    }


  }


  return <div className="universal-div">

   <h1 className="main-heading" style={{fontSize : "35px"}}>Change your Password </h1>
   <br />

  <form onSubmit={handleSubmit(AfterSubmit)}>


   <h3>Enter your old password</h3>
  <input className="input-field" type="password"  placeholder="Enter Your Previous Password"  required {...register("oldpassword")} />
  <h3>Enter your new password</h3>
  <input className="input-field" type="password"  placeholder="Enter Your New Password"  required {...register("newpassword")} />
  <h3>Enter Confirmation Password</h3>
  <input className="input-field" type="password"  placeholder="Enter Confirmation Password"  required {...register("confirmpassword")} />
<br /><br /><br />

  <button className="get-in-btn">Change Password </button>


  </form>


  </div>

}



export default ChangePassword;
