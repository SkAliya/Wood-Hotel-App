import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";
import Row from "../ui/Row";
function NewUsers() {
  return (
    <Row type="vertical">
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </Row>
  );
}

export default NewUsers;
