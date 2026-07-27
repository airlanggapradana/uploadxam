import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.NEXT_PUBLIC_VERCEL_ACCESS_TOKEN;
  const projectId = process.env.NEXT_PUBLIC_VERCEL_PROJECT_ID;

  if (!token || !projectId) {
    return NextResponse.json(
      { error: "Vercel token or project ID not configured" },
      { status: 500 },
    );
  }

  try {
    const url = `https://api.vercel.com/v1/query/web-analytics/visits/count?projectId=${projectId}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // revalidate every 5 minutes
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[page-views] Vercel API error:", res.status, errText);
      return NextResponse.json(
        { error: `Vercel API returned ${res.status}`, detail: errText },
        { status: res.status },
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await res.json();
    console.log("[page-views] Vercel API response:", JSON.stringify(json));

    return NextResponse.json(json);
  } catch (err) {
    console.error("[page-views] Unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected error fetching page views" },
      { status: 500 },
    );
  }
}
