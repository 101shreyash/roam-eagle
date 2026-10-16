import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Login() {
  const { register, handleSubmit , reset } = useForm();

  let navigate = useNavigate();

  async function AfterSubmit(data: any) {

    const email : string = data.email
    const password : string = data.password

   if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) === false) {

    reset();
   return toast.error("Enter valid Email adress")
   }



   try {


    const result =  await fetch("http://localhost:8001/auth/login" , {

    method : "POST",
    credentials : "include",
    body : JSON.stringify({email : email , password : password}),
    headers : ({
      'Content-Type' : 'application/json'
    })

  })


  const msg = await result.json()
  console.log(msg);

  if (result.status === 401 && msg.success === false ) {

   reset();
   return toast.error("Username or Password Didn't matched")

  }


  if (result.status === 200 && msg.success === true) {

    navigate("/userinfo")
    return toast.success("Login Sucessfull" , {duration : 2000})

  }


   }



   catch (error) {

     toast.error("Internal Server Error")
     return reset();


   }

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
          {...register("email")}/>
        <br /><br />
        <input className="input-field"
          type="password"
          placeholder="Enter your password"
          required
          {...register("password")}/>
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
