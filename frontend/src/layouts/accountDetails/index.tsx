import React from "react";
import Form from "./components/Form";

interface AccountDetailsProps {
  // Define props here
}

const AccountDetails: React.FC<AccountDetailsProps> = (props) => {
  // Add component logic here
  // TODO: REDIRECT TO '/' IF THE ID IS UNDEFINED OR ISDESABLED=TRUE
  const onSubmit = (values: any) => {
    // TODO HANDLE SUBMIT HERE API CALL
    window.alert(JSON.stringify(values, null, 2));
  };

  return (
    <div>
      <Form />
    </div>
  );
};

export default AccountDetails;
