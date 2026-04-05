// features/apartments/hooks/useFormPersist.ts
import type { UseFormReturn } from "@repo/ui/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export function useFormPersist(
  methods: UseFormReturn<any>,
  userId: string,
  route: string,
) {
  const [loaded, setLoaded] = useState(false);
  const { watch, reset, getValues } = methods;
  const debounce = useDebounce(1500);
  const router = useRouter();

  const handleCancel = async () => {
    try {
      await fetch(`/api/form-cache?userId=${userId}`, {
        method: "DELETE",
      });
      methods.reset();
      router.push(route);
    } catch (error) {
      console.log(error);
    }
  };

  // This watches the entire form for any change
  const values = watch();

  // Load from KV on initial mount
  useEffect(() => {
    async function loadCache() {
      setLoaded(false);
      try {
        const res = await fetch(`/api/form-cache?userId=${userId}`);
        const cachedData = await res.json();

        // ensure the data from cache is actually an object with data and not empty object
        // this helps to keep the form without distrupting it˝
        if (cachedData && Object.keys(cachedData).length > 0) {
          reset(cachedData, {
            keepDefaultValues: false,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoaded(true);
      }
    }
    loadCache();
  }, [userId, reset]);

  // Sync to KV (Debounced)
  useEffect(() => {
    if (!loaded || !methods.formState.isDirty) return;

    const saveCache = async () => {
      try {
        await fetch("/api/form-cache", {
          method: "POST",
          body: JSON.stringify({ userId, values }),
        });
      } catch (error) {
        console.log(error);
      }
    };

    debounce({
      cb: saveCache,
    });
  }, [values, userId]);

  return {
    handleCancel,
  };
}
