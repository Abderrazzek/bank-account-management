import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import Form from "./components/Form";
import LineChart from "./components/LineChart";

interface AccountDetailsProps {
  // Define props here
}

const AccountDetails: React.FC<AccountDetailsProps> = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state)
      // TODO CALL API TO GET ACCOUNT/ID AND REDIRECT IF IT DOESN'T EXIT
      // TODO REMOVE THE STATE SENT ON NAVIGATION AND HANDLE IT ONLY WITH THE API WAY
      navigate(`/accounts`);
  }, []);

  // Add component logic here
  // TODO: REDIRECT TO '/' IF THE ID IS UNDEFINED OR ISDESABLED=TRUE
  const onSubmit = (values: any) => {
    // TODO HANDLE SUBMIT HERE API CALL
    window.alert(JSON.stringify(values, null, 2));
  };

  return (
    <div>
      <Heading fontWeight="medium" size="md">
        Account Details
      </Heading>
      <Form
        onSubmit={onSubmit}
        data={state.data}
        isReadOnly={state.isReadOnly}
      />
      {state?.data?.historyBalance?.length > 1 && (
        <LineChart data={state?.data?.historyBalance} />
      )}
    </div>
  );
};

export default AccountDetails;
