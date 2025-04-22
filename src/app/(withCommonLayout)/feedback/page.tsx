import { Star, User, MessagesSquare } from "lucide-react";

export default function FeedbackPage() {
  const feedbacks = [
    {
      id: 1,
      customer: "Emily R.",
      rating: 5,
      comment: "Amazing experience! The ride was smooth and comfortable.",
    },
    {
      id: 2,
      customer: "John M.",
      rating: 5,
      comment:
        "Super reliable service. I reached my destination right on time!",
    },
    {
      id: 3,
      customer: "Sara L.",
      rating: 5,
      comment: "Very professional and easy to book. Highly recommended!",
    },
    {
      id: 4,
      customer: "Michael D.",
      rating: 5,
      comment: "Excellent service, clean vehicle and friendly communication.",
    },
    {
      id: 5,
      customer: "Anna T.",
      rating: 5,
      comment:
        "Top-notch ride! Everything went perfectly from start to finish.",
    },
    {
      id: 6,
      customer: "James K.",
      rating: 5,
      comment: "Fast, friendly, and safe. Will definitely use again!",
    },
    {
      id: 7,
      customer: "Sophia B.",
      rating: 5,
      comment: "Loved the service. Smooth ride and on-time pickup!",
    },
    {
      id: 8,
      customer: "David H.",
      rating: 5,
      comment: "Fantastic experience! Very efficient and comfortable.",
    },
    {
      id: 9,
      customer: "Olivia S.",
      rating: 5,
      comment: "Super impressed! Everything was so well organized.",
    },
    {
      id: 10,
      customer: "Chris W.",
      rating: 5,
      comment: "Highly satisfied! TransportationThai never disappoints.",
    },
    {
      id: 11,
      customer: "Mia C.",
      rating: 5,
      comment: "Brilliant service! Booking and riding was effortless.",
    },
    {
      id: 12,
      customer: "Daniel P.",
      rating: 5,
      comment: "Very convenient and pleasant ride. Totally worth it!",
    },
    {
      id: 13,
      customer: "Liam N.",
      rating: 5,
      comment: "Quick and reliable. Very happy with the overall experience.",
    },
    {
      id: 14,
      customer: "Isabella F.",
      rating: 5,
      comment: "Loved the clean cars and polite support!",
    },
    {
      id: 15,
      customer: "Noah J.",
      rating: 5,
      comment: "Very professional drivers and a smooth booking system.",
    },
    {
      id: 16,
      customer: "Ava G.",
      rating: 5,
      comment: "The best ride-share app I've used in Thailand!",
    },
    {
      id: 17,
      customer: "Zara Y.",
      rating: 5,
      comment: "Exceptional customer service and ride quality!",
    },
    {
      id: 18,
      customer: "Ethan B.",
      rating: 5,
      comment: "Premium experience. Felt safe and valued as a customer.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dbeafe] to-[#e0f2fe] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-6">
          <MessagesSquare className="w-8 h-8 text-blue-800" />
          <h1 className="text-4xl font-extrabold text-center text-blue-900 tracking-tight">
            Customer Feedback
          </h1>
        </div>
        <p className="text-center text-gray-600 text-lg mb-10">
          Real experiences from our happy customers at{" "}
          <strong>TransportationThai</strong>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {feedbacks.map(({ id, customer, rating, comment }) => (
            <div
              key={id}
              className="bg-white/30 backdrop-blur-lg border border-white/50 rounded-2xl p-6 shadow-lg transition hover:scale-105 hover:shadow-2xl">
              <div className="flex items-center gap-2 text-blue-900 mb-2">
                <User className="w-5 h-5" />
                <h2 className="text-lg font-semibold">{customer}</h2>
              </div>

              <div className="flex items-center text-yellow-500 mb-3">
                {[...Array(rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 stroke-yellow-500"
                  />
                ))}
                <span className="text-sm text-gray-700 ml-2">({rating}/5)</span>
              </div>

              <p className="text-gray-800 text-[15px] leading-relaxed">
                {comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
