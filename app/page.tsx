import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-gray-50 text-gray-800 pt-16">
      <section className="relative min-h-[70vh] flex items-center text-white bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="container mx-auto px-6 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
            দক্ষতা অর্জনের সেরা ঠিকানা
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 drop-shadow">
            আপনার ক্যারিয়ারের পরবর্তী ধাপের জন্য প্রস্তুত হোন। ইন্ডাস্ট্রি এক্সপার্টদের কাছ থেকে শিখুন এবং বাস্তবভিত্তিক প্রজেক্টে কাজ করুন।
          </p>
          <Link
            href="/courses"
            className="inline-block bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-110 shadow-xl"
          >
            আমাদের কোর্সগুলো দেখুন
          </Link>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/login"
              className="bg-white text-indigo-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition"
            >
              লগইন
            </Link>
            <Link
              href="/signup"
              className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
            >
              রেজিস্ট্রেশন
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-16 z-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-2xl shadow-2xl text-white bg-blue-500">
            <div className="flex justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.5m0 0a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm0 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              </svg>
            </div>
            <p className="text-5xl font-bold">0+</p>
            <p className="text-lg font-semibold">কোর্সসমূহ</p>
          </div>
          <div className="p-8 rounded-2xl shadow-2xl text-white bg-green-500">
            <div className="flex justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.283.356-1.857m0 0a3.001 3.001 0 015.652 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-5xl font-bold">0+</p>
            <p className="text-lg font-semibold">শিক্ষার্থী</p>
          </div>
          <div className="p-8 rounded-2xl shadow-2xl text-white bg-yellow-500">
            <div className="flex justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <p className="text-5xl font-bold">0+</p>
            <p className="text-lg font-semibold">মেন্টর</p>
          </div>
        </div>
      </div>

      <section className="py-20 transition-all duration-1000 opacity-100 translate-y-0">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">কেন আমরা সেরা?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 4 4-4 5.293 5.293a1 1 0 010 1.414L15 21" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">প্রজেক্ট-ভিত্তিক লার্নিং</h3>
              <p className="text-gray-600">প্রতিটি কোর্সে রয়েছে রিয়েল-লাইফ প্রজেক্ট, যা আপনাকে চাকরির জন্য প্রস্তুত করবে।</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">বিশেষজ্ঞ মেন্টর সাপোর্ট</h3>
              <p className="text-gray-600">আমাদের অভিজ্ঞ মেন্টররা আছেন আপনার পাশে, প্রতিটি পদক্ষেপে সাহায্য করার জন্য।</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4-8-4V7m8 4v10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">আপ-টু-ডেট কারিকুলাম</h3>
              <p className="text-gray-600">আমরা প্রতিনিয়ত ইন্ডাস্ট্রির চাহিদানুযায়ী আমাদের কোর্স আপডেট করি।</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100 transition-all duration-1000 opacity-100 translate-y-0">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">আমাদের জনপ্রিয় কোর্সসমূহ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course cards can be populated from API or data */}
          </div>
        </div>
      </section>

      <section className="py-20 transition-all duration-1000 opacity-100 translate-y-0">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">আমাদের শিক্ষার্থীরা যা বলে</h2>
        </div>
      </section>
    </div>
  );
}
