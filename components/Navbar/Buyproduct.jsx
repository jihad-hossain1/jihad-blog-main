import NavLink from "../Navlink/NavLink";
import { PiShoppingCartThin } from "react-icons/pi";

const Buyproduct = () => {
  return (
    <div className="md:block hidden">
      <NavLink
        href={"/products"}
        className="flex space-x-2 items-center cursor-pointer hover:text-gray-700  hover:underline"
      >
        <PiShoppingCartThin className="text-2xl" />
        <span>Buy products</span>
      </NavLink>
    </div>
  );
};

export default Buyproduct;
