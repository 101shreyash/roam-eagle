import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

function AddPropertyVisuals() {


 const location =  useLocation(); // state used from previous route add propertyinfo.
 const propertyid = location.state // contains propertyId

  let {register , handleSubmit , reset} = useForm();

  async function AfterSubmit(data : any) {

    const imagelength = data.propertyIMG.length

    if (imagelength < 2) {

       reset();
      return toast.error("Upload Atleast 2 Images of your Property")
    }

    if (imagelength > 4) {

      reset();
      return toast.error("Don't add to many images keep it between 2 to 4.")

    }

    const image1 = data.propertyIMG[0];
    const image2 = data.propertyIMG[1];
    const image3 = data.propertyIMG[2];
    const image4 = data.propertyIMG[3];

    const allPropertyImages = new FormData();
    allPropertyImages.append("propertyid" , propertyid) // the state is sent to the backend as a request body as properyId
    allPropertyImages.append("propertyPics" , image1)
    allPropertyImages.append("propertyPics" , image2)
    allPropertyImages.append("propertyPics" , image3)
    allPropertyImages.append("propertyPics" , image4)

    try {

     const result =  await fetch("http://localhost:8001/api/propertyvisuals" , {

        method : "POST",
        credentials : "include",
        body : allPropertyImages

      })


      const msg =  await result.json()
      console.log(msg);

    }

    catch (error) {

      toast.error("Server Error")
      console.log(error);

    }


  }


  return <div className="universal-div">

 <h1 className="main-heading"> Upload Images of Your Property </h1>

 <form onSubmit={handleSubmit(AfterSubmit)}>

 <input type="file" className="input-file-field"  {...register("propertyIMG")}  multiple/>
 <br /><br />
 <button type="submit" className="get-in-btn"> Upload </button>

 </form>

  </div>

}


export default AddPropertyVisuals;
