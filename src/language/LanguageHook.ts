import { useEffect, useState } from "react";
import { LanguageType } from "./LanguageType";
import { language$ } from "./Language";

const useLanguage = () => {
  const [LANGUAGE, setLanguage] = useState<LanguageType | null>();

  useEffect(() => {
    const subscription = language$.subscribe((language) =>
      setLanguage(language)
    );
    return () => subscription.unsubscribe();
  }, []);

  return LANGUAGE;
};

export default useLanguage;
