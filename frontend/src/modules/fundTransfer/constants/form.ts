import * as Yup from "yup";

export const initialValues = {
  senderId: "",
  receiverId: "",
  currency: "",
  amount: 0,
};

export const validationSchema = Yup.object({
  senderId: Yup.string()
    .required("Sender ID is required")
    .min(1, "Sender ID must be at least 1 character long"),
  receiverId: Yup.string()
    .required("Receiver ID is required")
    .min(1, "Receiver ID must be at least 1 character long")
    .notOneOf(
      [Yup.ref("senderId")],
      "Sender and receiver IDs must be different"
    ),
  currency: Yup.string()
    .required("Currency is required")
    .length(3, "Currency must be 3 characters long"),
  amount: Yup.number()
    .required("Amount is required")
    .min(1, "Amount must be greater than or equal to 0"),
});
