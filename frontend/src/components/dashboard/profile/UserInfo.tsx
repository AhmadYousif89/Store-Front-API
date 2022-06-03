import React from "react";
import { Users } from "../../../types/types";

type Props = {
  user: Users;
  show: any;
};

function UserInfo({ user, show }: Props) {
  return (
    <div className="user-info-container">
      <h3 className="title-user-info">User Info</h3>
      <section className="user-info">
        <div className="user-details">
          <span>Name</span> : <span>{user.name}</span>
        </div>
        <div className="user-details">
          <span>Email</span> : <span>{user.email}</span>
        </div>
        <button className="btn user-btn" onClick={() => show(true)}>
          Change your password
        </button>
      </section>
    </div>
  );
}

export default UserInfo;
