import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";


function MyPropertyVisuals() {

 let [userRole , setUserRole] =  useState()
 let [allVisuals , setAllVisuals] = useState([]);

 const navigate = useNavigate();

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



  let location = useLocation();

 if (location.state === null) {

  navigate("/myproperties")


 }





  async function PropertyVisuals() {

    try {

    const result =  await fetch(`http://localhost:8001/api/property/visual/${location.state}` , {
      credentials : "include",
      method : "GET",
      headers : ({
        'Content-type' : "application/json"
      })
     })

     const msg = await result.json()

     setAllVisuals(msg.message)


    }



    catch (error) {

      console.log(error);
      toast.error("Server Error")

    }



  }


  useEffect(() => {

    PropertyVisuals();

  } , [])


return <>

  <h1>Property Visuals For 1000{location.state} Property</h1>

{userRole !== "landlord" ? <h1>404 Page Not Found ! </h1>  : <>


{allVisuals.map((e: any) => {


return <div className="universal-div">


<img style={{height : "200px"}} src={`http://localhost:8001/propertypics/${e.property_image_url}`} alt="profile-picture" />
<br /><br />
<button className="get-in-btn">Delete </button> &nbsp;
<button className="get-in-btn">Edit </button>


</div>


})}


</>


}


</>

};


export default  MyPropertyVisuals
