import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import Form from "./components/Form";
import LineChart from "./components/LineChart";
import { useAccountDetails, useQuery } from "./hooks";
import Spinner from "shared/components/Spinner";

const AccountDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { account, isPending, isError } = useAccountDetails(
    parseInt(id || "0", 10)
  );
  const navigate = useNavigate();
  const query = useQuery();
  const mode = query.get("mode");

  if (isError) navigate("/accounts");

  const onSubmit = (values: any) => {};

  return isPending ? (
    <Spinner />
  ) : (
    <div>
      <Heading fontWeight="medium" size="md">
        Account Details
      </Heading>
      <Form onSubmit={onSubmit} data={account} isReadOnly={mode === "view"} />
      {account && account.historyBalance?.length > 1 && (
        <LineChart data={account.historyBalance} />
      )}
    </div>
  );
};

export default AccountDetails;
