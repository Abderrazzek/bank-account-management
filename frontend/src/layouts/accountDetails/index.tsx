import React from "react";

import AccountFundTransfer from "./components/AccountFundTransfer";

interface AccountDetailsProps {
  // Define props here
}

const AccountDetails: React.FC<AccountDetailsProps> = (props) => {
  // Add component logic here

  return (
    <div>
      <AccountFundTransfer />
    </div>
  );
};

export default AccountDetails;
