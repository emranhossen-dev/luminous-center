import { NextRequest, NextResponse } from "next/server";

const SSLCOMMERZ_SANDBOX = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

function getStoreConfig() {
  const storeId = process.env.SSLCOMMERZ_STORE_ID || "testbox";
  const storePass = process.env.SSLCOMMERZ_STORE_PASS || "qwerty";
  return { storeId, storePass };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { courseSlug, amount, userId, userName, userEmail, courseTitle } = body;
    if (!courseSlug || !userId || !userEmail || amount == null || amount < 10) {
      return NextResponse.json(
        { error: "Invalid request: courseSlug, userId, userEmail and amount (min 10) required." },
        { status: 400 }
      );
    }

    const { storeId, storePass } = getStoreConfig();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const tranId = `luminous__${userId}__${courseSlug}__${Date.now()}`;

    const params = new URLSearchParams({
      store_id: storeId,
      store_passwd: storePass,
      total_amount: String(Number(amount).toFixed(2)),
      currency: "BDT",
      tran_id: tranId,
      success_url: `${baseUrl}/payment/success`,
      fail_url: `${baseUrl}/payment/fail`,
      cancel_url: `${baseUrl}/payment/cancel`,
      cus_name: String(userName || "Customer"),
      cus_email: String(userEmail),
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: "01700000000",
      shipping_method: "NO",
      product_name: String(courseTitle || courseSlug).slice(0, 255),
      product_category: "education",
      product_profile: "non-physical-goods",
    });

    const res = await fetch(SSLCOMMERZ_SANDBOX, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = await res.json();

    if (data.status !== "SUCCESS" || !data.GatewayPageURL) {
      return NextResponse.json(
        { error: data.failedreason || "Payment session could not be created." },
        { status: 400 }
      );
    }

    return NextResponse.json({ redirectUrl: data.GatewayPageURL, tranId });
  } catch (err) {
    console.error("Payment init error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Payment init failed" },
      { status: 500 }
    );
  }
}
