import "./App.css";
import { useState } from "react";

function App() {
  const [friendName, setFreindName] = useState("");
  const [friendImage, setFriendImage] = useState("");
  const [balance, setBalance] = useState(0);
  const [lists, setList] = useState([]); //list to stor all friend info

  function handleAddList(list) {
    setList((lists) => [...lists, list]);
  }

  return (
    <>
      <FriendList lists={lists} />
      <AddFriend
        setFreindName={setFreindName}
        friendName={friendName}
        friendImage={friendImage}
        setFriendImage={setFriendImage}
        handleAddList={handleAddList}
        balance={balance}
      />
      <SplitBill friendName={friendName} />
    </>
  );
}
function FriendList({ lists }) {
  return (
    <div>
      <ul>
        {lists.map((list) => (
          <div>
            <img
              src={list.friendImage}
              alt="profile"
              style={{ width: "70PX", height: "70PX", borderRadius: "50%" }}
            />
            {list.friendName}
            <button>Select</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
function AddFriend({
  friendName,
  setFreindName,
  setFriendImage,
  friendImage,
  handleAddList,
  balance,
}) {
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      setFriendImage(URL.createObjectURL(file));
    }
  }
  function handleAdd(event) {
    event.preventDefault();
    const newFriend = { friendName, friendImage, balance, id: Date.now() };
    handleAddList(newFriend);
    setFreindName("");
    setFriendImage(null);
  }

  return (
    <form onSubmit={handleAdd}>
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
        onChange={handleImageChange}
        required
      />
      <div>
        <button>Add</button>
      </div>
    </form>
  );
}
function SplitBill({ friendName }) {
  return (
    <>
      <h1>Split Bill With {friendName}</h1>
      <h3>
        💰 Bill value <input type="number" />
      </h3>
      <h3>
        {" "}
        🙎‍♀️ Your expense <input type="number" />
      </h3>
      <h3>
        {" "}
        👭 {friendName}'s expense <input type="number" />
      </h3>
      🤑 Who is paying the bill?{" "}
      <select>
        <option>You</option> <option>{friendName}</option>
      </select>
    </>
  );
}

export default App;
