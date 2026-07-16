import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type Props = LinkButtonProps | NativeButtonProps;

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: Props) {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("sms:");
    if (isExternal) {
      return (
        <a href={href} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {props.children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {props.children}
      </Link>
    );
  }

  const { ...rest } = props as NativeButtonProps;
  return (
    <button className={cls} {...rest}>
      {props.children}
    </button>
  );
}
