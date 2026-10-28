import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function DeleteAccount() {

  let {register , handleSubmit , reset} = useForm();
  let navigate = useNavigate();


  async function AfterSubmit(data : any) {

    const confirmedPassword = data.password

   const result =  await fetch("http://localhost:8001/auth/deleteaccount" , {
      method : "POST",
      body : JSON.stringify({password : confirmedPassword}),
      credentials : "include",
      headers : ({
        'Content-Type' : 'application/json'
      })
    })

    const msg = await result.json();
    console.log(msg);

    if (msg.success === false , result.status === 401) {

      reset();
    return toast.error("Password didn't matched account deletation failed.")


    }

    if (result.status === 200 && msg.success === true) {


     navigate("/")
    return toast.success("Account Deleted Permanently")


    }

  }


  return <div className="universal-div">

  <h1 style={{color : "white" , fontSize : "30px"}} className="main-heading">
    Confirm Your Password To Delete Your Account.
  </h1>

  <form onSubmit={handleSubmit(AfterSubmit)}>

   <input className="input-field" type="password" placeholder="Enter Password" {...register("password")} required/> &nbsp; <button className="get-in-btn">Delete Account</button>

  </form>


  </div>

}


export default DeleteAccount;
