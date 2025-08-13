import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, ListGroup, Button } from "react-bootstrap";
import { patchSubscription } from "../../../api/auth";

const box = { textAlign: "left", margin: "2px", padding: "5px" };
const button = { margin: "10px" };
const bgc = {
  backgroundColor: "lightgrey",
  marginTop: "20px",
  padding: "25px",
};
const password = {
  cursor: "pointer",
  textDecoration: "none",
  textAlign: "left",
  margin: "2px",
  padding: "5px",
  color: "teal",
};
const list = { listStyle: "none" };
const title = { fontSize: "40px", textAlign: "left", margin: "20px" };
const subtitle = { fontSize: "20px" };

const ExistingProfile = ({ profile, user, getProfile }) => {
  const [localProfile, setLocalProfile] = useState(profile);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalProfile(profile); // sync local profile if parent updates
  }, [profile]);

  const cancelSubscription = (event) => {
    event.preventDefault();

    // Instantly update UI
    setLocalProfile((prev) => ({ ...prev, isSubscribed: false }));

    // Update server in background
    patchSubscription(user)
      .then(() => {
        getProfile(); // Refresh from DB to be 100% sure
      })
      .catch((err) => {
        console.error(err);
        // Revert change if PATCH fails
        setLocalProfile(profile);
      });
  };

  return (
    <div className="container" style={bgc}>
      <h1 style={title}>Profile</h1>

      <div className="container" style={box}>
        <Card style={{ width: "18rem" }}>
          <Card.Header style={subtitle}>Account Details</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item style={box}>
              Name: {localProfile.name}
            </ListGroup.Item>
            <ListGroup.Item style={box}>
              Address: {localProfile.address}
            </ListGroup.Item>
            <ListGroup.Item style={box}>
              Subscription Status:{" "}
              {localProfile.isSubscribed
                ? "Currently Subscribed"
                : "Currently Not Subscribed"}
              {localProfile.isSubscribed && (
                <Button
                  variant="danger"
                  type="button"
                  onClick={cancelSubscription}
                  style={button}
                >
                  Cancel Subscription
                </Button>
              )}
            </ListGroup.Item>

            <Card.Link
              style={{ ...box, ...password }}
              onClick={() => navigate("/change-password")}
            >
              Change Password
            </Card.Link>
          </ListGroup>
        </Card>
      </div>

      <div className="container" style={box}>
        <Card style={{ width: "18rem" }}>
          <Card.Header style={subtitle}>Favorite Art Categories</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item style={list}>
              {localProfile.tags ? (
                localProfile.tags.map((tag, i) => <li key={i}>{tag.name}</li>)
              ) : (
                <li>Loading...</li>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>

      <Button
        onClick={() => navigate("/profile/edit")}
        variant="light"
        style={button}
      >
        Edit Profile
      </Button>
    </div>
  );
};

export default ExistingProfile;
