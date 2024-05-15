// TODO OPTIMIZE CODE AND MAKE BOTH IN ONE COMPONENT

import { Heading } from "@chakra-ui/react";
import LineChart from "components/lineChart";
import Form from "layouts/accountDetails/components/Form";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DeletedAccountDetails: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state)
      // TODO CALL API TO GET ACCOUNT/ID AND REDIRECT IF IT DOESN'T EXIT
      // TODO REMOVE THE STATE SENT ON NAVIGATION AND HANDLE IT ONLY WITH THE API WAY
      navigate(`/accounts`);
  }, []);

  return (
    <div>
      <Heading fontWeight="medium" size="md">
        Account Details
      </Heading>
      <Form data={state?.data} />
      {state?.data?.historyBalance?.length > 2 && (
        <LineChart data={state?.data?.historyBalance} />
      )}
    </div>
  );
};

export default DeletedAccountDetails;
