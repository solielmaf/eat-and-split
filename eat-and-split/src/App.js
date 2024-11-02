import "./App.css";
import { useState } from "react";

function App() {
  const [friendName, setFreindName] = useState();
  const [friendImage, setFriendImage] = useState();
  const [isAdded, setIsAdded] = useState(false);
  const [lists, setList] = useState([]);
  function handleAdd() {
    setIsAdded(true);
    setFreindName("");
    setFriendImage("");
  }
  function handleAddList(list) {
    setList((lists) => [...lists, list]);
  }

  return (
    <>
      <FriendList friendImage={friendImage} isAdded={isAdded} />
      <AddFriend
        setFreindName={setFreindName}
        friendName={friendName}
        setFriendImage={setFriendImage}
        handleAdd={handleAdd}
      />
    </>
  );
}
function FriendList({ friendImage, isAdded }) {
  return (
    <div>
      <ul>
        <img
          src={friendImage}
          alt="profile"
          style={{ width: "70PX", height: "70PX", borderRadius: "50%" }}
        />
      </ul>
    </div>
  );
}
function AddFriend({ friendName, setFreindName, setFriendImage, handleAdd }) {
  return (
    <>
      <div>
        👭 Freind Name{" "}
        <input
          type="text"
          value={friendName}
          onChange={(e) => setFreindName(e.target.value)}
          required
        />
      </div>
      🌆 Image URL{" "}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFriendImage(URL.createObjectURL(e.target.files[0]))}
        required
      />
      <div>
        <button onClick={handleAdd}>Add</button>
      </div>
    </>
  );
}
function SplitBill() {}

export default App;
