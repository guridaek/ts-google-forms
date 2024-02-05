import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  width: 100%;
  height: 100%;
`;

export const Body = styled.div`
  display: flex;
  gap: 14px;

  width: 760px;

  margin-left: auto;
  margin-right: auto;
  padding-bottom: 100px;

  @media (max-width: 760px) {
    width: 95%;
  }
`;
