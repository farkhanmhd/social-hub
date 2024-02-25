import React from "react";

export default function DropdownItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return <li>{children}</li>;
}
