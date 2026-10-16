import { useState } from "react";



function FAQ() {

  let [questionOne , setQuestionOne] = useState("");
  let [questionTwo , setQuestionTwo] = useState("");
  let [questionThree , setQuestionThree] = useState("");
  let [questionFour , setQuestionFour] = useState("");
  let [questionFive, setQuestionFive] = useState("");
  let [questionSix, setQuestionSix] = useState("");

function QuestionOne() {

setQuestionOne("Our platform helps landlords list and manage their rental properties while allowing potential tenants to discover available properties and contact landlords directly. We aim to make property discovery and communication simpler, more transparent, and accessible.")

}


function QuestionTwo() {

  setQuestionTwo("Our platform is designed for landlords who want to advertise their properties and for potential tenants looking for a place to live. Landlords can manage their listings, while tenants can explore available rentals and connect directly with property owners.")

}

function QuestionThree() {

  setQuestionThree("No. We do not handle rent payments, security deposits, or any other financial transactions between landlords and tenants. All payments and financial arrangements are managed directly between the parties, who are responsible for verifying the details before proceeding..")

}

function QuestionFour() {

  setQuestionFour("Yes. Our platform helps potential tenants connect directly with landlords to discuss property details, availability, rental terms, and other relevant information. Any negotiations or agreements are made independently between the landlord and the tenant.")

}

function QuestionFive() {

  setQuestionFive("Users are responsible for independently verifying property ownership, listing accuracy, landlord and tenant identities, and relevant documentation. We recommend carefully checking all property details and confirming the legitimacy of a listing before making commitments or payments..")

}

function QuestionSix() {

  setQuestionSix("No. Our platform serves as a property listing and connection service only. We do not act as a real estate agent, broker, guarantor, or transaction intermediary, and we are not responsible for rental agreements, disputes, fraud, misrepresentation, or losses arising from interactions between users, to the extent permitted by applicable law. Landlords and tenants are responsible for their own decisions, agreements, and transactions..")

}



  return (
    <div>

      <h1 style={{ textAlign: "left" }} className="main-heading">
        Frequently Asked Questions .
      </h1>

      <div style={{ textAlign: "left" }} className="faq-container" onClick={QuestionOne}>
        <h1>What is this platform, and how does it work?</h1>
      </div>
      <p className="sub-heading" style={{textAlign : "left" , color : "white"}}>{questionOne}</p>
      <br />


      <div style={{ textAlign: "left" }} className="faq-container" onClick={QuestionTwo}>
        <h1>Who can use this platform?</h1>
      </div>
   <p className="sub-heading" style={{textAlign : "left" , color : "white"}}>{questionTwo}</p>
      <br />


      <div style={{ textAlign: "left" }} className="faq-container" onClick={QuestionThree}>
        <h1>Does the platform handle rent payments or security deposits?</h1>
      </div>
    <p className="sub-heading" style={{textAlign : "left" , color : "white"}}>{questionThree}</p>


      <br />


      <div style={{ textAlign: "left" }} className="faq-container" onClick={QuestionFour}>
        <h1>Can I contact a landlord directly through the platform?</h1>
      </div>
      <p className="sub-heading" style={{textAlign : "left" , color : "white"}}>{questionFour}</p>


      <br />
      <div style={{ textAlign: "left" }} className="faq-container" onClick={QuestionFive}>
        <h1>Are the property listings and landlords verified by the platform?</h1>
      </div>
      <p className="sub-heading" style={{textAlign : "left" , color : "white"}}>{questionFive}</p>


      <br />
      <div style={{ textAlign: "left" }} className="faq-container" onClick={QuestionSix}>
        <h1> Is the platform responsible for disputes, fraud, or rental agreements??</h1>
      </div>
      <p className="sub-heading" style={{textAlign : "left" , color : "white"}}>{questionSix}</p>



    </div>
  );
}

export default FAQ;
