import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";
const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in into your account</Heading>
      <LoginForm />
      <div style={{ textAlign: "center" }}>
        <div>Guest Account</div>
        <div>
          <strong>Email: </strong>
          guest@gmail.com
        </div>
        <div>
          <strong>Password: </strong>
          123123123
        </div>
      </div>
    </LoginLayout>
  );
}

export default Login;
