import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/authBg.png')" }} 
    >
      <div className="w-[90%] max-w-[500px] bg-[#00000060] backdrop-blur-md rounded-3xl shadow-2xl p-8">
        <h1 className="text-white text-3xl font-semibold text-center mb-6">
          Register for <span className="text-blue-400">Mock-Interview</span>
        </h1>
        <SignUp
          appearance={{
            elements: {
              card: "bg-transparent shadow-none",
              formButtonPrimary:
                "w-full h-[60px] mt-4 bg-white text-black text-[19px] font-semibold rounded-full",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              formFieldLabel: "hidden",
              formFieldInput:
                "w-full h-[60px] border-2 border-white bg-transparent text-white placeholder-gray-300 px-6 rounded-full text-[18px]",
              formFieldInputShowPasswordButton: "text-white pr-4",
              socialButtonsBlockButton:
                "border border-white text-white rounded-full hover:bg-white hover:text-black transition",
              socialButtonsBlockButtonText: "font-medium text-sm",
              footerActionText: "text-white text-[18px]",
              footerActionLink: "text-blue-400 ml-1",
            },
          }}
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
}
