import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import Form from "./components/Form";
import LineChart from "./components/LineChart";
import { useAccountDetails, useQuery } from "./hooks";
import Spinner from "shared/components/Spinner";

const AccountDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { account, isPending, isError } = useAccountDetails(id || "0");
  const navigate = useNavigate();
  const query = useQuery();
  const mode = query.get("mode");

  if (isError) navigate("/accounts");

  return isPending ? (
    <Spinner />
  ) : (
    <div>
      <Heading fontWeight="medium" size="md">
        Account Details
      </Heading>
      <Form data={account} isReadOnly={mode === "view"} />
      {account && account.historyBalance?.length > 1 && (
        <LineChart data={account.historyBalance} />
      )}
    </div>
  );
};

export default AccountDetails;
