import React, { useState } from "react";
import NotificationModal from "../noti-modal/noti-modal";

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const notifications = [
    "Order #1234 has been shipped",
    "New message from customer",
    "Payment for Order #5678 is confirmed",
  ];

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Logo/Brand Name */}
        <div className="text-white text-xl font-bold flex-1 text-center md:text-left md:ml-10">
          เฟื่องฟู สปอร์ต
        </div>

        {/* Notification Icon */}
        <div className="relative">
          <svg
            onClick={() => setIsModalOpen(true)}
            className="w-6 h-6 text-white cursor-pointer mr-4 md:mr-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a7.002 7.002 0 00-5-6.709V4a2 2 0 10-4 0v.291C7.67 5.099 6 7.388 6 10v4.159c0 .538-.214 1.055-.595 1.436L4 17h11z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 21h-2v-2h2v2z"
            />
          </svg>
          {/* Notification Dot */}
          <span className="absolute top-0 right-4 md:right-8 block h-2 w-2 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full"></span>
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        notifications={notifications}
      />
    </nav>
  );
};

export default Navbar;
