import { useEffect, useState } from "react";
import { selectedLanguage$ } from "./Language";
import { LanguageEnum } from "./LanguageEnum";

const useSelectedLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageEnum | null>();

  useEffect(() => {
    const subscription = selectedLanguage$.subscribe((language) =>
      setSelectedLanguage(language)
    );
    return () => subscription.unsubscribe();
  }, []);

  return selectedLanguage;
};

export default useSelectedLanguage;
