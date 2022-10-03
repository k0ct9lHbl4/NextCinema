import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import MaterialIcon from "@/ui/MaterialIcon";

import styles from "./Menu.module.scss";
import { IMenuItem } from "./menu.interface";

const MenuItem: React.FC<{ item: IMenuItem }> = ({ item }) => {
  const { asPath } = useRouter();

  return (
    <li
      className={cn({
        [styles.active]:
          asPath === item.link ||
          (item.link.slice(1) && asPath.startsWith(item.link)),
      })}
    >
      <Link href={item.link}>
        <a>
          <MaterialIcon name={item.icon} />
          <span>{item.title}</span>
        </a>
      </Link>
    </li>
  );
};

export default MenuItem;
