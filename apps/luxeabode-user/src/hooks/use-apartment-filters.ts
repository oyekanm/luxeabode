// apps/user-app/src/hooks/use-apartment-filters.ts
"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";

export function useApartmentFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filters: QueryFilters = {
    cursor: searchParams.get("cursor") ?? undefined,
    city: searchParams.get("city") ?? undefined,
    state: searchParams.get("state") ?? undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
  };

  const updateUrl = useCallback(
    (updates: Partial<QueryFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [searchParams, pathname, router],
  );

  const goToNext = useCallback(
    (nextCursor: string) => {
      updateUrl({ cursor: nextCursor });
    },
    [updateUrl],
  );

  const goToPrev = useCallback(
    (prevCursor: string | null) => {
      // null prevCursor means we're back to page 1 — remove cursor from URL
      if (!prevCursor) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("cursor");
        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
      } else {
        updateUrl({ cursor: prevCursor });
      }
    },
    [updateUrl, searchParams, pathname, router],
  );

  const setFilter = useCallback(
    (
      key: keyof Omit<QueryFilters, "cursor">,
      value: string | number | undefined,
    ) => {
      // reset cursor when filter changes — go back to page 1 of new filter
      const params = new URLSearchParams(searchParams.toString());
      params.delete("cursor");
      if (value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [searchParams, pathname, router],
  );

  const clearFilters = useCallback(() => {
    startTransition(() => router.push(pathname, { scroll: false }));
  }, [pathname, router]);

  return {
    filters,
    goToNext,
    goToPrev,
    setFilter,
    clearFilters,
    isPending,
  };
}
