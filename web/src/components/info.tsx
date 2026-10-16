import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  let navigate = useNavigate();

  let { register, handleSubmit } = useForm();

  async function AfterSubmit(data: any) {

    const fullname: string = data.full_name.toLowerCase().trim();
    const country: string = data.country.toLowerCase().trim();
    const city: string = data.city.toLowerCase().trim();
    const profession: string = data.profession.toLowerCase().trim();
    const religion: string = data.religion.toLowerCase().trim();

    if (profession.length < 2 || profession.length > 100) {
      return toast.error(
        "Don't extend your profession name to more than 100 characters and less than 2",
        { duration: 2500 },
      );
    }

    if (/^[a-zA-Z ]+$/.test(profession) === false) {
      return toast.error(
        "Name of the profession cannot contain numbers and symbols.",
        { duration: 2500 },
      );
    }

    if (fullname.length < 5 || fullname.length > 100) {
      return toast.error(
        "Full name must be between 5 characters to 100 characters.",
        { duration: 2500 },
      );
    }

    if (/^[a-zA-Z ]+$/.test(fullname) === false) {
      return toast.error("Fullname Cannot contain numbers and symbols.", {
        duration: 2500,
      });
    }

    if (/^[a-zA-Z ]+$/.test(country) === false) {
      return toast.error("Country name cannot contain numbers and symbols", {
        duration: 2500,
      });
    }

    if (country.length < 4 || country.length > 100) {
      return toast.error(
        "Country name should not be less than 4 characters and more than 100",
        { duration: 2500 },
      );
    }

    if (city.length < 1 || city.length > 100) {
      return toast.error(
        "City name should not be more than 100 characters and less than 1",
        { duration: 2500 },
      );
    }


    return navigate("/uploadprofile" , {state : data})


  }

  return (
    <div style={{ marginTop: "5%" }}>
      <h1 className="main-heading">Lets us Know More About You !</h1>

      <form onSubmit={handleSubmit(AfterSubmit)}>
        <h2 className="aux-head">What Should We Call You ?</h2>
        <input
          type="text"
          placeholder="Your fullname..."
          className="form-fields"
          required
          {...register("full_name")}
        />
        <br />
        <br />
        <h2 className="aux-head"> Where Do You Live ?</h2>
        <input
          type="text"
          placeholder="Country Name"
          required
          style={{ height: "0.3in" }}
          {...register("country")}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="text"
          placeholder="City Name"
          required
          style={{ height: "0.3in" }}
          {...register("city")}
        />
        <br />
        <br />
        <h2 className="aux-head">What Do You Do For Living ?</h2>
        <input
          type="text"
          placeholder="eg..doctor , police officer , bodybuilder"
          className="form-fields"
          required
          {...register("profession")}
        />
        <br />
        <br />
        <h2 className="aux-head">Which Religion Do You Follow ?</h2>
        <select className="form-fields" required {...register("religion")}>
          <option hidden value="other">
            Select Below
          </option>
          <option>hinduism</option>
          <option>islam</option>
          <option>buddhism</option>
          <option>christianity</option>
          <option>unaffiliated</option>
          <option>other</option>
        </select>
        <br />
        <br />
        <button type="submit" className="get-in-btn">
          Get started
        </button>
      </form>
    </div>
  );
}

export default UserInfo;
