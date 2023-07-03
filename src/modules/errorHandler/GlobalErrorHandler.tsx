import React, { useEffect, useState } from "react";
import CustomModal from "../common/modals/CustomModal";
import { ModalTypeEnum } from "../../models/enums/ModalTypeEnum";
import { errorStream$ } from "../../services/ErrorService";
import { ModalButtonTypeEnum } from "../../models/enums/ModalButtonTypeEnum";
import { useToast } from "react-native-toast-notifications";
import { toastStream$ } from "../../services/ToastService";
import useLanguage from "../../language/LanguageHook";

const GlobalErrorHandler = ({ children }: any) => {
  const LANGUAGE = useLanguage();
  const toast = useToast();
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

  useEffect(() => {
    const subscription = toastStream$.subscribe((toastData) => {
      // @ts-ignore
      toast.show(
        LANGUAGE ? LANGUAGE.TOAST[toastData.type]![toastData.message]! : "",
        {
          type: toastData.type,
        }
      );

      console.log(toastData);
    });
    return () => subscription.unsubscribe();
  }, [toast]);

  const onClose = () => {
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
