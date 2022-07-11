import styled from "styled-components";

export const TableHeader = styled.thead`
  text-align: left;
  th {
    padding: 0px 20px;
  }
`;

export const TableBody = styled.tbody`
  td {
    padding: 0px 20px;
    max-width: 300px;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Header = styled.h1`
  width: 100%;
  text-align: center;
`;

export const TotalSummary = styled.div`
  background-color: rgb(245, 245, 245);
  height: 200px;
  padding: 20px;
  margin-left: 30px;

  hr {
    background-color: lightgray;
    height: 1px;
    border: none;
  }
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
