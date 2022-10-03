import { MouseEvent } from "react";

import MaterialIcon from "@/ui/MaterialIcon";

import { useActions } from "@/hooks/useActions";

const LogoutButton: React.FC = () => {
  const { logout } = useActions();

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <li>
        <a onClick={handleLogout}>
          <MaterialIcon name="MdLogout" />
          <span>Logout</span>
        </a>
      </li>
    </>
  );
};

export default LogoutButton;
