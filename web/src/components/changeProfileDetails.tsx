import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoPencil } from "react-icons/io5";


function ChangeProfileDetails() {


  // Userinfo

  let [city , setcity] = useState("");
  let [country , setcountry] = useState("");
  let [fullname , setfullname] = useState("");
  let [profession , setprofession] = useState("");
  let [profilepicture , setprofilepicture] = useState("");
  let [religion , setreligion] = useState("");

  let {register , handleSubmit , reset}  = useForm();

  // usestates for displaying input fields


  let [editcity , setEditCity] = useState(false);
  let [editcountry , setEditCountry] = useState(false);
  let [editfullname , setEditFullname] = useState(false);
  let [editprofession , setEditProfession] = useState(false);
  let [editprofilepicture , setEditProfilepicture] = useState(false);
  let [editreligion , setEditReligion] = useState(false);



const allowedRelgion: string[] = ["islam" , "christianity", "buddhism", "unaffiliated", "hinduism", "other",];


async function fetchUserProfile () {

  const result = await fetch("http://localhost:8001/api/profileinfo" , {

    method : "GET",
    credentials : "include",
    headers : ({
      'Content-type' : 'application/json'
    })

  })

const msg = await result.json();

 setcity(msg.message.city);
 setcountry(msg.message.country);
 setfullname(msg.message.full_name);
 setprofession(msg.message.profession);
 setprofilepicture(msg.message.profile_picture);
 setreligion(msg.message.religion)

}



useEffect(() => {

  fetchUserProfile();

} , [])


function EditPP() {

  setEditProfilepicture(true)
}

function EditFullName() {

  setEditFullname(true)
}



function EditCountry() {

  setEditCountry(true)
}

function EditCity() {

  setEditCity(true)
}

function EditProffesion() {

  setEditProfession(true)

}

function EditReligion() {

  setEditReligion(true)

}


async function AfterChanges(data : any) {

  const userFullname : string  = data.fullname?.toLowerCase().trim();
  const userProfession : string  = data.profession?.toLowerCase().trim();
  const userCountry : string  = data.countryname?.toLowerCase().trim();
  const userCity : string  = data.cityname?.toLowerCase().trim();
  const userReligion : string  = data.religion?.toLowerCase().trim();

    if (userFullname?.length < 5 || userFullname?.length > 100) {

     return toast.error("Full name must be between 5 characters to 100 characters")

    }


    if (/^[a-zA-Z ]+$/.test(userFullname) === false) {

      return toast.error("Fullname Cannot contain numbers and symbols")
    }


    if (/^[a-zA-Z ]+$/.test(userProfession) === false) {

     return toast.error("Name of the Profession Cannot contain numbers and symbols.")

    }


    if (/^[a-zA-Z ]+$/.test(userCountry) === false) {

      return toast.error("Country name Cannot contain numbers and symbols.")

    }


  if (userCountry?.length < 4 || userCountry?.length > 100) {

    return toast.error("Country name should not be more than 100 characters and less than 4")
  }


    if (userCity?.length < 1 || userCity?.length > 100) {

    return  toast.error("City name should not be more than 100 characters and less than 1")

   }



    if (/^[a-zA-Z ]+$/.test(userReligion) === false) {

      return toast.error("religion name cannot contain numbers and symbols.")

    }


    if (allowedRelgion.includes(userReligion) === false) {

      return toast.error(`${userReligion} is not a supported religion. Supported options are : Islam, Christianity, Buddhism, Hinduism, Unaffiliated, Other.`)

    }



  const multipartFormData = new FormData();
   multipartFormData.append("profession" , userProfession)
   multipartFormData.append("fullname" , userFullname)
   multipartFormData.append("city" , userCity)
   multipartFormData.append("country" , userCountry)
   multipartFormData.append("religion" , userReligion)
   multipartFormData.append("profilepic" , profilepicture)


   const result = await fetch("http://localhost:8001/api/profileinfo" , {
    method : "PATCH",
    credentials : "include",
    body : multipartFormData

   })

   console.log(result);

  return toast.success("Details Changed Sucessfully")



} // After Chnages Function Scope Ends Here.


return <div className="universal-div">


<form onSubmit={handleSubmit(AfterChanges)}>

<h1>Feel Free To Change Your Profile Details.</h1>

<img className="profile-image" src={`http://localhost:8001/profilepicture/${profilepicture}`} alt="profile_picture" />
<button type="button" onClick={EditPP}><IoPencil/> </button>

{editprofilepicture === true ? <div className="upload-container">

<input className="input-file-field" type="file" {...register("profilepic")}/>
<button className="update-btns">Submit</button>

</div>  : ""}


<h2 style={{color : "white"}}> Fullname : {fullname}</h2>
<button onClick={EditFullName} type="button"> <IoPencil /> </button>

{editfullname === true ? <>

<input className="update-inputs" type="text" placeholder="what do you want us to call you" {...register("fullname")}/>
<button className="update-btns">update</button>

</> : ""}



<h2 style={{color : "white"}}>City Name : {city}</h2>
<button type="button" onClick={EditCity}><IoPencil /></button>

{editcity === true ? <>

<input className="update-inputs" type="text" placeholder="Enter Your City Name"  {...register("cityname")}/>
<button className="update-btns" >update</button>

</> : ""}


<h2 style={{color : "white"}}>Country Name : {country}</h2>
 <button onClick={EditCountry} type="button" ><IoPencil /></button>

{editcountry === true ? <>

<input className="update-inputs" type="text" placeholder="Enter Your Country Name" {...register("countryname")}/>
<button className="update-btns">update</button>

</> : ""}


<h2 style={{color : "white"}}>Religion : {religion}</h2>
 <button onClick={EditReligion} type="button"><IoPencil /></button>

{editreligion === true ? <>

<input className="update-inputs" type="text" placeholder="Which Religion Do You Follow."  {...register("religion")}/>
<button className="update-btns" >update</button>

</> : ""}

<h2 style={{color : "white"}}>Profession : {profession}</h2>
<button onClick={EditProffesion} type="button" ><IoPencil /></button>

{editprofession === true ? <>

<input className="update-inputs" type="text" placeholder="What's your profession ?" {...register("profession")}/>
<button className="update-btns" >update</button>


</> : ""}

</form>

</div>



}



export default ChangeProfileDetails;
