import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GrFormNext } from "react-icons/gr";
import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



function MyProperties() {


  let navigate = useNavigate();

  let [userRole, setUserRole] = useState('');
  let [propertyExistence , setPropertyExistence] = useState(false);
  let [propertyInfo , setPropertyInfo] = useState([]);

  async function CheckUserRole() {
    try {
      const result = await fetch("http://localhost:8001/api/profileinfo", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const msg = await result.json();
      setUserRole(msg.message.role);

    } catch (error) {
      console.log(error);
      return toast.error("Server Error");
    }
  }

  useEffect(() => {
    CheckUserRole();
  }, []);



async function userListedProperties() {

  try {

   const result =  await fetch("http://localhost:8001/api/property" , {
     credentials : "include",
     method : "GET",
     headers : ({
      'Content-type' : 'application/json'
     })

    })

    const msg = await result.json();

    if (result.status === 404 && msg.success === false) {
      return setPropertyExistence(false)
    }

    if (result.status === 200 && msg.success === true) {


      setPropertyInfo(msg.message)
      return setPropertyExistence(true)

    }

  }

  catch (error) {
    toast.error("Server Error")
    console.log(error);
  }



}


useEffect(() => {

userListedProperties();


} , [])



  return (


    <div className="universal-div">


  {userRole === 'applicant' ? <h1>404 Page  Not Found !</h1> : <>

    <h1 style={{color : "white"}} className="main-heading">Your Listed Properties</h1>
    <hr />

   {propertyInfo.map((e : any) => {


    function EditPropertyInfo(propertyId : any) {

      toast.success(`${propertyId}`)

    }

    function ViewPropertyVisuals(propertyId : any) {

      return navigate("visuals" , {state : propertyId})

    }



    return <div key={e.property_id} className="property-div">

   <h2 style={{color : "white"}}  className="sub-heading"> PropertyID : 1000{e.property_id}</h2>

   <h2 style={{color : "white"}}  className="sub-heading">Property_Status : {e.property_status}</h2>

   <h2 style={{color : "white"}}  className="sub-heading">Title : {e.title}</h2>

   <h2 style={{color : "white"}}  className="sub-heading">description : {e.description}</h2>
   <h2 style={{color : "white"}}  className="sub-heading">Total Room : {e.total_room}</h2>
   <h2 style={{color : "white"}}  className="sub-heading">Property Located At : {e.country} , {e.city}</h2>
   <h2 style={{color : "white"}}  className="sub-heading">Monthly Price : {e.monthly_price} </h2>
   <h2 style={{color : "white"}} className="sub-heading"> Negotiable : {String(e.negotiable)}</h2>

     <button onClick={() => ViewPropertyVisuals(e.property_id)} className="get-in-btn">View Images <GrFormNext /> </button>
     &nbsp;
     <button onClick={() => EditPropertyInfo(e.property_id)} className="get-in-btn">Edit Property Info <FaPen /> </button>
   <br />
   <hr />

    </div>


   })}



  </>}



    </div>


  );


}

export default MyProperties;
