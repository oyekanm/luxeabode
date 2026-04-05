import {
  addCachedData,
  deleteCachedData,
  getCachedData,
} from "@repo/services/cache";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { env } = getCloudflareContext();
    const kv = env.KV;
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const userId = searchParams.get("userId");

    console.log(userId, "userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "No user id provided" }), {
        status: 400,
      });
    }
    const cacheForm = await getCachedData(kv, `${userId}`);
    // const cacheForm = await kv.get(`form-${userId}`, 'json')

    console.log(cacheForm, "noform");

    return new Response(JSON.stringify(cacheForm || {}), { status: 200 });
  } catch (error) {
    console.log(error, "issue");
    return new Response(JSON.stringify({ error: "Form not found" }), {
      status: 404,
    });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { env } = getCloudflareContext();
    const kv = env.KV;
    const body = (await request.json()) as {
      userId: string;
      values: any;
    };
    const userId = body.userId;

    if (!userId) {
      return new Response(JSON.stringify({ error: "No user id provided" }), {
        status: 400,
      });
    }

    console.log(body, "body");

    await addCachedData(kv, `${userId}`, body.values, 1800);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.log(error, "issue");
    return new Response(JSON.stringify({ error: "Form not found" }), {
      status: 404,
    });
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const { env } = getCloudflareContext();
    const kv = env.KV;
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "No user id provided" }), {
        status: 400,
      });
    }
    await deleteCachedData(kv, `${userId}`);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.log(error, "issue");
    return new Response(JSON.stringify({ error: "Form not found" }), {
      status: 404,
    });
  }
};
