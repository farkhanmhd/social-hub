"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useAppDispatch } from "@/app/states/hooks";
import { setPostModal } from "@/app/states/commentModal/slice";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import useClickOutside from "@/app/hooks/useClickOutside";
import useInput from "@/app/hooks/useInput";
import { asyncAddThread } from "@/app/states/threads/thunk";
import { ThreadInterface } from "@/app/states/threads/slice";
import { useRouter, usePathname } from "next/navigation";

export default function StartThreadModal() {
  const { authUser } = useReduxSelector();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const {
    value: title,
    onChange: onTitleChange,
    setValue: setTitle,
  } = useInput("");
  const {
    value: category,
    onChange: onCategoryChange,
    setValue: setCategory,
  } = useInput("");
  const {
    value: body,
    onChange: onBodyChange,
    setValue: setBody,
  } = useInput("");
  const modalRef = useRef<HTMLFormElement>(null);
  const { push } = useRouter();

  useClickOutside(modalRef, () => {
    dispatch(setPostModal(false));
  });

  const submittedThread: ThreadInterface = {
    id: "",
    title,
    body,
    category,
    createdAt: "",
    ownerId: authUser?.id,
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
    ownerName: authUser?.name,
    avatar: authUser?.avatar,
    comments: [],
  };

  const onAddThread = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(asyncAddThread({ ...submittedThread }, { title, category, body }));
    dispatch(setPostModal(false));
    if (pathname === "/" || pathname === "/search") {
      push("/");
    }
    setTitle("");
    setBody("");
    setCategory("");
  };

  return (
    <div
      id="start-thread-modal"
      className="fixed top-0 z-[99999] flex h-screen w-screen flex-col items-center justify-center gap-y-5 bg-black/70"
    >
      <h2
        id="new-thread-outside"
        className="hidden text-sm font-semibold text-white md:block"
      >
        New thread
      </h2>
      <form
        className="start-thread-container grid h-screen w-screen gap-1 rounded-lg bg-white p-3 text-[13px] sm:text-[15px] md:h-auto md:max-w-[620px]"
        ref={modalRef}
        onSubmit={(e) => onAddThread(e)}
      >
        <div className="thread-cancel-button mb-8">
          <button
            type="submit"
            className="text-black md:hidden"
            onClick={() => dispatch(setPostModal(false))}
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
              src={authUser?.avatar}
              alt="profile"
              className="mx-auto w-full rounded-full object-cover"
              width={36}
              height={36}
            />
          </div>
        </div>
        <div className="thread-author ml-2 flex items-center">
          <p className="font-semibold">{authUser?.name}</p>
        </div>
        <div className="thread-title mb-2 ml-2">
          <input
            type="text"
            className="w-full text-xl font-semibold focus:outline-none sm:text-2xl"
            placeholder="Title"
            value={title}
            onChange={onTitleChange}
            required
          />
        </div>
        <div className="thread-category ml-2">
          <input
            type="text"
            className="w-full  py-1 text-sm focus:outline-none"
            placeholder="Category"
            value={category.length > 20 ? category.slice(0, 20) : category}
            onChange={onCategoryChange}
          />
        </div>
        <div className="thread-body ml-2 py-2">
          <textarea
            name="thread-body"
            id="thread-body"
            placeholder="Start a thread..."
            className="flex h-full w-full resize-none focus:outline-none"
            value={body}
            onChange={onBodyChange}
            required
          />
        </div>
        <div className="thread-line mx-auto mt-2 h-full w-[2px] bg-[#ababab]" />
        <div className="thread-commenter-photos mt-2 flex content-center items-center justify-center">
          <div className="w-[18px] overflow-hidden rounded-full">
            <Image
              src={authUser?.avatar}
              alt="profile"
              className="mx-auto w-full rounded-full object-cover "
              width={18}
              height={18}
            />
          </div>
        </div>
        <div className="thread-post-button">
          <button
            type="submit"
            className={`h-[36px] w-16 ${body.length === 0 ? "cursor-not-allowed bg-[#b1b1b1]" : "cursor-pointer bg-black"}  rounded-full  px-4 py-[6px] font-medium text-white`}
            disabled={body.length === 0}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
