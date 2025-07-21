// client/src/components/Layout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar'; // We'll create this

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <Outlet /> {/* This is where nested routes will render */}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} MERN Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;