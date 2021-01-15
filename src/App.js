import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import { FiShoppingCart } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [EditId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "" });

  const submitEvent = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Please Enter a  Name...");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === EditId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "Item Edited");
    } else {
      showAlert(true, "item added");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, msg = "") => {
    setAlert({ show, msg });
  };
  const removeItem = (id) => {
    showAlert(true, "remove item");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setName(specificItem.title);
    setEditId(id);
  };
  const clearAllData = () => {
    showAlert(true, "empty list");
    setList([]);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <div>
      <section className="container">
        <form onSubmit={submitEvent} className="form">
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h1>
            Grocery Bud <FiShoppingCart color="#20c3c3" />
          </h1>

          <div className="btninput">
            <input
              className="input"
              autoComplete="off"
              type="text"
              name="text"
              value={name}
              placeholder="eg. eggs..."
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submitbtn">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="main">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className="clearbtn" onClick={clearAllData}>
              Clear All{" "}
              <MdDeleteForever color="red" style={{ marginLeft: "10px" }} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
