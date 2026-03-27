// apps/user-app/src/hooks/use-apartment-filters.ts
"use client";
import { BookingFilters } from "@/lib/validators/bookingSchema";
import { Apartment } from "@repo/db";
import { differenceInDays } from "date-fns";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useTransition } from "react";

export function useBookingFilters(apartment: Apartment) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filters: BookingFilters = {
    startDate: searchParams.get("startDate") ?? "",
    endDate: searchParams.get("endDate") ?? "",
    totalCost: Number(searchParams.get("totalCost")) ?? 0,
    roomId: searchParams.get("roomId") ?? "",
    userId: searchParams.get("userId") ?? "",
    guest: searchParams.get("guest") ?? "",
  };

  const updateUrl = useCallback(
    (updates: Partial<BookingFilters>) => {
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

  const clearDates = useCallback(() => {
    updateUrl({ startDate: "", endDate: "" });
  }, []);

  const setFilter = useCallback(
    (key: keyof BookingFilters, value: string | number | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
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

  const updateTotalCost = (value: number) => {
    setFilter("totalCost", value);
  };

  const totalDays = useMemo(() => {
    const days = differenceInDays(
      new Date(filters.endDate),
      new Date(filters.startDate),
    );

    return days;
  }, [filters.endDate, filters.startDate]);

  const subTotalCost = useMemo(() => {
    return (value: number) => value * totalDays;
  }, [totalDays]);

  const totalCost = useMemo(() => {
    return (value: number) => value;
  }, [subTotalCost]);

  useEffect(() => {
    setFilter("roomId", apartment.id);
  }, [apartment.id]);

  useEffect(() => {
    if (filters.startDate && filters.endDate) {
      updateTotalCost(Number(filters.totalCost));
    }
  }, [totalCost]);

  return {
    filters,
    clearDates,
    setFilter,
    clearFilters,
    isPending,
    totalDays,
    totalCost,
    subTotalCost,
    updateUrl,
  };
}
