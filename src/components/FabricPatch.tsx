import { type CSSProperties, type ReactNode } from "react";

type FabricPatchProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "a" | "button";
  href?: string;
  onClick?: () => void;
  "aria-label"?: string;
  style?: CSSProperties;
  "data-stitch-content"?: boolean;
  "data-stitch-id"?: string;
  "data-side"?: "left" | "right";
};

export function FabricPatch({
  children,
  className = "",
  as = "div",
  href,
  onClick,
  style,
  "aria-label": ariaLabel,
  "data-stitch-content": stitchContent,
  "data-stitch-id": stitchId,
  "data-side": side,
}: FabricPatchProps) {
  const shared = {
    className: `fabric-patch ${className}`.trim(),
    style,
    "aria-label": ariaLabel,
    ...(stitchContent
      ? {
          "data-stitch-content": "",
          "data-stitch-id": stitchId,
          ...(side ? { "data-side": side } : {}),
        }
      : {}),
  };

  if (as === "a" && href) {
    return (
      <a href={href} {...shared}>
        {children}
      </a>
    );
  }

  if (as === "button") {
    return (
      <button type="button" onClick={onClick} {...shared}>
        {children}
      </button>
    );
  }

  if (as === "article") {
    return <article {...shared}>{children}</article>;
  }

  return <div {...shared}>{children}</div>;
}
