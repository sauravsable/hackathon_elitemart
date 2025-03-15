import Top from "../../component/Top/Top";
import "./Contact.css";
import MetaData from "../../component/MetaData/MetaData";

const ContactHeading = () => (
  <div className="section-heading">
    <h2>Say Hello. Don't Be Shy!</h2>
    <span>Details to details is what makes Hexashop different from the other themes.</span>
  </div>
);

const InputField = ({ name, type, placeholder, required }) => (
  <fieldset>
    <input name={name} type={type} id={name} placeholder={placeholder} required={required} />
  </fieldset>
);

const TextAreaField = ({ name, placeholder, required }) => (
  <fieldset>
    <textarea name={name} rows="6" id={name} placeholder={placeholder} required={required}></textarea>
  </fieldset>
);

const ContactForm = () => (
  <form id="contact" action="" method="post">
    <div className="row">
      <div className="col-lg-6">
        <InputField name="name" type="text" placeholder="Your name" required />
      </div>
      <div className="col-lg-6">
        <InputField name="email" type="text" placeholder="Your email" required />
      </div>
      <div className="col-lg-12">
        <TextAreaField name="message" placeholder="Your message" required />
      </div>
      <div className="col-lg-12">
        <button type="submit" id="form-submit" className="main-dark-button">
          <i className="fa fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </form>
);

export default function Contact() {
  return (
    <>
      <Top title="Contact" />
      <MetaData title="Contact Us -- EliteMart" />
      <div className="contact-us">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6">
              <ContactHeading />
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
