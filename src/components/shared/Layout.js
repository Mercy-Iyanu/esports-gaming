import React from "react";
import { Outlet } from "react-router-dom";
import TopNavBar from "./ui/TopNavBar";

export const Layout = () => {
  return (
    <div>
      <TopNavBar />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
};
