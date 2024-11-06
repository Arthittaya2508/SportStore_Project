"use client";
import Link from "next/link";
import React from "react";
import { Pagination } from "@nextui-org/react";

const orders = [
  {
    orderNumber: "001",
    customerName: "John Doe",
    deliveryAddress: "123 Main St, Bangkok",
    totalPrice: 500,
    orderStatus: "ที่ส่งเรียบร้อย",
    productDetails: "Product A, Product B",
    orderDateTime: "2024-08-11 14:30:00",
  },
  {
    orderNumber: "002",
    customerName: "Jane Smith",
    deliveryAddress: "456 Another St, Bangkok",
    totalPrice: 300,
    orderStatus: "ที่กำลังจัดเตรียม",
    productDetails: "Product C",
    orderDateTime: "2024-08-13 11:00:00",
  },
  {
    orderNumber: "003",
    customerName: "John Doe",
    deliveryAddress: "123 Main St, Bangkok",
    totalPrice: 500,
    orderStatus: "รอขนส่งมารับ",
    productDetails: "Product A, Product B",
    orderDateTime: "2024-08-14 15:30:00",
  },
  {
    orderNumber: "004",
    customerName: "Jane Smith",
    deliveryAddress: "456 Another St, Bangkok",
    totalPrice: 300,
    orderStatus: "ที่จัดส่งแล้ว",
    productDetails: "Product C",
    orderDateTime: "2024-09-16 17:00:00",
  },
  {
    orderNumber: "005",
    customerName: "John Doe",
    deliveryAddress: "123 Main St, Bangkok",
    totalPrice: 500,
    orderStatus: "ที่ส่งเรียบร้อย",
    productDetails: "Product A, Product B",
    orderDateTime: "2024-10-11 18:30:00",
  },
  {
    orderNumber: "006",
    customerName: "Jane Smith",
    deliveryAddress: "456 Another St, Bangkok",
    totalPrice: 300,
    orderStatus: "ที่ยกเลิก",
    productDetails: "Product C",
    orderDateTime: "2024-10-21 11:00:00",
  },
  {
    orderNumber: "007",
    customerName: "John Doe",
    deliveryAddress: "123 Main St, Bangkok",
    totalPrice: 500,
    orderStatus: "ที่ส่งเรียบร้อย",
    productDetails: "Product A, Product B",
    orderDateTime: "2024-10-25 10:30:00",
  },
  {
    orderNumber: "008",
    customerName: "Jane Smith",
    deliveryAddress: "456 Another St, Bangkok",
    totalPrice: 300,
    orderStatus: "ที่ส่งเรียบร้อย",
    productDetails: "Product C",
    orderDateTime: "2024-10-28 09:00:00",
  },
  {
    orderNumber: "009",
    customerName: "John Doe",
    deliveryAddress: "123 Main St, Bangkok",
    totalPrice: 500,
    orderStatus: "ที่ยังไม่ได้รับ",
    productDetails: "Product A, Product B",
    orderDateTime: "2024-11-01 19:30:00",
  },
  {
    orderNumber: "010",
    customerName: "Jane Smith",
    deliveryAddress: "456 Another St, Bangkok",
    totalPrice: 300,
    orderStatus: "ที่ยังไม่ได้รับ",
    productDetails: "Product C",
    orderDateTime: "2024-11-02 20:00:00",
  },
  {
    orderNumber: "011",
    customerName: "John Doe",
    deliveryAddress: "123 Main St, Bangkok",
    totalPrice: 500,
    orderStatus: "ที่ยังไม่ได้รับ",
    productDetails: "Product A, Product B",
    orderDateTime: "2024-11-03 12:30:00",
  },
  {
    orderNumber: "012",
    customerName: "Jane Smith",
    deliveryAddress: "456 Another St, Bangkok",
    totalPrice: 300,
    orderStatus: "ที่ยังไม่ได้รับ",
    productDetails: "Product C",
    orderDateTime: "2024-11-04 09:00:00",
  },
  {
    orderNumber: "013",
    customerName: "John Doe",
    deliveryAddress: "123 Main St, Bangkok",
    totalPrice: 500,
    orderStatus: "ที่ยังไม่ได้รับ",
    productDetails: "Product A, Product B",
    orderDateTime: "2024-11-05 08:30:00",
  },
  {
    orderNumber: "014",
    customerName: "Jane Smith",
    deliveryAddress: "456 Another St, Bangkok",
    totalPrice: 300,
    orderStatus: "ที่ยังไม่ได้รับ",
    productDetails: "Product C",
    orderDateTime: "2024-11-06 09:00:00",
  },
];

