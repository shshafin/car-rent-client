import {
  Shield,
  User,
  Lock,
  Globe,
  Trash2,
  UploadCloud,
  FileLock,
  Mail,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#f5f3ff] to-[#ede9fe] px-4 py-20 flex items-center justify-center">
      <div className="backdrop-blur-2xl bg-white/30 border border-white/40 rounded-3xl shadow-2xl p-8 md:p-16 max-w-5xl w-full text-gray-800">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 text-center mb-6">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-700 text-center mb-12">
          Your privacy is important to us. Here's how we protect your data and
          use it responsibly.
        </p>

        <div className="space-y-10">
          <Section
            icon={
              <Shield
                size={28}
                className="text-indigo-600"
              />
            }
            title="Data Protection"
            desc="We implement strict security measures to ensure your data is safe and protected against unauthorized access."
          />

          <Section
            icon={
              <User
                size={28}
                className="text-indigo-600"
              />
            }
            title="Account Information"
            desc="When you create an account, we collect basic information like your name, email, and phone number to manage your bookings."
          />

          <Section
            icon={
              <UploadCloud
                size={28}
                className="text-indigo-600"
              />
            }
            title="Usage Data"
            desc="We collect data about how you use our service to improve your experience, such as booking patterns and preferences."
          />

          <Section
            icon={
              <Globe
                size={28}
                className="text-indigo-600"
              />
            }
            title="Third-party Services"
            desc="We do not sell your personal data. In some cases, we may use trusted third-party services for analytics and payments."
          />

          <Section
            icon={
              <Lock
                size={28}
                className="text-indigo-600"
              />
            }
            title="Secure Payments"
            desc="All payment transactions are encrypted and processed through secure payment gateways. We do not store card information."
          />

          <Section
            icon={
              <Trash2
                size={28}
                className="text-indigo-600"
              />
            }
            title="Data Retention"
            desc="We retain your data only as long as necessary for booking and legal compliance. You may request data deletion anytime."
          />

          <Section
            icon={
              <FileLock
                size={28}
                className="text-indigo-600"
              />
            }
            title="Your Consent"
            desc="By using our service, you consent to our privacy policy. You may withdraw consent at any time by contacting us."
          />

          <Section
            icon={
              <Mail
                size={28}
                className="text-indigo-600"
              />
            }
            title="Contact Us"
            desc="Have questions or concerns? Reach out via our support page or email. We're here to help you feel secure."
          />

          <div className="text-center text-sm text-gray-600 mt-10">
            We value your trust and are committed to keeping your information
            secure and private.
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable section
function Section({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">{title}</h2>
        <p className="text-gray-700">{desc}</p>
      </div>
    </div>
  );
}
