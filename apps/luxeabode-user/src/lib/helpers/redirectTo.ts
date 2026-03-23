import { redirect } from "next/navigation";

export function redirectTo(path: string) {
  return redirect(path);
}
