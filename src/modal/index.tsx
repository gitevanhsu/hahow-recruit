import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { ModalContentProps, NoticeAlertProps } from "../types";
// eslint-disable-next-line import/no-unresolved, import/no-absolute-path
import notice from "/notice.png";

const ModalWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;
const OverLay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #000;
  opacity: 0.3;
`;
const ModalContent = styled.div<ModalContentProps>`
  width: 300px;
  height: 300px;
  padding: 20px;
  background-color: #fff;
  position: absolute;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:after {
    content: "";
    width: ${(props) => (props.popup ? "0%" : "100%")};
    height: 10px;
    background-color: #00b3c3;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: width 1s linear;
  }
`;
const Image = styled.img`
  width: 50%;
`;
const Text = styled.p`
  display: inline-block;
  margin-top: 50px;
  font-size: 24px;
`;

export default function NoticeAlert({ children, closeModal }: NoticeAlertProps) {
  const [isPopup, setIsPopup] = useState(false);

  useEffect(() => {
    setIsPopup(true);
    const timer = setTimeout(() => closeModal(), 1000);
    return () => {
      setIsPopup(false);
      clearTimeout(timer);
    };
  }, [closeModal]);

  return (
    <ModalWrap>
      <OverLay onClick={closeModal} />
      <ModalContent popup={isPopup}>
        <Image src={notice} alt="notice" />
        <Text>{children}</Text>
      </ModalContent>
    </ModalWrap>
  );
}
