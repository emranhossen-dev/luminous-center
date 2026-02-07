"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

/** Parse our tran_id format: luminous__userId__courseSlug__timestamp */
function parseTranId(tranId: string): { courseSlug: string } | null {
  if (!tranId || !tranId.startsWith("luminous__")) return null;
  const parts = tranId.split("__");
  if (parts.length < 4) return null;
  const [, , courseSlug] = parts;
  return { courseSlug };
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"validating" | "success" | "failed">("validating");
  const [message, setMessage] = useState("");

  const valId = searchParams.get("val_id");
  const tranId = searchParams.get("tran_id");

  useEffect(() => {
    if (!valId || !tranId) {
      setStatus("failed");
      setMessage("Invalid return: val_id or tran_id missing.");
      return;
    }
    const parsed = parseTranId(tranId);
    if (!parsed) {
      setStatus("failed");
      setMessage("Invalid tran_id format.");
      return;
    }

    fetch("/api/payment/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ val_id: valId }),
    })
      .then((r) => r.json())
      .then((data) => {
        const isValid = data.status === "VALID" || data.valid === true || data?.tran_id === tranId;
        if (isValid) {
          setStatus("success");
          const url = `/my-classes?enrolled=${encodeURIComponent(parsed.courseSlug)}&tran_id=${encodeURIComponent(tranId)}`;
          setTimeout(() => router.replace(url), 1500);
        } else {
          setStatus("failed");
          setMessage(data.message || "Validation failed.");
        }
      })
      .catch(() => {
        setStatus("failed");
        setMessage("Validation request failed.");
      });
  }, [valId, tranId, router]);

  if (status === "validating") {
    return (
      <main className="flex-grow pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">পেমেন্ট যাচাই করা হচ্ছে...</p>
        </div>
      </main>
    );
  }

  if (status === "success") {
    return (
      <main className="flex-grow pt-16 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">পেমেন্ট সফল!</h1>
            <p className="text-gray-600 mb-6">আপনাকে My Classes পেজে নিয়ে যাওয়া হচ্ছে...</p>
            <Link href="/my-classes" className="inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700">
              My Classes এ যান
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-16 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">যাচাই ব্যর্থ</h1>
          <p className="text-gray-600 mb-6">{message}</p>
          <Link href="/my-classes" className="inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700">
            My Classes
          </Link>
        </div>
      </div>
    </main>
  );
}
