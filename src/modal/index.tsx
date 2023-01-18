import styled from "@emotion/styled";
import { useEffect } from "react";

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

const ModalContent = styled.div`
  width: 300px;
  height: 300px;
  background-color: #fff;
  text-align: center;
  line-height: 300px;
  position: absolute;
`;

export default function NoticeAlert({
  children,
  closeModal,
}: {
  children: string;
  closeModal: () => void;
}) {
  useEffect(() => {
    setTimeout(() => {
      closeModal();
    }, 1000);
  }, [closeModal]);

  return (
    <ModalWrap>
      <OverLay onClick={closeModal} />
      <ModalContent>{children}</ModalContent>
    </ModalWrap>
  );
}
