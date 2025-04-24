import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/lg.png"
            alt="Company Logo"
            width={120}
            height={100}
            className="object-contain mb-3"
          />
          <p className="text-sm text-center md:text-left">
            Empowering your travels with flexible payments—ride your way, your
            terms.
          </p>
        </div>

        {/* About Section */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">About Us</h4>
          <p className="text-sm">
            We offer flexible payment options to make your ride experience
            seamless. Choose a plan that suits your journey—pay upfront or in
            parts, the control is yours.
          </p>
        </div>

        {/* Links Section */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-200">
                Home
              </a>
            </li>
            <li>
              <a
                href="about-us"
                className="hover:text-blue-400 transition duration-200">
                About Us
              </a>
            </li>
            <li>
              <a
                href="feedback"
                className="hover:text-blue-400 transition duration-200">
                Feedback
              </a>
            </li>
            <li>
              <a
                href="guide"
                className="hover:text-blue-400 transition duration-200">
                Guide
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Get in Touch
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:info@company.com"
                className="hover:text-blue-400 transition duration-200">
                thanawat142518@gmail.com
              </a>
            </li>
            <li>
              <span className="font-semibold">Phone:</span>{" "}
              <a
                href="tel:+6656043616"
                className="hover:text-blue-400 transition duration-200">
                +6656043616
              </a>
            </li>
            <li>
              <span className="font-semibold">Address:</span> 11/212 Village No.
              7, Kingkaew Villa, Soi Kingkaew 56, Racha Thewa Subdistrict, Bang
              Phli District, Samut Prakan Province 10540
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>© 2025 Transportationthai. All rights reserved.</p>
        <p>
          <a
            href="/privacy-policy"
            className="hover:text-blue-400 transition duration-200">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a
            href="/terms-conditions"
            className="hover:text-blue-400 transition duration-200">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
