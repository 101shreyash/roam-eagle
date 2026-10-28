import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ListProperty() {

  let {register , handleSubmit} = useForm();

  let navigate = useNavigate();

  async function AfterSubmit(data : any) {

    const status : string = data.property_status
    const title : string = data.title
    const description : string = data.description
    const totalrooms : string = data.roomCount
    const country : string = data.country
    const city : string = data.city
    const postalCode : string = data.postalCode
    const monthlyPrice : number = data.monthlyPrice
    const negotiable : string = data.negotiable


  if (title.length > 100) {

   return toast.error("Title too Long !")

  }

   if (title.length < 10) {

    return toast.error("Title too short !")

  }


  if (description.length < 50) {

    return toast.error("description too short")
  }

  if (description.length > 2000) {

    return toast.error("Description too long !")
  }

if (/^[1-9][0-9]*$/.test(totalrooms) === false) {

  return toast.error(`${totalrooms} is not a valid room count`)
}

if (/^[a-zA-Z ]+$/.test(country) === false) {

  return toast.error("Country name cannot contain numbers and symbols")

}

if (country.length < 4) {

  return toast.error("Country Name cannot contain less than 4 characters")

}


if (/^[a-zA-Z0-9 ]+$/.test(city) === false) {

 return toast.error("City name cannot contain numbers and symbols")

}

if (postalCode.length < 3 || postalCode.length > 10) {

  return toast.error("Enter valid postal Code.")

}

if (monthlyPrice < 0) {

   return toast.error("Enter valid price")

}



try {


  const result = await fetch("http://localhost:8001/api/property" , {

  body : JSON.stringify({status : status , title : title , description : description , totalrooms : totalrooms , country : country , city : city , postalcode : postalCode , monthlyprice : monthlyPrice , negotiable : negotiable}),
  credentials : "include",
  method : "POST",
  headers : ({
    'Content-type' : 'application/json'
  })

  })


  const msg = await result.json();

if (msg.success === true && result.status === 200) {

 return navigate("/propertyvisuals")

}


}

catch (error) {

  console.log(error);
  toast.error("Server Error")


}


};


// End of After submit func scope

return <div className="universal-div">

<h1 className="main-heading">List Your Property</h1>
<form onSubmit={handleSubmit(AfterSubmit)}>

<h3 className="sub-heading" style={{color : "white"}}>Whats the current Status of your property ? </h3>

<label>
<input type="radio"  value="for_rent" required {...register("property_status")}/> For Rent
</label>

<label>
<input type="radio"  value="rented" required {...register("property_status")}/> Rented
</label>

<input className="input-field" type="text" placeholder="Title is required" required  {...register("title")}/>
<h3 className="sub-heading" style={{color : "white"}}> Add Further information about your property ? </h3>
<textarea placeholder="describe Your Property" required {...register("description")}></textarea>
<h3 className="sub-heading" style={{color : "white"}}> How Many Total Rooms Are Available ? </h3>
<input type="number" placeholder="total number of rooms" required min= "1" {...register("roomCount")}/>
<h3 className="sub-heading" style={{color : "white"}}> Which country is this property located in? </h3>
<input type="text" placeholder="Country Name is required" required {...register("country")}/>
<h3 className="sub-heading" style={{color : "white"}}> Which city is this property located in? </h3>
<input type="text" placeholder="City Name is required" required {...register("city")}/>
<h3 className="sub-heading" style={{color : "white"}}> What is the country's postal code? </h3>
<input type="text" placeholder="Country's postal Code" required {...register("postalCode")}/>
<h3 className="sub-heading" style={{color : "white"}}> What is the monthly cost of the property ? </h3>
<input type="number" placeholder="Montly price in $" required min= "1" {...register("monthlyPrice")}/>
<br /><br />


<h3 className="sub-heading" style={{color : "white"}}>Is the monthly price Negotiable ?</h3>

<label>
<input type="radio" value="true" {...register("negotiable")} required/> true
</label>
<label>
<input type="radio" value="false" {...register("negotiable")} required/> false
</label>

<button className="get-in-btn" type="submit">List Your Property</button>
</form>


</div>


}



export default ListProperty;

