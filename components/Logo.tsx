import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  href?: string;
};

export function Logo({ className = "", href = "/" }: LogoProps) {
  return (
    <Link href={href} className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src="/extranet-logo.svg"
        alt="Extranet"
        width={148}
        height={36}
        priority
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}
