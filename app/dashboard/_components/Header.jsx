// "use client";

// import { UserButton } from "@clerk/nextjs";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import React, { useEffect } from "react";

// const Header = () => {
//   const path = usePathname();
//   useEffect(() => {
//     console.log(path);
//   }, []);
//   return (
//     <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
//       <Image src={"/logo.svg"} width={160} height={100} alt="logo" />
//       <ul className="hidden md:flex gap-6">
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//             ${path == "/dashboard" && "text-primary font-bold"}
//             `}
//         >
//           Dashboard
//         </li>
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//             ${path == "/dashboard/questions" && "text-primary font-bold"}
//             `}
//         >
//           Questions
//         </li>
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//             ${path == "/dashboard/upgrade" && "text-primary font-bold"}
//             `}
//         >
//           Upgrade
//         </li>
//         <li
//           className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//             ${path == "/dashboard/how" && "text-primary font-bold"}
//             `}
//         >
//           How it Works?
//         </li>
//       </ul>
//       <UserButton />
//     </div>
//   );
// };

// export default Header;
"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Header = () => {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="flex p-4 items-center justify-between bg-gray-900 border-b border-gray-700 shadow-md">
      <Image src={"/logo.svg"} width={160} height={100} alt="logo" />
      
      <ul className="hidden md:flex gap-8">
        <li
          className={`cursor-pointer transition-colors duration-200 
            hover:text-white 
            ${path === "/dashboard" ? "text-white font-semibold" : "text-gray-400"}`}
        >
          Dashboard
        </li>
        <li
          className={`cursor-pointer transition-colors duration-200 
            hover:text-white 
            ${path === "/dashboard/questions" ? "text-white font-semibold" : "text-gray-400"}`}
        >
          Questions
        </li>
        <li
          className={`cursor-pointer transition-colors duration-200 
            hover:text-white 
            ${path === "/dashboard/upgrade" ? "text-white font-semibold" : "text-gray-400"}`}
        >
          Upgrade
        </li>
        <li
          className={`cursor-pointer transition-colors duration-200 
            hover:text-white 
            ${path === "/dashboard/how" ? "text-white font-semibold" : "text-gray-400"}`}
        >
          How it Works?
        </li>
      </ul>

      <UserButton />
    </div>
  );
};

export default Header;
