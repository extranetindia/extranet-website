import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign in | Extranet Customer Portal",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Use your registered mobile number to access the customer portal."
    >
      <LoginForm />
    </AuthLayout>
  );
}
