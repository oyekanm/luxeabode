import z from "zod";

export const hostSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  phone: z.string().min(11, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  govtIdKey: z.string().min(1, "Government ID is required"),
  cacDocKey: z.string().min(1, "CAC Document is required"),
  bankName: z.string().min(1, "Bank name is required"),
  bankAccount: z.string().min(10, "Bank account number is required"),
  bankCode: z.string().min(1, "Bank code is required"),
  accountHolderName: z.string().min(1, "Account holder name is required"),
});

export type CreateHostInput = z.infer<typeof hostSchema>;
