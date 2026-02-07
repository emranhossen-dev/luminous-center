import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <main className="flex-grow pt-16 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">পেমেন্ট বাতিল</h1>
          <p className="text-gray-600 mb-6">আপনি পেমেন্ট বাতিল করেছেন। যেকোনো সময় আবার এনরোল করতে পারবেন।</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/courses" className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700">
              কোর্সগুলো দেখুন
            </Link>
            <Link href="/my-classes" className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300">
              My Classes
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
