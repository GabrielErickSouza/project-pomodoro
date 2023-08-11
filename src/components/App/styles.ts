import styled from "styled-components";

export const AppWrapper = styled.div<{ $isWorking: boolean }>`
  height: 100vh;
  background: ${({ $isWorking }) => ($isWorking ? "#f00" : "#41e1ba")};
  transition: background-color 300ms ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  max-width: 640px;
`;
