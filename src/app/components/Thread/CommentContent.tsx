import React from "react";

export default function CommentContent({
  placeholder,
  onChange,
  children,
}: {
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="start-comment-content overflow-none relative w-full cursor-text resize-none text-wrap font-light empty:before:text-gray-400 empty:before:content-[attr(data-placeholder)] focus:outline-none"
      contentEditable="true"
      data-placeholder={placeholder}
      onChange={onChange}
    >
      {children}
    </div>
  );
}
