import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { UserContext } from "../App";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CartItems from "./CartItems";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "white" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: white;
  color: white;
  font-weight: 600;
  border: none;
`;
const Cart = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const { orderState } = useContext(UserContext);
  const [orders, setOrders] = orderState;
  const [orderKeyValues, setorderKeyValues] = useState(null);
  const [subtotal, setTotalSubtotal] = useState(0);

  const navigate = useNavigate();
  const handleToken = (token, addresses) => {
    console.log({ token, addresses });
    notify();

    setTimeout(() => {
      navigate("/");
    }, 5000);
  };
  const notify = () =>
    toast("Success! check your email for digital recipt !", {
      type: "success",
    });

  const loadItems = async () => {
    const orderArr = Object.entries(orders);
    setorderKeyValues(orderArr);
    orderArr.forEach(async (element) => {
      if (element[0] != "count") {
        const { data } = await axios.get(
          `//localhost:7000/items/${element[0]}`
        );
        setSelectedItems((prev) => {
          return [...prev, data.result[0]];
        });
      }
    });
  };

  //data loading
  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    setTotalSubtotal(
      selectedItems
        .map((item) => item.price)
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0
        )
    );
  }, [selectedItems, orders]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR SELECTED ITEMS</Title>
        <Top>
          <TopButton>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/productlist"
            >
              CONTINUE SHOPPING
            </Link>
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {selectedItems.length == 0
              ? "no item selected"
              : selectedItems.map((item) => (
                  <CartItems
                    orderKeyValues={orderKeyValues}
                    item={item}
                    key={item._id}
                  />
                ))}
          </Info>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{subtotal} tk</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>
                {subtotal * (5 / 100).toFixed(2)}tk
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>
                - {subtotal * (5 / 100).toFixed(2)} tk
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{subtotal} tk</SummaryItemPrice>
            </SummaryItem>
            <Button>
              <StripeCheckout
                stripeKey="pk_test_51Kp4RIJ9qu66IGFAvajolEJbohc2zM1eMMzUKE58WAlcNl1c79TXPqBIsDCLsfURqf9wOYByd9Nz10RwXNbxE17o008n31UAy1"
                billingAddress
                shippingAddress
                token={handleToken}
                style={{ width: "100%" }}
              />
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
