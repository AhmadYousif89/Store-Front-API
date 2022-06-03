import UpdatePassword from "./UpdatePassword";
import "./styles/profile.css";
import UserInfo from "./UserInfo";
import { RootStateOrAny, useSelector } from "react-redux";
import { useState } from "react";

function Profile() {
  const [showUpdatePassword, setShowUpdatePassword] = useState(false);

  const { user, isLoading } = useSelector(
    (state: RootStateOrAny) => state.auth,
  );

  return (
    <section className="profile-container">
      <h1 className="title">Profile</h1>
      <div className="user-profile">
        <UserInfo show={setShowUpdatePassword} user={user} />
        {showUpdatePassword && (
          <UpdatePassword user={user} isLoading={isLoading} />
        )}
      </div>
    </section>
  );
}

export default Profile;
