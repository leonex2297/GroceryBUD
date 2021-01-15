import React from "react";
import { FiDelete } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";

const List = ({ items, removeItem, editItem }) => {
  console.log(items);
  return (
    <div>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <>
            <article className="item">
              <p key={id} className="itemname">
                {title}
              </p>
              <div className="buttons">
                <BiEdit className="editbtn" onClick={() => editItem(id)} />
                <FiDelete
                  className="removebtn"
                  onClick={() => removeItem(id)}
                />
              </div>
            </article>
          </>
        );
      })}
    </div>
  );
};

export default List;
