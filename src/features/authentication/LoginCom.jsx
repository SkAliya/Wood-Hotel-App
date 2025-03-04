import H1 from "../../ui/Heading";
import Logo from "../../ui/Logo";
import LoginForm from "./LoginForm";

function LoginCom() {
  return (
    <>
      <Logo />
      <H1 as="h4">Login to your account</H1>
      <LoginForm />
    </>
  );
}

export default LoginCom;
