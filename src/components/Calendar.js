import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: aliceblue;
  min-width: calc(266px + 12px);

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 12px;
  margin-right: 12px;
`;

const Calendar = ({ number }) => {
  return <Wrapper>Calendar {number}</Wrapper>;
};

export default Calendar;
