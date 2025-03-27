"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <nav
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'black',
        borderRadius: '50px',
        padding: '10px 20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
        width: 'auto',
        maxWidth: '1200px',
        border: '1px solid rgb(84, 84, 84)',
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
          <img
            src="\logo.png"
            alt="Logo"
            style={{ width: '23px', height: '23px' }}
          />
          <span
            style={{
              fontSize: '1.3rem',
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
        <a href="../navbar-pages/about" className="nav-link"> About Us </a>
        <a href="../navbar-pages/faq" className="nav-link"> FAQ's </a>
        <a href="#contactUs"className="nav-link"> Contact Us </a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
        <a
          href="#dashboard"
          style={{
            textDecoration: 'none',
            backgroundColor: '#81D18D',
            color: 'black',
            borderRadius: '50px',
            padding: '8px 16px',
            fontWeight: 'bold',
            whiteSpace: 'nowrap', // Prevent text wrapping
          }}
          className="dashboard-button"
        >
          Try Now
        </a>
      </div>

      {/* Mobile Menu (Hidden by Default) */}
      {isMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: '0',
            right: '0',
            backgroundColor: 'black',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 999,
            border: '1px solid #81D18D',
          }}
          className="mobile-menu"
        >
          <a
            href="#about"
            style={{ textDecoration: 'none', color: 'white', fontWeight: '300' }}
          >
            About Us
          </a>
          <a
            href="#FAQ"
            style={{ textDecoration: 'none', color: 'white', fontWeight: '300' }}
          >
            FAQ's
          </a>
          <a
            href="#contactUs"
            style={{ textDecoration: 'none', color: 'white', fontWeight: '300' }}
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;