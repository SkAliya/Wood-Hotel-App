import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./Button";
import Input from "./InputComponent";

const H1 = styled.h1`
  font-size: 4rem;
  background-color: yellow;
`;

const ParentDiv = styled.div`
  background-color: var(--color-brand-200);
  padding: 5rem;
  margin: 2rem;
  height: 100vh;
  text-align: center;
`;

const Container = styled.div`
  margin: 8rem;
`;

function App() {
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <ParentDiv>
        <H1>The Wood Hotel</H1>
        <Container>
          <Button onClick={() => alert("Checked in ")}>Check-in</Button>
          <Button>Check-out</Button>
        </Container>
        <Input type="number" placeholder="Number of guests"></Input>
        <Input type="text" placeholder="Your Name"></Input>
      </ParentDiv>
    </>
  );
  o;
}

export default App;
