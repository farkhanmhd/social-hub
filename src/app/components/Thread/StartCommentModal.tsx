import React, { useRef, useState, useEffect } from "react";
import useClickOutside from "@/app/hooks/useClickOutside";
import { useAppDispatch } from "@/app/states/hooks";
import { setCommentModal } from "@/app/states/modal/slice";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { ThreadInterface } from "@/app/states/threads/slice";
import Image from "next/image";
import { getTimeDifference } from "@/app/utils/util";
import parse from "html-react-parser";
import { asyncAddComment } from "@/app/states/threads/thunk";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useRouter } from "next/navigation";

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
  const { push } = useRouter();

  const onCommentChange = (e: ContentEditableEvent) => {
    setCommentValue(e.target.value);
  };

  useEffect(() => {
    if (commentValue === "<br>") {
      if (commentContentEl) {
        commentContentEl.innerHTML = "";
      }
    }
  }, [commentValue, commentContentEl]);

  useClickOutside(modalRef, () => {
    dispatch(setCommentModal(false));
  });

  const onAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(asyncAddComment(threadItemProps.id, commentValue, authUser));
    dispatch(setCommentModal(false));
    setCommentValue("");
    if (commentContentEl) {
      commentContentEl.innerHTML = "";
    }
    push(`/${threadItemProps.ownerId}/post/${threadItemProps.id}`);
  };

  return (
    <div className="thread-comment-modal fixed left-0 top-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center bg-black/50">
      <div
        id="comment-modal-cotainer"
        className="comment-modal-container grid h-screen w-screen gap-1 rounded-lg bg-white p-3 text-[13px] sm:text-[15px] md:h-auto md:max-w-[620px]"
        ref={modalRef}
      >
        <div className="thread-cancel-button mb-8">
          <button
            type="submit"
            className="text-black md:hidden"
            onClick={() => dispatch(setCommentModal(false))}
          >
            Cancel
          </button>
        </div>
        <h2
          id="new-thread-inside"
          className="absolute left-1/2 block -translate-x-1/2 text-[15px] font-semibold text-black md:hidden"
        >
          New thread
        </h2>
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
          <p className="font-semibold">{threadItemProps?.ownerName}</p>
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
            onClick={(e) => onAddComment(e)}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
