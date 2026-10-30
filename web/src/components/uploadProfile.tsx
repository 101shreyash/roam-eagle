import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function UploadProfile() {

 let profileInfo =  useLocation();

  let {register , handleSubmit} = useForm();
  let navigate = useNavigate();


  interface UserInfo {

    full_name : string,
    country : string,
    city : string,
    profession : string,
    religion : string,


  }

  const userinfo : UserInfo = profileInfo.state

  async function AfterUpload(data : any) {
    const profilepic = data.profile[0]


    const WholeInfo = new FormData()

      WholeInfo.append("fullname" , userinfo.full_name)
      WholeInfo.append("country" , userinfo.country)
      WholeInfo.append("city" , userinfo.city)
      WholeInfo.append("profession" , userinfo.profession)
      WholeInfo.append("religion" , userinfo.religion)
      WholeInfo.append("profilepic" , profilepic)


    try {

      const result = await fetch("http://localhost:8001/api/profileinfo" , {

        method : "POST",
        body : WholeInfo,
        credentials : "include",
      })


      const msg = await result.json()

      if (msg.success === true , result.status === 200) {

        toast.success(`Welcome to the platform ${userinfo.full_name}`)
       return navigate("/myprofile");

      }


    }

    catch (error) {

    console.log(error);
    return  toast.error("Internal Server Error");

    }


  }


  return (
    <div className="universal-div">
      <h1 className="main-heading">Upload Your Profile Picture</h1>

      <form onSubmit={handleSubmit(AfterUpload)}>
        <div className="upload-container">
          <input type="file" className="input-file-field" {...register("profile")} required/> &nbsp; &nbsp;
          <button className="get-in-btn">Upload</button>

        </div>
      </form>
    </div>
  );
}

export default UploadProfile;
