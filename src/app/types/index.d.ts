type TActiveLinkProps = {
  href: string;
  children: string | React.ReactNode;
};

type TMenuItem = {
  href: string;
  children: string | React.ReactNode;
  icon?: React.ReactNode;
};

export { TActiveLinkProps, TMenuItem };
