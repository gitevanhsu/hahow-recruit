interface ButtonType {
  children: string;
  clickHandler: () => void;
  isSubmit: boolean;
}
interface ButtonProps {
  isSubmit: boolean;
}

interface HeroCardProps {
  nowPath: boolean;
}
interface HeroProfileType {
  [key: string]: number;
  agi: number;
  int: number;
  luk: number;
  str: number;
}

export type { ButtonType, ButtonProps, HeroCardProps, HeroProfileType };
