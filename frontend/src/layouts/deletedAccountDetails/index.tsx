// TODO OPTIMIZE CODE AND MAKE BOTH IN ONE COMPONENT

import React from "react";
import { useLocation } from "react-router-dom";

const DeletedAccountDetails: React.FC = () => {
  const { state } = useLocation();
  console.log("=====", state.data);
  return (
    <div>
      <h1>Deleted Account Details</h1>
      {/* Add your content here */}
    </div>
  );
};

export default DeletedAccountDetails;
