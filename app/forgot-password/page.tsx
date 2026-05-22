import { AuthLayout } from "@/components/auth/AuthLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Forgot password | Extranet Customer Portal",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your registered mobile number linked to your Extranet broadband account."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
