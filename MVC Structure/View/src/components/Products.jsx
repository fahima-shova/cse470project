import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ type }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7000/${type}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.result);
      });
  }, []);

  return (
    <Container>
      {items.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
