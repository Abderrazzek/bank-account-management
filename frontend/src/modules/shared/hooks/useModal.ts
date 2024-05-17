import { useState, useCallback } from "react";

type UseModalResult = {
  isOpen: boolean;
  toggle: () => void;
};

export const useModal = (): UseModalResult => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  return { isOpen, toggle };
};
