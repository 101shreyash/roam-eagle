import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Signup() {
  const { register, handleSubmit } = useForm();

  let navigate = useNavigate();

  function AfterSubmit(data: any) {
    console.log(data);
    navigate("/login")
    toast.success("Signup Sucessfull" , {duration : 2000})

  }


  return (
    <div className="universal-div">
      <h1 className="main-heading" style={{fontSize : "30px"}}>Signup Now To Get Strated !</h1>
      <br />
      <form onSubmit={handleSubmit(AfterSubmit)}>
        <input type="text" placeholder="Enter your email"  required  {...register("email")} className="input-field"/>
        <br /><br />
        <input type="password"  placeholder="Enter your password" required {...register("password")} className="input-field"/>
       <br /><br />
     <input type="text" placeholder="Enter your role" className="input-field" required {...register("role")}/>
      <br /><br />
        <button className="get-in-btn" type="submit">Signup</button>
        <p> Alredy Have an account ? <Link to="/login" className="footer-links"> Login </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
