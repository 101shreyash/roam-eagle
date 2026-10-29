import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { MdOutlineEventNote } from "react-icons/md";
import { FaSearchLocation } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";


function MyProfile() {

  const [role , setrole] = useState("");
  const [fullname , setfullname] = useState("");
  const [city , setcity] = useState("");
  const [country , setcountry] = useState("");
  const [profile , setprofile] = useState("");
  const [joinedDate , setjoinedDate] = useState("");
  const [profession , setprofession] = useState("");

async function GetUserProfile() {

 const result =  await fetch("http://localhost:8001/api/profileinfo" , {
    credentials : "include",
    headers : ({
      'Content-Type' : "application/json"
    })
  })

  const msg = await result.json();


  setfullname(msg.message.full_name)
  setrole(msg.message.role)
  setjoinedDate(msg.message.joined_at)
  setprofession(msg.message.profession)
  setcountry(msg.message.country)
  setcity(msg.message.city)
  setprofile(msg.message.profile_picture)


}

useEffect(() => {


  GetUserProfile();

} , [])



  return <div>

<Link to="/mysettings" className="main-links"> <IoSettingsOutline />  Settings</Link>


 {role !== "applicant" ? <Link className="main-links" to="/listproperty">List Properties <MdOutlineEventNote>
  </MdOutlineEventNote>  </Link> : ""}

{role === "applicant" ? <Link to= "#" className="main-links">Booked Properties <FaBookmark />
 </Link> : <Link className="main-links" to="#"> My Listed Properties <FaBookmark />
 </Link> }

<Link className="main-links" to="/browseproperty">Browse Property  <FaSearchLocation></FaSearchLocation> </Link>


 <div className="universal-div">

  <h1 className="main-heading"> YOUR PROFILE   </h1>

    </div>

  {profile ? <img className="profile-image" src={`http://localhost:8001/profilepicture/${profile}`} alt="profile-picture" /> : ""}
   {fullname && role ? <h1 style={{color : "white"}}>{fullname} , {role} </h1> : ""}
   {profession ? <h1 style={{color : "white"}}>Profession : {profession}</h1> : ""}
   {country && city ? <h1 style={{color : "white"}}>Country : {country} ,  {city} </h1> : ""}
   {joinedDate ? <h1 style={{color : "white"}}>Joined At : {joinedDate.substring(0,10)}  </h1> : ""}

  </div>

}



export default MyProfile;
