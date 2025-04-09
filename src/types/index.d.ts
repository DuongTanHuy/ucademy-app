type TActiveLinkProps = {
  href: string;
  children: string | React.ReactNode;
};

type TMenuItem = {
  href: string;
  children: string | React.ReactNode;
  icon?: React.ReactNode;
};

// User

type TCreateUserParams = {
  clerkId: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
};

export { TActiveLinkProps, TMenuItem, TCreateUserParams };
