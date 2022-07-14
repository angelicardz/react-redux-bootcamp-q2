import styled from "styled-components";

export const Header = styled.h1`
  text-align: center;
`;

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
`;

export const Container = styled.div`
  width: 450px;
  height: 300px;
  margin-top: 128px;
  background-color: rgb(245, 245, 245);
  padding: 70px 60px;
`;

export const Label = styled.label`
  line-height: 20px;
`;

export const Input = styled.input`
  width: 95%;
  margin: 15px 0px;
  padding: 10px;
  border: 1px solid rgba(204, 204, 204, 0.8);
  font-size: 1rem;
`;

export const Button = styled.button`
  color: white;
  background-color: rgb(32, 52, 73);
  width: 100%;
  margin: 10px 0px;
  padding: 15px;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
