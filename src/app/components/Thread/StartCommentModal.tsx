import React, { useRef, useState, useEffect } from "react";
import useClickOutside from "@/app/hooks/useClickOutside";
import { useAppDispatch } from "@/app/states/hooks";
import { setCommentModal } from "@/app/states/modal/slice";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { ThreadInterface } from "@/app/states/threads/slice";
import Image from "next/image";
import { getTimeDifference } from "@/app/utils/util";
import parse from "html-react-parser";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

export default function StartCommentModal({
  threadItemProps,
}: {
  threadItemProps: ThreadInterface;
}) {
  const { authUser } = useReduxSelector();
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const [commentValue, setCommentValue] = useState("");
  const commentContentEl = document.querySelector(".start-comment-content");

  const onCommentChange = (evt: ContentEditableEvent) => {
    setCommentValue(evt.target.value);
  };

  useEffect(() => {
    if (commentValue === "<br>") {
      if (commentContentEl) {
        commentContentEl.innerHTML = "";
      }
    }
  }, [commentValue]);

  useClickOutside(modalRef, () => {
    dispatch(setCommentModal(false));
  });
  return (
    <div className="thread-comment-modal fixed left-0 top-0 z-[999] flex h-screen w-screen flex-col items-center justify-center bg-black/50">
      <div
        id="comment-modal-cotainer"
        className="comment-modal-container grid max-h-[70vh] max-w-[560px] gap-1 overflow-auto rounded-lg bg-white p-3 text-[15px]"
        ref={modalRef}
      >
        <div className="thread-owner-photo flex items-center">
          <div id="avatar-start-thread" className="w-[36px]">
            <Image
              src={threadItemProps?.avatar}
              alt="profile"
              className="mx-auto w-full rounded-full object-cover"
              width={36}
              height={36}
            />
          </div>
        </div>
        <div className="thread-author ml-4 flex items-center">
          <p className="font-semibold">Nama</p>
        </div>
        <div className="thread-title my-3 ml-0">
          <h1 className="text-xl font-semibold sm:text-2xl">
            {threadItemProps?.title}
          </h1>
        </div>
        <div className="thread-category">
          <button type="button" className="rounded-lg border px-2 py-1 text-xs">
            #{threadItemProps?.category}
          </button>
        </div>
        <div className="thread-posting-time flex items-center">
          <p className="text-[#ababab]">
            {getTimeDifference(threadItemProps?.createdAt)}
          </p>
        </div>
        <div className="thread-body ml-1 py-2">
          <div>{parse(threadItemProps?.body)}</div>
        </div>
        <div className="thread-line mx-auto mt-2 h-full w-[2px] bg-[#ababab]" />
        <div className="thread-commenter-photos mt-4 flex content-center justify-center">
          <div className=" overflow-hidden rounded-full">
            <Image
              src={authUser?.avatar}
              alt="profile"
              className="mx-auto w-full rounded-full object-cover"
              width={36}
              height={36}
            />
          </div>
        </div>
        <div className="start-comment-author ml-1 mt-3 flex items-center">
          <p className="font-semibold">{authUser?.name}</p>
        </div>
        <div className="start-comment-body overflow-none -mt-1 ml-1">
          <ContentEditable
            onChange={onCommentChange}
            html={commentValue}
            data-placeholder={`Reply to ${threadItemProps.ownerName}...`}
            className="start-comment-content overflow-none relative w-full cursor-text resize-none text-wrap font-light empty:before:text-gray-400 empty:before:content-[attr(data-placeholder)] focus:outline-none"
          />
        </div>
        <div className="thread-post-button">
          <button
            type="button"
            className={`h-[36px] w-16 ${commentValue === "" || commentValue === "<br>" ? "cursor-not-allowed bg-[#b1b1b1]" : "cursor-pointer bg-black"}  rounded-full  px-4 py-[6px] font-medium text-white`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
