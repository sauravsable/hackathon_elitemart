import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import "./GroupCartMembers.css";
import { useDispatch, useSelector } from "react-redux";
import {
  cartInvitation,
  getCartDetails,
  removeCartMember,
  clearErrors,
} from "../../actions/cartActions";
import {
  CART_INVITATION_RESET,
  REMOVE_CART_MEMBER_RESET,
} from "../../constants/cartConstants";
import ClipLoader from "react-spinners/ClipLoader";
import { useAlert } from "react-alert";
import profileImage from "../../images/Profile.png";
import { MdDeleteOutline } from "react-icons/md";

const UserItem = ({ user, onInvite, isLoading }) => (
  <div className="dropdown-item">
    <p style={{ margin: "0" }}>{user.name}</p>
    <button className="requestbutton" onClick={onInvite} disabled={isLoading}>
      {isLoading ? <ClipLoader size={20} color={"#fff"} /> : "Send Request"}
    </button>
  </div>
);

const MemberItem = ({ member, isAdmin, onRemove }) => (
  <div className="userDetaildiv">
    <img
      className="userDetailImage"
      src={member?.user?.avatar?.url || profileImage}
      alt={`${member?.user?.name || "User"}'s avatar`}
    />
    <div>{member.user.name}</div>
    <div style={{ textTransform: "capitalize" }}>
      {member.status === "canceled" && (
        <>
          <span style={{ paddingRight: "10px", margin: "0" }}>{member.status}</span>
          <MdDeleteOutline onClick={onRemove} style={{ cursor: "pointer" }} />
        </>
      )}
      {member.status === "pending" && <span>{member.status}</span>}
      {member.status === "accepted" && isAdmin && (
        <MdDeleteOutline onClick={onRemove} style={{ cursor: "pointer" }} />
      )}
    </div>
  </div>
);

export default function Members({ id }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loadingUserId, setLoadingUserId] = useState(null);

  const { user } = useSelector((state) => state.user);
  const { cartDetails } = useSelector((state) => state.newcart);
  const { users } = useSelector((state) => state.allUsers);
  const { error, isInvited, isRemoved } = useSelector((state) => state.invitation);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isInvited) {
      alert.success("Invitation Sent Successfully");
      dispatch({ type: CART_INVITATION_RESET });
      dispatch(getCartDetails(id));
      setLoadingUserId(null);
      setSearchQuery("");
    }

    if (isRemoved) {
      alert.success("Member Removed Successfully");
      dispatch({ type: REMOVE_CART_MEMBER_RESET });
      dispatch(getCartDetails(id));
    }
  }, [dispatch, error, isInvited, isRemoved, alert, id]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const fuse = new Fuse(users || [], {
    keys: ["name", "email"],
    threshold: 0.3,
  });

  const existingMemberIds = new Set(cartDetails?.members?.map((mem) => mem.user._id));

  const filteredUsers = debouncedSearch
    ? fuse.search(debouncedSearch).map((result) => result.item)
    : [];

  const availableUsers = filteredUsers.filter((u) => !existingMemberIds.has(u._id));

  const handleInvite = (e, invitedUser) => {
    e.preventDefault();
    setLoadingUserId(invitedUser._id);
    dispatch(cartInvitation({ cartId: id, userId: invitedUser._id, userEmail: invitedUser.email }));
  };

  const handleRemoveMember = (e, member) => {
    e.preventDefault();
    dispatch(removeCartMember({ cartId: id, userId: member._id }));
  };

  const loggedInUser = cartDetails?.members?.find((member) => member.user._id === user?._id);
  const isAdmin = loggedInUser?.role === "admin";

  return (
    <div className="adduserdiv">
      <h2 className="homeheading" style={{ textTransform: "capitalize" }}>Add Member</h2>

      <div className="dropdown">
        <input
          type="text"
          className="search-input"
          placeholder="Search User"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {debouncedSearch && (
          <div className="dropdown-content">
            {availableUsers.length > 0 ? (
              availableUsers.map((filteredUser) => (
                <UserItem
                  key={filteredUser._id}
                  user={filteredUser}
                  onInvite={(e) => handleInvite(e, filteredUser)}
                  isLoading={loadingUserId === filteredUser._id}
                />
              ))
            ) : (
              <div className="dropdown-item">
                <p style={{ margin: "0" }}>No users found</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="overflow-y-auto h-60">
        {cartDetails?.members?.length > 0 ? (
          cartDetails.members
            .filter((mem) => mem.user._id !== user?._id)
            .map((member) => (
              <MemberItem
                key={member.user._id}
                member={member}
                isAdmin={isAdmin}
                onRemove={(e) => handleRemoveMember(e, member.user)}
              />
            ))
        ) : (
          <div>No members found</div>
        )}
      </div>
    </div>
  );
}
