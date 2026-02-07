"use client";

export default function ContactPage() {
  return (
    <main className="flex-grow">
      <div className="bg-white pt-16">
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">যোগাযোগ করুন</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              আপনার যেকোনো প্রশ্ন, মতামত বা পরামর্শের জন্য আমাদের সাথে যোগাযোগ করতে পারেন।
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">আমাদের একটি বার্তা পাঠান</h2>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="আপনার নাম"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="আপনার ইমেইল"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="বিষয়"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="আপনার বার্তা"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
                    >
                      বার্তা পাঠান
                    </button>
                  </div>
                </form>
              </div>

              <div className="space-y-8">
                <div className="bg-blue-50 p-8 rounded-xl shadow-sm flex items-start space-x-4">
                  <div className="text-blue-600 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">আমাদের ঠিকানা</h3>
                    <p className="text-gray-600">বাড়ি #১০, রোড #৫, ধানমন্ডি, ঢাকা-১২০৫</p>
                  </div>
                </div>
                <div className="bg-green-50 p-8 rounded-xl shadow-sm flex items-start space-x-4">
                  <div className="text-green-600 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">ফোন করুন</h3>
                    <p className="text-gray-600">+৮৮০ ১২৩৪-৫৬৭৮৯০</p>
                  </div>
                </div>
                <div className="bg-yellow-50 p-8 rounded-xl shadow-sm flex items-start space-x-4">
                  <div className="text-yellow-600 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">ইমেইল করুন</h3>
                    <p className="text-gray-600">info@yourwebsite.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
