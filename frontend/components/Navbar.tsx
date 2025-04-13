"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        border: '1px solid rgba(255, 255, 255, 0.17)',
        backgroundColor: '#121612',
        borderRadius: '50px',
        padding: '10px 20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
        width: 'auto',
        maxWidth: '1200px',
        gap: '40px', // Padding between components
      }}
      className="font-montserrat"
    >
      {/* Logo and Brand Name */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
          className="logo-container"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={23}
            height={23}
          />
          <span
            className="text-lg sm:text-xl"
            style={{
              fontWeight: '440',
              color: 'white',
              letterSpacing: '1px',
            }}
          >
            SimpliEarn
          </span>
        </div>
      </Link>

      {/* Navigation Links (Hidden on Mobile) */}
      <div
        style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'center',
        }}
        className="nav-links"
      >
        <Link href="/about" className="nav-link">About Us</Link>
        <Link href="/faq" className="nav-link">FAQ&rsquo;s</Link>
        <Link href="mailto:simpliearnbdbi@gmail.com"className="nav-link">Contact Us</Link>
      </div>

      <div className="flex items-center gap-2 sm:gap-5">
        {/* Hamburger Menu*/}
        <button
          onClick={toggleMenu}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
          }}
          className="hamburger"
        >
          <div
            className="hamburger-line"
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: 'white',
              margin: '4px 0',
              transition: 'background-color 0.3s',
            }}
          ></div>
          <div
            className="hamburger-line"
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: 'white',
              margin: '4px 0',
              transition: 'background-color 0.3s',
            }}
          ></div>
          <div
            className="hamburger-line"
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: 'white',
              margin: '4px 0',
              transition: 'background-color 0.3s',
            }}
          ></div>
        </button>

        {/* Open Dashboard Button */}
        <Link
          href="/dashboard?id=1"
          style={{
            textDecoration: 'none',
            borderRadius: '50px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap', // Prevent text wrapping
          }}
          className="dashboard-button bg-green text-[#121612] transition-all px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base"
        >
          Try Now
        </Link>
      </div>

      {/* Mobile Menu (Hidden by Default) */}
      {isMenuOpen && (
        <div
        
          ref={ref}
          style={{
            position: 'fixed',
            top: '80px',
            left: '0',
            right: '0',
            backgroundColor: 'rgba(15, 17, 15, 0.995)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 999,
            border: '1px solid rgba(255, 255, 255, 0.17)',
            borderRadius: '20px',
          }}
          className="mobile-menu"
        >
          <Link
            href="/about"
            className="text-white hover:text-green"
            style={{ textDecoration: 'none', fontWeight: '300' }}
          >
            About Us
          </Link>
          <Link
            href="/faq"
            className="text-white hover:text-green"
            style={{ textDecoration: 'none', fontWeight: '300' }}
          >
            FAQ&rsquo;s
          </Link>
          <Link
            href="#contactUs"
            className="text-white hover:text-green"
            style={{ textDecoration: 'none', fontWeight: '300' }}
          >
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;