"use server";

import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  organisation: z.string().optional(),
  mobile: z.string().min(10, "Valid mobile number is required"),
});

export async function submitContactForm(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      organisation: formData.get("organisation"),
      mobile: formData.get("mobile"),
    };

    const validatedData = ContactSchema.parse(rawData);

    // TODO: Integrate email provider here (e.g., Resend, Nodemailer)
    // For now, simulating API delay and logging
    console.log("New Contact Request:", validatedData);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { success: true, message: "Request received successfully." };
  } catch (error) {
    console.error("Form validation failed", error);
    return { success: false, message: "Failed to submit request." };
  }
}
