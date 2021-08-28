import styled from "styled-components";
import { Layout } from "antd";

const { Header } = Layout;

export const LogoSpan = styled.span`
  display: inline-block;
  width: 100%;
  color: #fff;
  font-size: 1.2em;
  letter-space: 5px;
  text-shadow: 0.1em 0.1em 0.2em;
  text-align: center;
  margin: 20px 0;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #1890ff;
  }
`;

export const StyledHeader = styled(Header)`
  font-size: 1.2em;
  color: #fff;
  position: sticky;
  z-index: 100;
  top: 0;
  & .trigger {
    padding: 0 1.5em;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  & .trigger:hover {
    color: #1890ff;
  }

  & div {
    display: inline-block;
    float: right;

    & span.logout {
      cursor: pointer;
    }

    & span.logout:hover {
      color: red;
    }
  }
`;
