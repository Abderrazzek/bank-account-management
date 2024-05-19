import React, { FC } from "react";
import { Flex, Spinner as ChakraSpinner } from "@chakra-ui/react";

const Spinner: FC = () => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <ChakraSpinner />
    </Flex>
  );
};

export default Spinner;
