import Image from "next/image";
import Link from "next/link";

import logoImage from "@/assets/images/logo.svg";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <a className="px-layout mb-10 block">
        <Image
          src={logoImage}
          width={200}
          height={60}
          alt="Next-cinema"
          draggable={false}
        />
      </a>
    </Link>
  );
};

export default Logo;
