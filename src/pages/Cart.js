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

export const Cart = () => {
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const history = useHistory();

  if (!localStorage.getItem("username") && !localStorage.getItem("password")) {
    history.push("/login");
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [products]);

  const getProducts = async () => {
    const data = await axios
      .get("data/products.json")
      .then((res) => res.data.data.products.items);

    data.forEach((element) => (element.quantity = 1));
    const filteredData = data.filter((element) => element.id % 17 === 0);

    setProducts(filteredData);
  };

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

    setProducts((products) =>
      products.map((product) => {
        if (product.id === id) {
          return { ...product, quantity: newQuantity };
        }

        return product;
      })
    );
  };

  return (
    <>
      <Header>Shopping Cart</Header>
      <Container>
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
                    <button>Remove</button>
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
      </Container>
    </>
  );
};
