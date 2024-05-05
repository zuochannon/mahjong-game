import React, { useEffect, useState } from "react";
import profileImage from "../assets/default_pfp.png"; // Importing the profile image
import { NavigationBar } from "../components/NavigationBar";
import { useWhoAmIContext } from "../context/WhoAmIContext";

export function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gamesPlayed, setGamesPlayed] = useState([]);

  const { whoAmI } = useWhoAmIContext();

  useEffect(() => {
    setUsername(whoAmI?.username ?? "Guest");
    setEmail(whoAmI?.email ?? "GuestEmail");

    fetch(`${import.meta.env.VITE_SERVER}/gamelog/summary`, {
      method: "GET",
      credentials: "include",
    })
    .then(response => {
      if (response.ok)
        return response.json();

      throw new Error('Not logged in. No game history available.');
    })
    .then(data => setGamesPlayed(data ?? []))
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);


  return (
    <main className="h-screen bg-black">
      <NavigationBar />
      <div
        className="profile-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 className="bg-black text-3xl font-bold">User Profile</h1>
        </div>
        <div
          className="profile-info"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <img
            src={profileImage}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              marginRight: "20px",
            }}
          />
          <div>
            <h2>Username: {username}</h2>
            <h2>Email: {email}</h2>
            {/* <h2>Last Name: {user.lastName}</h2> */}
          </div>
        </div>
      </div>
      {gamesPlayed.map(el => <p>{JSON.stringify(el)}</p>)}
    </main>
  );
}
