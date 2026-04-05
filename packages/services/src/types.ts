export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
  code?: string;
  success: boolean;
  status: number;
}

export interface R2BucketLike {
  put(
    key: string,
    value: ReadableStream | ArrayBuffer | Blob | string,
    options?: object,
  ): Promise<unknown>;
  get(key: string): Promise<{
    body: ReadableStream;
    httpEtag: string;
    writeHttpMetadata(h: Headers): void;
  } | null>;
  head(key: string): Promise<unknown | null>;
  delete(key: string | string[]): Promise<void>;
}

export interface KVNamespaceLike {
  get(key: string, type: "json"): Promise<unknown>;
  get(key: string, type?: "text"): Promise<string | null>;
  put(
    key: string,
    value: string,
    options?: { expirationTtl?: number },
  ): Promise<void>;
  delete(key: string): Promise<void>;
}

export type PaginatedResult<T> = {
  data: T[];
  nextCursor: string | null; // pass this as cursor for next page
  prevCursor: string | null; // pass this for previous page
  hasMore: boolean;
};

export interface GetRoomsFilters {
  city?: string;
  state?: string;
  isPublished?: boolean;
  cursor?: string;
  limit?: number;
  minPrice?: string;
  maxPrice?: string;
  isActive?: boolean;
}
export interface HostApplicationInput {
  businessName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  govtIdKey: string;
  cacDocKey: string;
  bankName: string;
  bankAccount: string;
  bankCode: string;
  accountHolderName: string;
}
