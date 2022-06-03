import * as Fa from "react-icons/fa";
import * as Hi from "react-icons/hi";
import * as Ai from "react-icons/ai";

export const Links = [
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: <Hi.HiHome />,
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard",
    icon: <Ai.AiFillSetting />,
  },
  {
    id: 3,
    name: "Products",
    path: "/products",
    icon: <Ai.AiOutlineCodeSandbox />,
  },
  {
    id: 4,
    name: "Shopping Cart",
    path: "/cart",
    icon: <Fa.FaShoppingCart />,
  },
  {
    id: 5,
    name: "Contact",
    path: "/contact",
    icon: <Ai.AiOutlineContacts />,
  },
  {
    id: 6,
    name: "About",
    path: "/about",
    icon: <Fa.FaInfoCircle />,
  },
];
