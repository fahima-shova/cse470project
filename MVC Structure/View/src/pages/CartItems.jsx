import React, { useContext } from "react";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { UserContext } from "../App";

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
    props.type === "filled" ? "black" : "transparent"};
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
  background-color: black;
  color: white;
  font-weight: 600;
`;

const CartItems = ({item, orderKeyValues}) => {
  const {orderState} = useContext(UserContext);
  const [orders, setOrders] = orderState;
 
let  amount = 0;  
orderKeyValues.map(p=> item._id==p[0]? amount = p[1] : null )

const addToOrder=(key)=>{  
  const order = {...orders};
  order.count = order.count+1 || 1;
  order[key]= order[key]+1 || 1;

  setOrders(order);    
}

  return (
    <>
      <Product>   
              <ProductDetail>
                <Image src={item.img} />
                <Details>
                  <ProductId>
                    <b>ID:</b> {item._id}
                  </ProductId>                 
                  <ProductName>
                    <b>Product:</b> {item.name}
                  </ProductName>
                  <ProductPrice>
                    <b>Price:</b>{item.price}
                  </ProductPrice>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                {/* <button onClick={()=>{addToOrder(item._id)}} style={{background: "none", border:"none"}}>
                  <Add  />
                  </button> */}
                  <ProductAmount>
                   {amount}
                    </ProductAmount>
                  {/* <button  onClick={()=> console.log("clicked")} style={{background: "none", border:"none"}}>
                  <Remove  />
                  </button> */}
                </ProductAmountContainer>
                <ProductPrice>{item.price*amount} tk</ProductPrice>
              </PriceDetail>
            </Product>
    </>
  );
};

export default CartItems;




