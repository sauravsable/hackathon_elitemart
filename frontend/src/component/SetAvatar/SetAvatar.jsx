import { useState, useEffect } from 'react';
import './SetAvatar.css';
// import '../../UserComponents/UpdateProfile.css';
import { FaWindowClose } from "react-icons/fa";
import {useDispatch,useSelector} from 'react-redux';
import { updateProfileImage } from '../../actions/userActions';
import { clearErrors } from '../../actions/userActions';
import { UPDATE_PROFILEIMAGE_RESET } from '../../constants/userConstants';
import { loadUser } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import ClipLoader from "react-spinners/ClipLoader";

export default function SetAvatar({ show, setShow }) {
  const dispatch = useDispatch();
  const { error, isUpdated,loading} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const alert = useAlert();

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const closeModal = () => {
    setShow(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated === true) {
      alert.success("Profile Image Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({type: UPDATE_PROFILEIMAGE_RESET});
    }
  }, [dispatch, error, alert,isUpdated,navigate]);

  if (!show) {
    return null;
  }

  const updateProfileDataChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Selected file is not an image.");
    }
  };

  const profileImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("avatar",avatar);
    dispatch(updateProfileImage(formData));
  };

  return (
    <>
      <div className="modalWrapper">
        <div className="modal">
          <p className="closebtn" onClick={closeModal}>
            <FaWindowClose />
          </p>
            <div id="updateProfileImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input type="file"name="avatar" accept="image/*" onChange={updateProfileDataChange}/>
              <button type="submit" className="profileImagebtn" disabled={loading} onClick={profileImageSubmit}>
                {loading ? <ClipLoader size={20} color={"#fff"} /> : 'Update Profile Image'}
              </button>
            </div>
        </div>
      </div>
    </>
  );
}
