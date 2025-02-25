import styled, { css } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./Button";
import Input from "./ui/Input";

const ParentDiv = styled.div`
  background-color: var(--color-brand-200);
  padding: 5rem;
  margin: 2rem;
  height: 100%;
  /* text-align: center; */
`;

const Container = styled.div`
  /* margin: 8rem; */
`;

const secondaryStyle = css`
  color: pink;
`;

const terStyle = css`
  color: green;
`;

const priStyle = css`
  color: red;
`;
// /* color: red; */
// //not works for defult prop  outside1 styles applied for defprops
// //same html tag applies
// ///* ${(props) => props.type === "sec" && secondaryStyle};
// //${(props) => props.type === "ter" && terStyle}; */
// // /* diff tags applies crrt way */

const H1 = styled.h1`
  font-size: 4rem;
  background-color: yellow;
  color: ${(props) => (props.pri ? "red" : "blue")};
  ${(props) => props.as === "h2" && secondaryStyle};
  ${(props) => props.as === "h3" && terStyle};
`;

H1.defaultProps = { pri: false };

const horStyle = css`
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
`;
// const Row = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   ${(props) => props.type === "hor" && horStyle};
// `;
const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  /* border-bottom: 2rem solid blue; */
  padding: 5rem;

  ${(props) => props.type === "hor" && horStyle};
`;

function App() {
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <ParentDiv>
        <Row>
          <H1>The Wood Hotel</H1>
          <Container>
            <Button onClick={() => alert("Checked in ")}>Check-in</Button>
            <Button>Check-out</Button>
          </Container>
          {/* <H1 type="sec">Secondary hotel</H1> */}
          <H1 as="h2">Secondary hotel</H1>
          <div>
            <Input type="number" placeholder="Number of guests"></Input>
            <Input type="text" placeholder="Your Name"></Input>
          </div>
          {/* <H1 type="ter">Tertiary hotel</H1> */}
          <H1 as="h3">Tertiary hotel</H1>
        </Row>
        <Row type="hor">
          <H1 pri="true">The Wood Hotel</H1>
          <Container>
            <Button onClick={() => alert("Checked in ")}>Check-in</Button>
            <Button>Check-out</Button>
          </Container>
          {/* <H1 type="sec">Secondary hotel</H1> */}
          <H1 as="h2">Secondary hotel</H1>
          <div>
            <Input type="number" placeholder="Number of guests"></Input>
            <Input type="text" placeholder="Your Name"></Input>
          </div>
          {/* <H1 type="ter">Tertiary hotel</H1> */}
          <H1 as="h3">Tertiary hotel</H1>
        </Row>
      </ParentDiv>
    </>
  );
}

export default App;
