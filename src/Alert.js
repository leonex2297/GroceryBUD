import React, { useEffect } from "react";

const Alert = ({ msg, removeAlert, list }) => {
  console.log(msg);
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return (
    <div>
      <p
        style={{
          position: "absolute",
          margint: "5px",
          marginLeft: "10px",
          color: "#F27070",
        }}
      >
        {msg}
      </p>
    </div>
  );
};

export default Alert;
