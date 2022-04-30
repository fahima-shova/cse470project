import styled from "styled-components";

const Container = styled.div`
  height: 60px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 600;
  width: auto;
`;

const Headline = ({ text }) => {
  return <Container>{text} 🔥 </Container>;
};

export default Headline;
