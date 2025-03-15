import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";
import MetaData from "../MetaData/MetaData";
import { useAlert } from "react-alert";
import CheckoutSteps from "../CartComponents/CheckoutSteps";
import { useNavigate, useParams } from "react-router-dom";
import { Country, State } from "country-state-city";
import { PinDrop, Home, LocationCity, Public, Phone, TransferWithinAStation } from "@material-ui/icons";

const InputField = ({ icon: Icon, type, placeholder, value, onChange, required, size }) => (
  <div>
    <Icon />
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} required={required} size={size} />
  </div>
);

const SelectField = ({ icon: Icon, value, onChange, options, defaultOption }) => (
  <div>
    <Icon />
    <select required value={value} onChange={onChange}>
      <option value="">{defaultOption}</option>
      {options.map(({ isoCode, name }) => (
        <option key={isoCode} value={isoCode}>{name}</option>
      ))}
    </select>
  </div>
);

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { cartId } = useParams();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length !== 10) {
      alert.error("Phone Number should be 10 digits long");
      return;
    }
    
    dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
    navigate(`/order/confirm/${cartId === "myCart" ? "myCart" : cartId}`);
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />
      <section style={{ paddingTop: "120px" }}>
        <CheckoutSteps activeStep={0} />
        <div className="shippingContainer">
          <div className="shippingBox">
            <h2 className="shippingHeading">Shipping Details</h2>
            <form className="shippingForm" onSubmit={shippingSubmit}>
              <InputField icon={Home} type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
              <InputField icon={LocationCity} type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
              <InputField icon={PinDrop} type="number" placeholder="Pin Code" value={pinCode} onChange={(e) => setPinCode(e.target.value)} required />
              <InputField icon={Phone} type="number" placeholder="Phone Number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required size="10" />
              
              <SelectField icon={Public} value={country} onChange={(e) => setCountry(e.target.value)} options={Country.getAllCountries()} defaultOption="Country" />

              {country && (
                <SelectField icon={TransferWithinAStation} value={state} onChange={(e) => setState(e.target.value)} options={State.getStatesOfCountry(country)} defaultOption="State" />
              )}

              <input type="submit" value="Continue" className="shippingBtn" disabled={!state} />
            </form>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Shipping;
