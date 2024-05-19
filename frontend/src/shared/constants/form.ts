import * as Yup from "yup";

import { Account } from "shared/constants";

export const initialValues: Account = {
  id: 0,
  ownerId: 0,
  firstName: "",
  lastName: "",
  currency: "EUR",
  historyBalance: [],
  balance: 0,
  isDeleted: "false",
};

export const validationSchema = Yup.object({
  ownerId: Yup.number().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  currency: Yup.string().required(),
  balance: Yup.number().required().min(-200),
});
