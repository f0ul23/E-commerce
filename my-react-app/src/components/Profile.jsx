import React from "react";

export default function Profile() {
  const auth = localStorage.getItem('user');

  return (
    <>
    <div className="profile">
      <h3><b><u>User Details</u></b></h3>
      <img
        src="https://www.nicepng.com/png/full/128-1280406_view-user-icon-png-user-circle-icon-png.png"
        alt="user image"
      />
      <div className="userdetails">
      <p style={{color:'#fff'}}><b>Username:</b> {(JSON.parse(auth).name)}</p>
      <p style={{color:'#fff'}}><b>Email: </b>{(JSON.parse(auth).email)}</p>
      </div>
    </div>
    </>
  );
}
