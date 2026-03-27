"use server";

import { auth } from "@/lib/auth";
import type { ApiResponse } from "@repo/services/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAction(
  formData: FormData,
): Promise<ApiResponse<string>> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const resp = await auth.api.signInEmail({ body: { email, password } });
    return { status: 200, success: true, message: "Sign in successful" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: 500, success: false };
    }
    return { status: 500, success: false, error: "An error occurred" };
  }
}

export async function signUpAction(
  formData: FormData,
): Promise<ApiResponse<string>> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const resp = await auth.api.signUpEmail({
      body: { name, email, password },
    });

    console.log(resp);
    return { status: 201, success: true, message: "Sign up successful" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, status: 500, success: false };
    }
    return { status: 500, success: false, error: "An error occurred" };
  }
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
}
