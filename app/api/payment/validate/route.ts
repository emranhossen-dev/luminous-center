import { NextRequest, NextResponse } from "next/server";

const SANDBOX_VALIDATE = "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php";
const LIVE_VALIDATE = "https://securepay.sslcommerz.com/validator/api/validationserverAPI.php";

function getStoreConfig() {
  const storeId = process.env.SSLCOMMERZ_STORE_ID || "testbox";
  const storePass = process.env.SSLCOMMERZ_STORE_PASS || "qwerty";
  return { storeId, storePass };
}

/** Validate transaction with SSLCommerz using val_id. */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { val_id } = body;
    if (!val_id) {
      return NextResponse.json({ error: "val_id required" }, { status: 400 });
    }
    const { storeId, storePass } = getStoreConfig();
    const params = new URLSearchParams({
      val_id: String(val_id),
      store_id: storeId,
      store_passwd: storePass,
    });
    const isLive = process.env.SSLCOMMERZ_IS_LIVE === "true";
    const base = isLive ? LIVE_VALIDATE : SANDBOX_VALIDATE;
    const res = await fetch(`${base}?${params.toString()}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Validate error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Validation failed" },
      { status: 500 }
    );
  }
}
