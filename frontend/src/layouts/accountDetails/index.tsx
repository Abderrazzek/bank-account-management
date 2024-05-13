import React from "react";

import AccountFundTransfer from "./components/AccountFundTransfer";

interface AccountDetailsProps {
  // Define props here
}

const AccountDetails: React.FC<AccountDetailsProps> = (props) => {
  // Add component logic here
  // TODO: REDIRECT TO '/' IF THE ID IS UNDEFINED OR ISDESABLED=TRUE

  return (
    <div>
      <AccountFundTransfer />
    </div>
  );
};

export default AccountDetails;
