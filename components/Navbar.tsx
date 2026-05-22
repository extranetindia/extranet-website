"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/lib/data";
import { Logo } from "@/components/Logo";
import { MenuIcon, CloseIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <Container>
        <nav className="flex h-14 items-center justify-between sm:h-[60px]">
          <Logo />

          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] font-medium text-muted transition-colors hover:text-telecom"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <Button href="/dashboard" variant="ghost" className="px-3 py-2 text-[13px]">
              Login
            </Button>
            <Button href="#plans" variant="primary" className="px-4 py-2 text-[13px]">
              View plans
            </Button>
          </div>

          <button
            type="button"
            className="rounded-md p-2 text-foreground md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>

        {open && (
          <div className="animate-fade-in border-t border-border pb-4 md:hidden">
            <ul className="pt-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2.5 text-[13px] font-medium text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
                <Button href="/dashboard" variant="outline" className="w-full">
                  Login
                </Button>
                <Button href="#plans" variant="primary" className="w-full">
                  View plans
                </Button>
              </li>
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}
