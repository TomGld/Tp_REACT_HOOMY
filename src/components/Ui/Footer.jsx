import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { ICONES_URL } from "../../constants/apiConstant";

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const color = isHome ? "#F08A4F" : "#C2858C";

  return (
    <footer
      className="fixed bottom-0 left-0 w-full bg-[#ece6e2] px-6 py-1 flex justify-between items-center rounded-t-[40px] shadow-inner z-10"
    >
      {/* Home Button */}
      <Link to="/">
        <button
          className={`w-13 h-13 flex items-center justify-center rounded-full shadow-md transition-all duration-300 cursor-pointer ${
            isHome ? "bg-[#F08A4F]" : "bg-[#C2858C]"
          }`}
        >
          <AiOutlineHome className="h-6 w-6 text-white" />
        </button>
      </Link>

      {/* IA ASK Button */}
      <button
        className={`flex items-center gap-3 px-6 py-1 rounded-full shadow-md text-white font-medium transition-all duration-300 ${
          isHome ? "bg-[#F08A4F]" : "bg-[#C2858C]"
        }`}
      >
        <span>IA bientôt disponible</span>
        <img src={`${ICONES_URL}/Noctys.png`} alt="" />
      </button>
    </footer>
  );
};

export default Footer;
