import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Login() {
  const { register, handleSubmit } = useForm();

  let navigate = useNavigate();

  function AfterSubmit(data: any) {
    console.log(data);
    navigate("/userinfo")
    toast.success("Login Sucessfull" , {duration : 2000})

  }


  return (
    <div className="universal-div">
      <h1 className="main-heading" style={{fontSize : "40px"}}>Login Now !</h1>
      <br />
      <form onSubmit={handleSubmit(AfterSubmit)}>
        <input className="input-field"
          type="text"
          placeholder="Enter your email"
          required
          {...register("email")}
        />{" "}
        <br /><br />
        <input className="input-field"
          type="password"
          placeholder="Enter your password"
          required
          {...register("password")}
        />{" "}
        <br /><br />
        <button className="get-in-btn" type="submit">Login</button>
        <p>
          New here in this platform ?{" "}
          <Link to="/signup" className="footer-links">
            {" "}
            Signup{" "}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
