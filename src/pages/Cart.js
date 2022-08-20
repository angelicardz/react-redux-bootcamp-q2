import { useState, useEffect } from "react";
import {
  TableHeader,
  TableBody,
  Container,
  Header,
  TotalSummary,
  Button,
} from "../styles/pages/Cart.styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { update, remove, selectCart } from "../redux/slices/myCartSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectCart);
  const [totalItems, setTotalItems] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const history = useHistory();

  if (!localStorage.getItem("username") && !localStorage.getItem("password")) {
    history.push("/login");
  }

  useEffect(() => {
    calculateTotals();
  }, [products]);

  const calculateTotals = () => {
    const countItems = products.reduce((accumulator, product) => {
      return accumulator + Number(product.quantity);
    }, 0);
    setTotalItems(countItems);

    const countCost = products
      .reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
      }, 0)
      .toFixed(2);
    setTotalCost(countCost);
  };

  const changeQuantity = (id, e) => {
    const newQuantity = e.target.value < 1 ? 1 : e.target.value;
    dispatch(update({ id, newQuantity }));
  };

  const removeFromCart = (id) => {
    dispatch(remove(id));
  };

  return (
    <>
      <Header>Shopping Cart</Header>
      <Container>
        {products.length === 0 ? (
          "There are no products in the shopping cart"
        ) : (
          <>
            <table>
              <TableHeader>
                <tr>
                  <th></th>
                  <th>Product details</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </TableHeader>
              <TableBody>
                {products.map(({ id, images, name, price, quantity }) => {
                  const total = (quantity * price).toFixed(2);
                  return (
                    <tr key={id}>
                      <td style={{ textAlign: "center" }}>
                        <img src={images[0]} alt={name} height="140px" />
                      </td>
                      <td>
                        {name}
                        <br />
                        Product code: {id}
                      </td>
                      <td>
                        <input
                          type="number"
                          value={quantity}
                          style={{ width: "58px" }}
                          onChange={(e) => changeQuantity(id, e)}
                        />
                        <button onClick={() => removeFromCart({ id })}>
                          Remove
                        </button>
                      </td>
                      <td>${price}</td>
                      <td>${total}</td>
                    </tr>
                  );
                })}
              </TableBody>
            </table>

            <TotalSummary>
              <h4>Summary</h4>
              <hr />
              Items: {totalItems}
              <hr />
              Total Cost: $ {totalCost}
              <Button>Checkout</Button>
            </TotalSummary>
          </>
        )}
      </Container>
    </>
  );
};
