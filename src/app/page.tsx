import GenericAuthPage from "@/components/auth/AuthComponent";

export default function SignIn() {
  return (
    <GenericAuthPage
      imageSrc="/images/auth-signin.jpg"
      imageAlt="Sign In Illustration"
      upperCardTitle="Income"
      upperCardValue="5000"
      upperCardChange="+15%"
      lowerCardTitle="Expense"
      lowerCardValue="4300"
      lowerCardChange="16%"
      termsLink=""
    />
  );
}
