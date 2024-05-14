// TODO OPTIMIZE CODE AND MAKE BOTH IN ONE COMPONENT

import Form from "layouts/accountDetails/components/Form";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DeletedAccountDetails: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state)
      // TODO CALL API TO GET ACCOUNT/ID AND REDIRECT IF IT DOESN'T EXIT
      navigate(`/accounts`);
  }, []);

  console.log("=====", !!state);
  return (
    <div>
      <Form data={state?.data} />
    </div>
  );
};

export default DeletedAccountDetails;
