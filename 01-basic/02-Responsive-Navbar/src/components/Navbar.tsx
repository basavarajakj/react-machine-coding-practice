import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  // === State ===
  const [openMega, setOpenMega] = useState(null); // which mega menu is open (string)
  const [mobileOpen, setMobileOpen] = useState(false); // mobile slide menu
  const [searchOpen, setSearchOpen] = useState(false); // search overlay
  const [cartOpen, setCartOpen] = useState(false); // cart drawer

  const navItems = [
    {
      key: "new",
      label: "New & Featured",
      columns: [
        {
          title: "What's New",
          links: ["Shop All", "New Releases", "Best Sellers"]
        },
        {
          title: "Collections",
          links: ["Air Max", "Running", "Training"]
        }
      ]
    },
    {
      key: "men",
      label: "Men",
      columns: [
        { title: "Shoes", links: ["Running", "Lifestyle", "Basketball"] },
        { title: "Clothing", links: ["Tops", "Bottoms", "Outerwear"] }
      ]
    },
    {
      key: "women",
      label: "Women",
      columns: [
        { title: "Shoes", links: ["Lifestyle", "Running", "Sportswear"] },
        { title: "Clothing", links: ["Dresses", "Tops", "Leggings"] }
      ]
    },
    {
      key: "kids",
      label: "Kids",
      columns: [
        { title: "Boys", links: ["Shoes", "Clothing"] },
        { title: "Girls", links: ["Shoes", "Clothing"] }
      ]
    },
    {
      key: "sale",
      label: "Sale",
      columns: [
        { title: "Offers", links: ["Up to 50% Off", "Outlet"] }
      ]
    }
  ];

  // === Animations ===
  const menuEnter = { opacity: 0, y: -6 };
  const menuCenter = { opacity: 1, y: 0 };
  const menuExit = { opacity: 0, y: -6 };

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Top utility bar */}
      <div className="bg-black text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Help</span>
            <span className="hover:underline cursor-pointer">Join Us</span>
            <span className="hover:underline cursor-pointer">Sign In</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            {/* small brand icons — on India site they show Jordan/Converse sometimes */}
            <img
              src="https://via.placeholder.com/20x12?text=J"
              alt="Jordan"
              className="h-3 w-auto"
            />
            <img
              src="https://via.placeholder.com/20x12?text=C"
              alt="Converse"
              className="h-3 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-2xl"
                aria-label="Open menu"
              >
                ☰
              </button>

              <a href="#" className="flex items-center gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
                  alt="Nike"
                  className="h-6 w-auto"
                />
              </a>

              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => setOpenMega(item.key)}
                    onFocus={() => setOpenMega(item.key)}
                    onMouseLeave={() => setOpenMega(null)}
                  >
                    <button className="font-medium px-1 py-2 hover:text-gray-700">
                      {item.label}
                    </button>

                    {/* Mega menu panel */}
                    <AnimatePresence>
                      {openMega === item.key && (
                        <motion.div
                          initial={menuEnter}
                          animate={menuCenter}
                          exit={menuExit}
                          transition={{ duration: 0.18 }}
                          className="absolute left-0 mt-2 w-screen max-w-md bg-white shadow-lg border rounded-md p-4"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            {item.columns.map((col, idx) => (
                              <div key={idx}>
                                <h4 className="font-semibold mb-2">{col.title}</h4>
                                <ul className="space-y-1 text-sm">
                                  {col.links.map((l) => (
                                    <li key={l} className="hover:underline">
                                      <a href="#">{l}</a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2 rounded hover:bg-gray-100"
              >
                🔍
              </button>
              <button aria-label="Wishlist" className="p-2 rounded hover:bg-gray-100">
                🤍
              </button>
              <button
                aria-label="Profile"
                className="hidden sm:inline-flex items-center gap-2 p-2 rounded hover:bg-gray-100"
              >
                👤
              </button>

              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className="p-2 rounded hover:bg-gray-100"
              >
                🛒
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-3xl bg-white rounded-md p-4"
            >
              <div className="flex items-center gap-3">
                <input
                  autoFocus
                  className="flex-1 p-3 outline-none"
                  placeholder="Search for products, styles and more"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="px-4 py-2 hover:bg-gray-100 rounded"
                >
                  Close
                </button>
              </div>

              {/* Quick links */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <a className="hover:underline">Women</a>
                <a className="hover:underline">Men</a>
                <a className="hover:underline">Kids</a>
                <a className="hover:underline">Sale</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <motion.aside
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] z-50 bg-white shadow-2xl"
          >
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Bag</h3>
              <button onClick={() => setCartOpen(false)}>Close</button>
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-500">Your bag is empty.</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />

            {/* panel */}
            <motion.nav
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              className="fixed z-50 left-0 top-0 h-full w-80 bg-white shadow-lg overflow-auto"
            >
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg"
                    alt="Nike"
                    className="h-6"
                  />
                </div>
                <button onClick={() => setMobileOpen(false)}>✖</button>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <input
                    placeholder="Search"
                    className="w-full p-3 border rounded outline-none"
                  />
                </div>

                <div className="space-y-2">
                  {navItems.map((n) => (
                    <div key={n.key}>
                      <button
                        className="w-full text-left font-medium py-2"
                        onClick={() => setOpenMega((s) => (s === n.key ? null : n.key))}
                      >
                        {n.label}
                      </button>
                      {openMega === n.key && (
                        <div className="pl-4 text-sm">
                          {n.columns.map((c, i) => (
                            <div key={i} className="mb-2">
                              <div className="font-semibold">{c.title}</div>
                              <ul className="space-y-1">
                                {c.links.map((l) => (
                                  <li key={l} className="py-1">
                                    <a href="#">{l}</a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-4">
                  <button className="w-full text-left py-2">Sign In</button>
                  <button className="w-full text-left py-2">Join Us</button>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Spacer so page content isn't hidden behind fixed header */}
      <div className="h-24 md:h-20" />
    </header>
  );
}

