import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="flex-grow">
      <div className="bg-white">
        <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">আমাদের সম্পর্কে</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              আমরা একটি শিক্ষামূলক প্রতিষ্ঠান, যার লক্ষ্য হলো প্রযুক্তির মাধ্যমে তরুণদের দক্ষতা বৃদ্ধি করে একটি সুন্দর ভবিষ্যৎ গঠনে সহায়তা করা।
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">আমাদের গল্প</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  আমাদের যাত্রা শুরু হয়েছিল একটি ছোট স্বপ্ন নিয়ে - দেশের প্রতিটি প্রান্তে মানসম্মত কারিগরি শিক্ষা পৌঁছে দেওয়া। অল্প কয়জন শিক্ষার্থী এবং দৃঢ় সংকল্প নিয়ে আমরা শুরু করেছিলাম। আজ আমরা হাজারো শিক্ষার্থীর আস্থার প্রতীক।
                </p>
                <p className="text-gray-600 leading-relaxed">
                  আমাদের মূল শক্তি হলো আমাদের অভিজ্ঞ মেন্টর এবং আপ-টু-ডেট কারিকুলাম, যা শিক্ষার্থীদেরকে বর্তমান জব মার্কেটের জন্য পুরোপুরি প্রস্তুত করে তোলে।
                </p>
              </div>
              <div>
                <img
                  src="https://placehold.co/600x450/C7D2FE/3730A3?text=Our+Journey"
                  alt="Our Story"
                  className="rounded-xl shadow-lg w-full"
                  width={600}
                  height={450}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="bg-white bg-opacity-20 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-3">আমাদের লক্ষ্য (Mission)</h2>
                <p className="max-w-md">
                  প্রযুক্তির সর্বশেষ জ্ঞান ও দক্ষতার সাথে দেশের তরুণ সমাজকে সমৃদ্ধ করা, যাতে তারা বিশ্বব্যাপী প্রতিযোগিতায় নিজেদের যোগ্য প্রমাণ করতে পারে।
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white bg-opacity-20 p-4 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-3">আমাদের স্বপ্ন (Vision)</h2>
                <p className="max-w-md">
                  বাংলাদেশের এক নম্বর স্কিল ডেভেলপমেন্ট প্ল্যাটফর্ম হিসেবে প্রতিষ্ঠিত হওয়া এবং ডিজিটাল বাংলাদেশ গঠনে সক্রিয় ভূমিকা পালন করা।
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">আমাদের আদর্শ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-xl text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 4 4-4 5.293 5.293a1 1 0 010 1.414L15 21" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">উৎকর্ষ</h3>
                <p className="text-gray-600">আমরা শিক্ষার মানে কোনো আপস করি না। সেরাটাই আমাদের লক্ষ্য।</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 21l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">সহানুভূতি</h3>
                <p className="text-gray-600">প্রতিটি শিক্ষার্থীর প্রতি আমরা যত্নশীল এবং তাদের সফলতার জন্য নিবেদিত।</p>
              </div>
              <div className="bg-gray-50 p-8 rounded-xl text-center transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4-8-4V7m8 4v10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">উদ্ভাবন</h3>
                <p className="text-gray-600">আমরা প্রতিনিয়ত নতুন প্রযুক্তি ও শিক্ষাপদ্ধতি নিয়ে কাজ করি।</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">আমাদের চালিকাশক্তি</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                { name: "মোহাম্মদ আব্দুল্লাহ", role: "প্রতিষ্ঠাতা ও সিইও", img: "CEO" },
                { name: "ফারিয়া সুলতানা", role: "হেড অফ অপারেশনস", img: "COO" },
                { name: "সাকিব আহমেদ", role: "লিড ইনস্ট্রাক্টর", img: "Lead" },
                { name: "আরিফা চৌধুরী", role: "হেড অফ ডিজাইন", img: "Design" },
              ].map((person) => (
                <div key={person.name} className="text-center group">
                  <div className="relative inline-block">
                    <img
                      src={`https://placehold.co/200x200/E2E8F0/4A5568?text=${person.img}`}
                      alt={person.name}
                      className="w-40 h-40 rounded-full object-cover shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                      width={200}
                      height={200}
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-gray-800">{person.name}</h3>
                  <p className="text-blue-600">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">আমাদের কিছু মুহূর্ত</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {["Classroom", "Event", "Lab", "Discussion"].map((text, i) => (
                <div key={text} className="overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={`https://placehold.co/600x400/${["A5B4FC", "A78BFA", "F472B6", "FBBF24"][i]}/FFFFFF?text=${text}`}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                    width={600}
                    height={400}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-indigo-700 py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">আমাদের যাত্রার সঙ্গী হোন</h2>
            <p className="text-indigo-200 text-lg max-w-2xl mx-auto mb-8">
              আপনি যদি আমাদের লক্ষ্য ও আদর্শের সাথে একমত হন, তাহলে আমাদের সাথে যুক্ত হোন। আপনার জ্ঞান ও অভিজ্ঞতা দিয়ে অন্যদের সাহায্য করুন।
            </p>
            <div>
              <Link
                href="/contact"
                className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 inline-block"
              >
                যোগাযোগ করুন
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
