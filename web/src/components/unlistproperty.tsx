import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UnlistAllYourProperties() {

  let {register , handleSubmit , reset} = useForm();
  let navigate =  useNavigate()

  let [userRole , setUserRole] = useState("");

  async function CheckUserRole() {


   try {


    const result =  await fetch("http://localhost:8001/api/profileinfo" , {
    credentials : "include",
    headers : ({
      'Content-Type' : "application/json"
    })
  })

    const msg  = await result.json();
     setUserRole(msg.message.role)


   }

   catch (error) {

     console.log(error);
    return toast.error("Server Error")

   }


  }

  useEffect(() => {

    CheckUserRole();

  } , [])


  async function AfterSubmit(data : any) {

    const userEnteredPassword : string = data.password

    try {

    const result =  await fetch("http://localhost:8001/api/property" , {

      credentials : "include",
      method : "DELETE",
      headers : ({
        'Content-Type' : 'application/json'
      }),
      body : JSON.stringify({password : userEnteredPassword})

     })


     const msg = await result.json();


     if (result.status === 400 && msg.success === false) {

      return toast.error("Password didn't matched deletation failed.")
     }

     if (result.status === 200 && msg.success === true) {

      toast.success("All of Your Listed Property Deleted Successfully.")
     return  navigate("/myproperties")

     }

     if (result.status === 404 && msg.success === false) {


    reset();
     return toast.error("You don't have any properties to delete")

     }


    }

    catch (error : any) {

      toast.error("Internal Server Error.")
      console.log(error.message);

    }

  }

  return <div className="universal-div">

    {userRole !== "applicant" ? <>

  <h1 className="main-heading" style={{color : "red"}}> WARINING  !</h1>

<p style={{fontSize : "20px" , color : "white"}}>

You are about to permanently delete all the properties you have listed on our platform so far. This action will remove every property associated with your account, including all uploaded property images, titles, descriptions, and other related property information. Once this process is completed, all of your listed properties and their associated data will be permanently erased from our system, and you will no longer be able to access, manage, or recover them. Please be aware that this action is irreversible and cannot be undone under any circumstances. We strongly recommend that you carefully review your decision before proceeding. If you are absolutely sure that you want to delete all of your listed properties, please enter your account password below to verify your identity and confirm this action.


</p>

 <form onSubmit={handleSubmit(AfterSubmit)}>
<h1 className="sub-head" style={{color : "red"}}>Enter your account Password </h1>
<input type="text" className="input-field" placeholder="Enter your password" required  {...register("password")} />
<br /><br /><br />
<button className="get-in-btn"> Delete All Properties</button>

 </form>

    </> : <h1>404 Page Not Found !</h1>}


  </div>

}



export default UnlistAllYourProperties;
