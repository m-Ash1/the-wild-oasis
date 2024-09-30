import { useState } from "react";
import SignUpForm from "../features/authentication/SignUpForm";
import UsersTable from "../features/authentication/UsersTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
function Users() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <UsersTable />
      <Button onClick={() => setIsOpen(!isOpen)}>Create user</Button>
      {isOpen && <SignUpForm />}
    </>
  );
}

export default Users;
