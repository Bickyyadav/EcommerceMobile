import { SignIn } from "@clerk/react";


function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen hero">
      <SignIn />
    </div>
  );
}
export default LoginPage;

