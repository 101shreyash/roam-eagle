import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Signup() {
  const { register, handleSubmit , reset } = useForm();

  let navigate = useNavigate();


  async function AfterSubmit(data : any) {


    const email : string = data.email.toLowerCase().trim();
    const password : string = data.password
    const role : string = data.role.toLowerCase().trim();

    console.log(data);



    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) === false) {

      reset();
      return toast.error("Signup Failed , Enter valid email adress" , {duration : 2500});

    }

    if (password.length < 8) {

      return toast.error("Signup Failed , Password Must Be of 8 Characters or Longer" , {duration : 2700});

    }

    if (role!== "applicant" && role!== "landlord") {

      return toast.error("Role should be either landlord or applicant" , {duration : 2700});

    }


    try {

    const result = await fetch("http://localhost:8001/auth/signup" , {

    method : "POST",
    body : JSON.stringify({email : email , password : password , role : role}),
    headers : ({
      'Content-Type' : "application/json"
    })

  })

  const msg = await result.json()

  if (result.status === 409 && msg.success === false) {

   toast.error("Email alredy exits try with another one.");
    return reset();

  }

  if (result.status === 200 && msg.message === "Signup Sucessfull" && msg.success === true) {

  toast.success("Signup Sucessfull" , {duration : 2000})
   return  navigate("/login")

  }


  }

  catch (error) {

    console.log(error);
     return toast.error("Internal Server Error")

  }



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

<h2 className="main-heading" style={{fontSize : "20px"}}>Define Your Role</h2>

<label>
  <input type="radio" {...register("role")} required value="applicant"/> applicant
</label>
<label>
  <input type="radio" {...register("role")} required value="landlord" /> landlord
</label>

      <br /><br /><br /><br />
        <button className="get-in-btn" type="submit">Signup</button>
        <p> Alredy Have an account ? <Link to="/login" className="footer-links"> Login </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
