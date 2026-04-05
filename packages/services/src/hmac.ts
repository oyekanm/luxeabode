// packages/services/src/hmac.ts

const ALGORITHM = { name: "HMAC", hash: "SHA-256" };

async function getKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    ALGORITHM,
    false,
    ["sign", "verify"],
  );
}

// sign a value — called when creating session
export async function signValue(
  value: string,
  secret: string,
): Promise<string> {
  const key = await getKey(secret);
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign(
    ALGORITHM.name,
    key,
    encoder.encode(value),
  );
  // convert to base64 for cookie storage
  const base64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return `${value}.${base64}`;
}

// verify and extract — called on every request
export async function verifyValue(
  signed: string,
  secret: string,
): Promise<string | null> {
  const lastDot = signed.lastIndexOf(".");
  if (lastDot === -1) return null;

  const value = signed.substring(0, lastDot);
  const signature = signed.substring(lastDot + 1);

  // re-sign the value and compare
  const expected = await signValue(value, secret);
  const expectedSig = expected.substring(expected.lastIndexOf(".") + 1);

  // timing-safe comparison — prevents timing attacks
  if (signature.length !== expectedSig.length) return null;

  let diff = 0;
  for (let i = 0; i < signature.length; i++) {
    diff |= signature.charCodeAt(i) ^ expectedSig.charCodeAt(i);
  }

  return diff === 0 ? value : null; // null means tampered
}

// on login
// const sessionId = createId()
// const signed = await signValue(sessionId, process.env.AUTH_SECRET!)
// setCookie('session', signed)    // stored in cookie

// // on every request
// const cookie = getCookie('session')
// const sessionId = await verifyValue(cookie, process.env.AUTH_SECRET!)
// // if null → tampered, reject immediately — zero network call
// // if valid → use sessionId to look up KV
