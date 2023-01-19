import { createPortal } from "react-dom";
import NoticeAlert from "../modal";

export default function NoticeModal(
  closeFunction: React.Dispatch<React.SetStateAction<boolean>>,
  content: string
) {
  return createPortal(
    <NoticeAlert
      closeModal={() => {
        closeFunction(false);
      }}
    >
      {content}
    </NoticeAlert>,
    document.querySelector("#modal-root") as HTMLElement
  );
}
