"use client";
import React, { Suspense, ReactNode } from "react";
import Sidebar from "../components/sidebar/sidebar";
import Navbar from "../components/nav/nav";
import GenderForm from "./genders/genders";

export default function AdminLayoutPage() {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow">
        <Navbar />
        <Suspense fallback={<>loading</>}>
          {/* แสดงหน้าหลัก */}
          <div className="bg-slate-50 h-screen">
            <GenderForm />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
