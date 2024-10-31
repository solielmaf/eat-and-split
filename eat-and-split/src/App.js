import "./App.css";
import { useState } from "react";

function App() {
  const [friendName, setFreindName] = useState();
  const [friendImage, setFriendImage] = useState();

  return (
    <>
      <AddFriend
        setFreindName={setFreindName}
        friendName={friendName}
        setFriendImage={setFriendImage}
      />

      {/* <img
        src={friendImage}
        alt="profile"
        style={{ width: "70PX", height: "70PX", borderRadius: "50%" }}
  />*/}
    </>
  );
}
function FriendList() {}
function AddFriend({ friendName, setFreindName, setFriendImage }) {
  return (
    <>
      <div>
        👭 Freind Name{" "}
        <input
          type="text"
          value={friendName}
          onChange={(e) => setFreindName(e.target.value)}
        />
      </div>
      🌆 Image URL{" "}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFriendImage(URL.createObjectURL(e.target.files[0]))}
      />
    </>
  );
}
function SplitBill() {}

export default App;
