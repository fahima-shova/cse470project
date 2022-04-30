import { ShoppingCartOutlined } from "@material-ui/icons";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { UserContext } from "../App";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Title = styled.div`
  height: auto;
  width: auto;
  border-radius: 5px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const { orderState } = useContext(UserContext);
  const [orders, setOrders] = orderState;

  const addToOrder = (key) => {
    const order = { ...orders };
    order.count = order.count + 1 || 1;
    order[key] = order[key] + 1 || 1;

    setOrders(order);
    notify(item);
  };

  const notify = (item) =>
    toast(`${item.name} has been added`, { type: "success" });

  return (
    <>
      <Container>
        <Circle />
        <Image src={item.img} />

        <Info>
          <Title>
            Name: {item.name}
            <br></br>
            Price: ${item.price}
            <br></br>
            Rating: ⭐⭐⭐
          </Title>

          <Icon>
            <ShoppingCartOutlined
              onClick={() => {
                addToOrder(item._id, item);
              }}
            />
          </Icon>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </Info>
      </Container>
    </>
  );
};

export default Product;
