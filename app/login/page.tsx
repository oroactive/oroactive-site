import { LoginForm } from "@/components/LoginForm";
import { Nav } from "@/components/Nav";

export const metadata = {
  title: "Login OroActive",
  robots: { index: false, follow: false }
};

export default function LoginPage() {
  return (
    <>
      <Nav />
      <main className="grid min-h-[calc(100vh-80px)] place-items-center px-5 py-16">
        <LoginForm />
      </main>
    </>
  );
}
