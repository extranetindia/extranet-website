import Link from "next/link";
import { brand, footerLinks } from "@/lib/data";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-telecom-darker text-slate-400">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2">
            <Logo className="[&_img]:brightness-0 [&_img]:invert" />
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed">
              {brand.legal}. Licensed ISP serving homes and SMEs across India.
            </p>
            <p className="mt-4 text-[13px]">
              <span className="text-slate-500">Support: </span>
              <a href="tel:18001234567" className="text-white hover:underline">
                1800-123-4567
              </a>
            </p>
          </div>

          {(
            [
              { title: "Company", links: footerLinks.company },
              { title: "Support", links: footerLinks.support },
              { title: "Legal", links: footerLinks.legal },
            ] as const
          ).map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-medium text-white">{group.title}</h4>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-[12px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.legal}
          </p>
          <p>TRAI License No. ISP-DEL-2024-0142</p>
        </div>
      </Container>
    </footer>
  );
}
