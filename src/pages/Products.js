import { useState, useEffect } from "react";
import {
  Container,
  Product,
  Title,
  Category,
  Price,
  Button,
} from "../styles/pages/Products.styles";
import { useDispatch } from "react-redux";
import { add } from "../redux/slices/myCartSlice";
import axios from "axios";

export const Products = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get("data/products.json")
      .then((res) => setProducts(res.data.data.products.items));
  };

  const addToCart = ({ product }) => {
    dispatch(add({ product }));
  };

  return (
    <Container>
      {products.map((product) => {
        const productName =
          product.name.length > 40
            ? `${product.name.substring(0, 40)}...`
            : product.name;
        return (
          <Product key={product.id}>
            <img src={product.images[0]} alt={product.name} />
            <Title>{productName}</Title>
            <Category>{product.categories[0]}</Category>
            <Price>$ {product.price}</Price>
            <Button onClick={() => addToCart({ product })}>Add to cart</Button>
          </Product>
        );
      })}
    </Container>
  );
};
