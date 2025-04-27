
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

export const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
        <footer className="border-t border-gray-200 bg-white p-4 text-center text-xs text-gray-500">
          <div className="flex justify-center space-x-6">
            <span>EthicalOps v1.0.0</span>
            <a href="#" className="hover:underline">Contact Support</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </div>
  );
};
