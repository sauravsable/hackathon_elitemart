import { useState, useEffect } from 'react';
import './AcceptInvitation.css';
import logo from '../../images/logo (2).png';
import { useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { acceptCartInvitation, rejectCartInvitation,clearErrors, getCartDetails } from '../../actions/cartActions';
import { ACCEPT_INVITATION_RESET, REJECT_INVITATION_RESET } from '../../constants/cartConstants';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

export default function AcceptInvitation() {
  const location = useLocation();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [cartName, setCartName] = useState('');
  const [username, setUsername] = useState('');
  const [cartId, setCartId] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  const {error,isAccepted,isRejected} = useSelector((state)=>state.invitation);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setCartName(params.get('cartName'));
    setUsername(params.get('username'));
    setCartId(params.get('cartId'));
    setUserId(params.get('userId'));
    setToken(params.get('token'));
  }, [location.search]);

  const acceptInvitationHandler = () => {
    dispatch(acceptCartInvitation({ cartId, userId, token }));
  };

  const rejectInvitationHandler = () => {
    dispatch(rejectCartInvitation({ cartId, userId, token }));
  };

  useEffect(()=>{
      if(error){
        alert.error(error);
        dispatch(clearErrors())
      }
  
      if (isAccepted === true) {
        alert.success("Invitation Accepted Successfully");
        dispatch({type: ACCEPT_INVITATION_RESET});
        navigate(`/cart/${cartId}`);
        dispatch(getCartDetails(cartId));
      }
   
      if (isRejected === true) {
        alert.success("Invitation Rejected");
        dispatch({
          type: REJECT_INVITATION_RESET,
        });
        navigate('/');
      }
  },[dispatch,error,alert,isAccepted,isRejected,navigate,cartId]);

  return (
    <div className="accept-invitation">
      <img src={logo} alt="Company Logo" className="company-logo" />
      <h2>You have been invited by <strong>{username}</strong> to join the cart <strong>{cartName}</strong>.</h2>
      <div style={{ display: "flex", gap: "30px" }}>
        <button onClick={acceptInvitationHandler}>Accept Invitation</button>
        <button onClick={rejectInvitationHandler}>Reject Invitation</button>
      </div>
    </div>
  );
}
