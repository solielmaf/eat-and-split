import "./App.css";
import { useState } from "react";

function App() {
  const mock = [
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ];

  const [selectedFr, setSelectedFr] = useState(null);
  const [showAddfriend, setShowAddfriend] = useState(false);
  const [lists, setList] = useState(mock); //list to stor all friend info

  function handleAddList(list) {
    setList((lists) => [...lists, list]);
    setShowAddfriend(false);
  }
  function isSplitOpen(list) {
    setSelectedFr((cur) => (cur?.id === list.id ? null : list));
    setShowAddfriend(false);
  }
  function addOpen() {
    setShowAddfriend(true);
  }
  function handleSplitBill(value) {
    setList((lists) =>
      lists.map((list) =>
        list.id === selectedFr.id
          ? { ...list, balance: list.balance + value }
          : list
      )
    );

    setSelectedFr(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          lists={lists}
          onSelection={isSplitOpen}
          selectedFr={selectedFr}
        />
        {showAddfriend && <AddFriend handleAddList={handleAddList} />}
        <button className="button" onClick={addOpen}>
          {showAddfriend ? "close" : "Add friend"}
        </button>
      </div>
      {selectedFr && (
        <SplitBill
          selectedFriend={selectedFr}
          key={selectedFr.id}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
function FriendList({ lists, selectedFr, onSelection }) {
  return (
    <ul>
      {lists.map((list) => (
        <Friend
          list={list}
          key={list.id}
          selectedFr={selectedFr}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}
function Friend({ list, onSelection, selectedFr }) {
  const isSelected = selectedFr?.id === list.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img
        style={{ width: "50px", height: "50px ", borderRadius: "50%" }}
        src={list.image}
        alt={list.name}
      />
      <h3>{list.name}</h3>

      {list.balance < 0 && (
        <p className="red">
          You owe {list.name} {Math.abs(list.balance)}€
        </p>
      )}
      {list.balance > 0 && (
        <p className="green">
          {list.name} owes you {Math.abs(list.balance)}€
        </p>
      )}
      {list.balance === 0 && <p>You and {list.name} are even</p>}

      <button className="button" onClick={() => onSelection(list)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}
function AddFriend({ handleAddList }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }
  function handleAdd(event) {
    event.preventDefault();
    const newFriend = {
      name,
      image,
      balance: 0,
      id: crypto.randomUUID(),
    };
    handleAddList(newFriend);
    setName("");
    setImage(null);
  }

  return (
    <form className="form-add-friend" onSubmit={handleAdd}>
      <label>👭 Freind Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label> 🌆 Image URL</label>
      <input
        style={{ width: "130px" }}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <div>
        <button className="button">Add</button>
      </div>
    </form>
  );
}

function SplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>👫 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <button className="button">Split bill</button>
    </form>
  );
}

export default App;
