import React, { useEffect, useState } from "react";
import CustomModal from "../common/modals/CustomModal";
import { ModalTypeEnum } from "../../models/enums/ModalTypeEnum";
import { errorStream$ } from "../../services/ErrorService";
import { ModalButtonTypeEnum } from "../../models/enums/ModalButtonTypeEnum";

const GlobalErrorHandler = ({ children }: any) => {
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorAction, setErrorAction] = useState();

  useEffect(() => {
    const subscription = errorStream$.subscribe((error) => {
      setErrorTitle(error.title);
      setErrorDescription(error.description);
      setErrorAction(error.onAccept);
      setErrorVisibility(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const onClose = () => {
    // if (!!errorAction) errorAction();
    setErrorVisibility(false);
  };

  return (
    <React.Fragment>
      <CustomModal
        title={errorTitle}
        description={errorDescription}
        visible={errorVisibility}
        type={ModalTypeEnum.ERROR}
        modalButtonsData={[
          { text: "OK", type: ModalButtonTypeEnum.DEFAULT, onClick: onClose },
        ]}
      />
      {children}
    </React.Fragment>
  );
};

export default GlobalErrorHandler;