const Dashboard: React.FC = () => {
  // All state declarations inside the component
  const [sortOrder, setSortOrder] = React.useState("date-desc");
  const [sortedOrders, setSortedOrders] = React.useState([...orders]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const ordersPerPage = 8;

  const orderStatuses = [
    { label: "ที่ยังไม่ได้รับ", count: 20, bgColor: "bg-yellow-400" },
    { label: "ที่กำลังจัดเตรียม", count: 15, bgColor: "bg-orange-400" },
    { label: "รอขนส่งมารับ", count: 10, bgColor: "bg-blue-400" },
    { label: "ที่จัดส่งแล้ว", count: 25, bgColor: "bg-indigo-400" },
    { label: "ที่ส่งเรียบร้อย", count: 18, bgColor: "bg-green-400" },
    { label: "ที่ยกเลิก", count: 5, bgColor: "bg-red-400" },
  ];

  const statusColorMap: { [key: string]: string } = {
    ที่ยังไม่ได้รับ: "bg-yellow-400",
    ที่กำลังจัดเตรียม: "bg-orange-400",
    รอขนส่งมารับ: "bg-blue-400",
    ที่จัดส่งแล้ว: "bg-indigo-400",
    ที่ส่งเรียบร้อย: "bg-green-400",
    ที่ยกเลิก: "bg-red-400",
  };

  // Sorting function
  const handleSort = (value: string) => {
    setSortOrder(value);
    let sorted = [...orders];

    switch (value) {
      case "date-desc":
        sorted.sort(
          (a, b) =>
            new Date(b.orderDateTime).getTime() -
            new Date(a.orderDateTime).getTime()
        );
        break;
      case "date-asc":
        sorted.sort(
          (a, b) =>
            new Date(a.orderDateTime).getTime() -
            new Date(b.orderDateTime).getTime()
        );
        break;
      case "status":
        sorted.sort((a, b) => a.orderStatus.localeCompare(b.orderStatus));
        break;
      default:
        break;
    }

    setSortedOrders(sorted);
  };

  // Pagination calculations
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Initial sort effect
  React.useEffect(() => {
    handleSort("date-desc");
  }, []);

  return (
    <div className="p-4 lg:p-6 lg:ml-10">
      <h1 className="text-xl lg:text-2xl font-bold mb-4">Dashboard</h1>

      {/* Responsive Stepper */}
      <div className="overflow-x-auto mb-6">
        <div className="flex items-center min-w-[800px]">
          {orderStatuses.map((status, index) => (
            <React.Fragment key={status.label}>
              <div className="flex flex-col items-center cursor">
                <div
                  className={`${status.bgColor} w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base cursor`}
                >
                  {status.count}
                </div>
                <span className="text-xs lg:text-sm mt-2 text-center w-20 lg:w-24 cursor ">
                  {status.label}
                </span>
              </div>
              {index < orderStatuses.length - 1 && (
                <div className="h-[2px] bg-gray-300 flex-grow mx-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={sortOrder}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="" disabled>
              เรียงลำดับตาม
            </option>
            <option value="date-desc">วันที่ล่าสุด</option>
            <option value="date-asc">วันที่เก่าสุด</option>
            <option value="status">สถานะ</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto -mx-4 lg:mx-0">
        <div className="min-w-[800px] lg:w-full">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-xs lg:text-sm leading-normal">
                <th className="py-2 lg:py-3 px-3 lg:px-6 text-left">
                  เลขที่ออเดอร์
                </th>
                <th className="py-2 lg:py-3 px-3 lg:px-6 text-left">
                  ชื่อลูกค้า
                </th>
                <th className="hidden md:table-cell py-2 lg:py-3 px-3 lg:px-6 text-left">
                  ที่อยู่ที่จัดส่ง
                </th>
                <th className="hidden md:table-cell py-2 lg:py-3 px-3 lg:px-6 text-left">
                  วันเวลาที่สั่ง
                </th>
                <th className="py-2 lg:py-3 px-3 lg:px-6 text-right">
                  ราคารวม
                </th>
                <th className="py-2 lg:py-3 px-3 lg:px-6 text-left">
                  สถานะการสั่ง
                </th>
                <th className="py-2 lg:py-3 px-3 lg:px-6 text-left">
                  รายละเอียด
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-xs lg:text-sm font-light">
              {currentOrders.map((order) => (
                <tr
                  key={order.orderNumber}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-2 lg:py-3 px-3 lg:px-6 text-left whitespace-nowrap">
                    {order.orderNumber}
                  </td>
                  <td className="py-2 lg:py-3 px-3 lg:px-6 text-left">
                    {order.customerName}
                  </td>
                  <td className="hidden md:table-cell py-2 lg:py-3 px-3 lg:px-6 text-left">
                    {order.deliveryAddress}
                  </td>
                  <td className="hidden md:table-cell py-2 lg:py-3 px-3 lg:px-6 text-left">
                    {order.orderDateTime}
                  </td>
                  <td className="py-2 lg:py-3 px-3 lg:px-6 text-right">
                    {order.totalPrice} บาท
                  </td>
                  <td className="py-2 lg:py-3 px-3 lg:px-6 text-left">
                    <span
                      className={`${
                        statusColorMap[order.orderStatus]
                      } text-white px-2 py-1 rounded-full text-xs`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-2 lg:py-3 px-3 lg:px-6 text-left">
                    <Link href={`/admin/admin-dash/detail`}>
                      <button className="text-blue-500 hover:underline">
                        ดูรายละเอียด
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Pagination
          loop
          showControls
          color="success"
          total={totalPages}
          initialPage={1}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Dashboard;
