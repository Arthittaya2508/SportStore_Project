"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FaUserAlt,
  FaCog,
  FaTachometerAlt,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleCustomerDropdown = () => {
    setIsCustomerOpen(!isCustomerOpen);
    if (!isCustomerOpen) {
      setIsReportOpen(false);
    }
  };

  const toggleReportDropdown = () => {
    setIsReportOpen(!isReportOpen);
    if (!isReportOpen) {
      setIsCustomerOpen(false);
    }
  };

  return (
    <div className="flex relative">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-2.5 left-4 z-20 p-2 rounded-md bg-gray-800 text-white"
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
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed md:relative bg-gray-800 text-white h-screen w-60
        transition-transform duration-300 ease-in-out
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
        z-10
      `}
      >
        <div className="p-2 flex flex-col items-center">
          <img
            src="../images/cat.jpg"
            alt="Sidebar Image"
            className="w-24 h-24 rounded-full border-2 border-gray-700"
          />
          <h2 className="mt-4 text-center text-xl font-semibold">Arthittaya</h2>

          <nav className="mt-5 w-full">
            <ul className="space-y-3 ml-2">
              {/* Dashboard */}
              <li>
                <Link href="/admin/admin-dash">
                  <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                    <FaTachometerAlt size={18} />
                    <span className="ml-2 text-sm">Dashboard</span>
                  </div>
                </Link>
              </li>

              {/* ข้อมูลสินค้า Dropdown */}
              <li>
                <div
                  className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
                  onClick={toggleCustomerDropdown}
                >
                  <FaCog size={18} />
                  <span className="ml-2 text-sm flex items-center">
                    ข้อมูลสินค้า
                    <FaChevronDown
                      className={`ml-2 transition-transform duration-300 ${
                        isCustomerOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </div>
                {isCustomerOpen && (
                  <ul className="pl-8 mt-2 space-y-2">
                    <li>
                      <Link href="/admin/admin-products">
                        <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                          <FaUserAlt size={16} />
                          <span className="ml-2 text-sm">ข้อมูลสินค้า</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/admin-types">
                        <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                          <FaUserAlt size={16} />
                          <span className="ml-2 text-sm">ข้อมูลประเภท</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/admin-bands">
                        <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                          <FaUserAlt size={16} />
                          <span className="ml-2 text-sm">ข้อมูลแบนด์</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/admin-colors">
                        <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                          <FaUserAlt size={16} />
                          <span className="ml-2 text-sm">ข้อมูลสี</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/admin-sizes">
                        <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                          <FaUserAlt size={16} />
                          <span className="ml-2 text-sm">ข้อมูลขนาด</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/admin-genders">
                        <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                          <FaUserAlt size={16} />
                          <span className="ml-2 text-sm">ข้อมูลเพศ</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* ข้อมูลขนส่ง */}
              <li>
                <Link href="/admin/admin-transport">
                  <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                    <FaTachometerAlt size={18} />
                    <span className="ml-2 text-sm">ข้อมูลขนส่ง</span>
                  </div>
                </Link>
              </li>

              {/* ข้อมูลลูกค้า */}
              <li>
                <Link href="/admin/admin-customer">
                  <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                    <FaUserAlt size={18} />
                    <span className="ml-2 text-sm">ข้อมูลลูกค้า</span>
                  </div>
                </Link>
              </li>

              {/* ข้อมูลพนักงาน */}
              <li>
                <Link href="/admin/admin-employee">
                  <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                    <FaUserAlt size={18} />
                    <span className="ml-2 text-sm">ข้อมูลพนักงาน</span>
                  </div>
                </Link>
              </li>

              {/* รายงานการขาย Dropdown */}
              <li>
                <div
                  className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer"
                  onClick={toggleReportDropdown}
                >
                  <FaCog size={18} />
                  <span className="ml-2 text-sm flex items-center">
                    รายงานการขาย
                    <FaChevronDown
                      className={`ml-2 transition-transform duration-300 ${
                        isReportOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </div>
                {isReportOpen && (
                  <ul className="pl-8 mt-2 space-y-2">
                    <li>
                      <Link href="/admin/daily-report">
                        <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                          <FaUserAlt size={16} />
                          <span className="ml-2 text-sm">รายงานรายวัน</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/monthly-report">
                        <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                          <FaUserAlt size={16} />
                          <span className="ml-2 text-sm">รายงานรายเดือน</span>
                        </div>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>

              {/* ออกจากระบบ */}
              <li>
                <Link href="/logout">
                  <div className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                    <FaSignOutAlt size={18} />
                    <span className="ml-2 text-sm">ออกจากระบบ</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Sidebar;
