import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";


function UploadProfile() {

 let profileInfo =  useLocation();

  let {register , handleSubmit , reset} = useForm();
  let navigate = useNavigate();

  function AfterUpload(data : any) {

    // console.log(data.profile); // ProfileImage


    reset();

     navigate("/uploadprofile")

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
