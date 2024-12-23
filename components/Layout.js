import { useState, useEffect } from "react";
import Link from "next/link";

export const Layout = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent background scrolling when the menu is open
  useEffect(() => {
    if (menuOpen) {
      // Add a class to the body when the menu is open
      document.body.classList.add("overflow-hidden");
    } else {
      // Remove the class when the menu is closed
      document.body.classList.remove("overflow-hidden");
    }

    // Clean up on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [menuOpen]);

  return (
    (<div className="relative">
      <header className="sm:h-16 flex flex-row items-center px-3 pt-5 pb-6">
        <Link href="/" className="text-3xl cursor-pointer">

          <strong>Jihyun Kim</strong>Ceramic
                    
        </Link>
        <button
          className="bg-button hover:bg-buttonHover rounded-full p-2.5 ml-auto cursor-pointer"
          onClick={() => setMenuOpen(true)}
        >
          <img src="/images/menu.svg" alt="menu" className="w-5 h-5" />
        </button>
      </header>
      {/* Apply blur when menu is open */}
      <main
        className={`transition-all duration-300 ${
          menuOpen ? "filter blur-md" : ""
        }`}
      >
        {props.children}
      </main>
      <footer className="sm:h-16">Footer</footer>
      {/* Overlay menu */}
      {/* Always render the overlay menu */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-background bg-opacity-50 backdrop-blur-md transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="absolute top-5 right-3 bg-buttonHover rounded-full p-3 cursor-pointer"
          onClick={() => setMenuOpen(false)}
        >
          {/* Close icon */}
          <img src="/images/close.svg" alt="close" className="w-4 h-4" />
        </button>
        <nav className="flex flex-col items-center space-y-8">
          <Link
            href="/"
            className="text-3xl font-semibold"
            onClick={() => setMenuOpen(false)}>
            
              Home
            
          </Link>
          <Link
            href="/about"
            className="text-3xl font-semibold"
            onClick={() => setMenuOpen(false)}>
            
              About
            
          </Link>
          <Link
            href="/exhibitions"
            className="text-3xl font-semibold"
            onClick={() => setMenuOpen(false)}>
            
              Exhibitions
            
          </Link>
          <Link
            href="/shop"
            className="text-3xl font-semibold"
            onClick={() => setMenuOpen(false)}>
            
              Shop
            
          </Link>
        </nav>
      </div>
    </div>)
  );
};
