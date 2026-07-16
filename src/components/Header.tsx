"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./Logo";
import { business, nav } from "@/lib/config";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const menuId = useId();

  // Close the mobile menu on route change (React-recommended pattern: adjust
  // state during render instead of in an effect, to avoid an extra render).
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Logo />

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  data-active={isActive(item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.right}>
          <a href={business.phoneHref} className={styles.phone}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3.1.7-.2 1L6.6 10.8Z"
                fill="currentColor"
              />
            </svg>
            <span>{business.phoneDisplay}</span>
          </a>

          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span data-open={open} />
            <span data-open={open} />
            <span data-open={open} />
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className={styles.mobileMenu}
        data-open={open}
        aria-hidden={!open}
      >
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={styles.mobileLink}
                tabIndex={open ? 0 : -1}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <a href={business.phoneHref} className={styles.mobileCta} tabIndex={open ? 0 : -1}>
          Call or Text {business.phoneDisplay}
        </a>
      </div>
    </header>
  );
}
