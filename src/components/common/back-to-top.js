import { VerticalAlignTopOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ToTop = styled(VerticalAlignTopOutlined)`
  position: fixed;
  bottom: 50px;
  right: 15px;
  z-index: 999;
  font-size: 40px;
  color: #fff;
  padding: 5px;
  background: rgba(0, 0, 0, 0.3);
  opacity: 0.5;
  transition: all 0.5s;
  :hover {
    opacity: 0.8;
  }
`;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = document.getElementById("root");
    const listener = (event) => {
      const isVisible = event.target.scrollTop > 600;
      setVisible(isVisible);
    };
    element.addEventListener("scroll", listener);
    //scroll 条件
    return () => {
      element.removeEventListener("scroll", listener);
    };
  }, []);

  return visible ? (
    <ToTop
      onClick={() => {
        const element = document.getElementById("root");
        // console.log(element);
        // element.scrollTop = 0;
        element.scrollTo({ top: 0, behavior: "smooth" });
      }}
    />
  ) : null;
}
