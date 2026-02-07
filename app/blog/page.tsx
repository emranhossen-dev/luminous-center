export default function BlogPage() {
  return (
    <main className="flex-grow">
      <div className="bg-gray-50 pt-16">
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">আমাদের ব্লগ</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              প্রযুক্তি, ডিজাইন এবং মার্কেটিং জগতের সর্বশেষ খবর ও টিপস পেতে আমাদের সাথেই থাকুন।
            </p>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blog posts can be added here */}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
