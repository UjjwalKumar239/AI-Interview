import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";

const Dashboard = () => {
  return (
    <div>
      <h2 className="font-bold text-2xl">Dashboard</h2>
      <h2 className="text-gray-500">Start your interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
    </div>
  );
};

export default Dashboard;
// import { UserButton } from "@clerk/nextjs";
// import React from "react";
// import AddNewInterview from "./_components/AddNewInterview";

// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center justify-center p-6">
//       <h2 className="font-bold text-3xl text-white mb-2">Dashboard</h2>
//       <h3 className="text-gray-400 mb-6">Start your interview</h3>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
//         <AddNewInterview />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
