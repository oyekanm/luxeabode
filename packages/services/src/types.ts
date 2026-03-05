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
