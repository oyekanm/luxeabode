import { apiClient } from "@/lib/api-client";
import { CreateHostInput } from "@/lib/validators/hostSchema";
import { getClientError } from "@repo/helpers/getClientError";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function useAddHost() {
  const router = useRouter();
  const addAdmin = async (form: CreateHostInput, resets: () => void) => {
    try {
      const resp = await apiClient.post("/host", form);

      toast.success(resp.message || "host account created");
      resets();
    } catch (error) {
      const apiError = getClientError(error);
      // console.log(apiError)
      toast.error(apiError?.message || "failed");
    }
  };

  return { addAdmin };
}
