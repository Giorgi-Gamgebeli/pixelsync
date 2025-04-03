import ScrollFloatingAnimation from "./ScrollFloatingEffect";
import FlexBox from "./FlexBox";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/noBGLogo.png";

function Header() {
  return (
    <ScrollFloatingAnimation>
      <FlexBox className="items-center justify-between text-sm">
        <FlexBox className="items-center gap-1">
          <div className="relative h-11 w-11 overflow-hidden rounded-full">
            <Image
              src={logo}
              alt="logo of the company"
              priority
              className="absolute top-1/2 left-1/2 min-h-12 min-w-12 -translate-x-1/2 -translate-y-1/2"
              height={70}
              width={70}
            />
          </div>
          <p className="text-lg">Pixel Sync</p>
        </FlexBox>
        {/* <Nav /> */}
        <FlexBox className="border-brand-200 items-center gap-2 border-l pl-2">
          <Link
            href="/login"
            className="border-brand-200 hover:bg-brand-200 rounded-full border px-3 py-2 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-primary hover:bg-secondary rounded-full px-4 py-2 text-sm text-white transition-all duration-300"
          >
            Get Started
          </Link>
        </FlexBox>
      </FlexBox>
    </ScrollFloatingAnimation>
  );
}

export default Header;
