import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function MyProperties() {
  let [userRole, setUserRole] = useState('');
  let [propertyExistence , setPropertyExistence] = useState(false);

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

    const msg = await result.json()

    console.log(result.status);
    console.log(msg.message);

    if (result.status === 404 && msg.success === false) {

      return setPropertyExistence(false)
    }

    if (result.status === 200 && msg.success === true) {

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

     {userRole !== "applicant" ? <>

     {propertyExistence === false ?   <h1 style={{color : "white"}}> You have No Properties Listed So Far! </h1>


      : <>

      <h1>We will continue tommorow</h1>

      {/* Here we will now display all properties that is listed by the landlords (users)
      including the property Images description and everything! */}


      </>}

     </>  : <h1>404 Page Not Found!</h1>}

    </div>


  );


}

export default MyProperties;
