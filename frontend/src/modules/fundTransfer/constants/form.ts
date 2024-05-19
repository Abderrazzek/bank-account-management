import * as Yup from "yup";
import { FormValues } from "../models";

export const initialValues: FormValues = {
  senderId: 0,
  receiverId: 0,
  currency: "",
  amount: 0,
};

export const validationSchema = Yup.object({
  sender: Yup.number()
    .required()
    .test(
      "notSameAsReceiver",
      "Sender and receiver cannot be the same account",
      function (value) {
        const receiver = this.parent.receiver;
        return value !== receiver;
      }
    ),
  receiver: Yup.number()
    .required()
    .test(
      "notSameAsSender",
      "Sender and receiver cannot be the same account",
      function (value) {
        const sender = this.parent.sender;
        return value !== sender;
      }
    ),
  currency: Yup.string().required(),
  amount: Yup.number()
    .required()
    .min(0)
    .moreThan(0, "Amount must be greater than 0"),
});
