interface ButtonType {
  children: string;
  clickHandler: () => void;
  isSubmit: boolean;
}
interface ButtonProps {
  isSubmit: boolean;
}

interface HeroCardProps {
  current: string;
}

interface HeroInfoType {
  id: string;
  image: string;
  name: string;
}

interface HeroProfileType {
  [key: string]: number;
  agi: number;
  int: number;
  luk: number;
  str: number;
}

interface AttributeItemProps {
  attributePoint: HeroProfileType;
  attributeName: string;
  increaseHandler: (attr: string) => void;
  decreaseHandler: (attr: string) => void;
}

interface LeftPointAreaProps {
  submitFunction: () => void;
  point: number;
}

interface ModalContentProps {
  popup: boolean;
}
export type {
  ButtonType,
  ButtonProps,
  HeroCardProps,
  HeroProfileType,
  HeroInfoType,
  AttributeItemProps,
  LeftPointAreaProps,
  ModalContentProps,
};
