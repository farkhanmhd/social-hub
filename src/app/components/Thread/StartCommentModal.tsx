import React, { useRef, useState, useEffect } from "react";
import useClickOutside from "@/app/hooks/useClickOutside";
import { useAppDispatch } from "@/app/states/hooks";
import { setCommentModal } from "@/app/states/commentModal/slice";
import useReduxSelector from "@/app/hooks/useReduxSelector";
import { ThreadInterface } from "@/app/states/threads/slice";
import Image from "next/image";
import { getTimeDifference } from "@/app/utils/util";
import parse from "html-react-parser";
import { asyncAddComment, asyncSetThread } from "@/app/states/threads/thunk";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { useRouter } from "next/navigation";
import ImageUploading from "react-images-uploading";
import { IoImageOutline } from "react-icons/io5";

export default function StartCommentModal({
  threadItemProps,
}: {
  threadItemProps: ThreadInterface;
}) {
  const { authUser, language } = useReduxSelector();
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<any[]>([]);
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
    const imagesHtml = images
      .map(
        (image) =>
          `<img src="${image.dataURL}" alt="uploaded image" class="rounded-lg mb-3" />`,
      )
      .join("");
    const updatedCommentValue = `<div><div>${commentValue}</div> <br> ${imagesHtml}</div>`;
    dispatch(
      asyncAddComment(threadItemProps.id, updatedCommentValue, authUser),
    );
    dispatch(asyncSetThread());
    dispatch(setCommentModal(false));
    setCommentValue("");
    if (commentContentEl) {
      commentContentEl.innerHTML = "";
    }
    push(`/${threadItemProps.ownerId}/post/${threadItemProps.id}`);
  };

  const onImageChange = (imageList: any) => {
    setImages(imageList);
  };

  return (
    <div className="thread-comment-modal fixed left-0 top-0 z-[99999] flex h-screen w-screen flex-col items-center justify-center bg-black/50">
      <div
        id="comment-modal-cotainer"
        className="comment-modal-container grid min-h-screen w-screen gap-1 overflow-auto rounded-lg bg-white p-3 text-[13px] dark:border dark:bg-black sm:text-[15px] md:max-h-[500px] md:min-h-[500px] md:max-w-[620px]"
        ref={modalRef}
      >
        <div className="thread-cancel-button mb-8">
          <button
            type="submit"
            className=" md:hidden"
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
        <div className="thread-posting-time flex items-center justify-end ">
          <p className="mr-3 text-[#ababab]">
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
        <div className="start-comment-body overflow-none relative -mt-1 ml-1">
          <ContentEditable
            onChange={onCommentChange}
            html={commentValue}
            data-placeholder={`${language === "en" ? "Reply to " : "Balas ke "} ${threadItemProps.ownerName}...`}
            className="start-comment-content overflow-none relative w-full cursor-text resize-none text-wrap font-light empty:before:text-gray-400 empty:before:content-[attr(data-placeholder)] focus:outline-none"
          />
          <div className=" mt-3 flex items-center gap-x-2">
            {images.map((image) => (
              <div key={image.dataURL}>
                <Image
                  src={image.dataURL}
                  alt="image"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="thread-post-button flex items-center justify-end gap-x-3">
          <div className="image-uploading-section">
            <ImageUploading multiple value={images} onChange={onImageChange}>
              {({ onImageUpload }) => (
                <div>
                  <button
                    onClick={onImageUpload}
                    type="button"
                    className="rounded-full  px-4 py-[6px] text-2xl font-medium text-[#b1b1b1]"
                  >
                    <IoImageOutline />
                    {}
                  </button>
                </div>
              )}
            </ImageUploading>
          </div>
          <button
            type="submit"
            className={`h-[36px] w-16 ${commentValue.length === 0 ? "cursor-not-allowed bg-[#b1b1b1]" : "cursor-pointer bg-black"}  rounded-full  px-4 py-[6px] font-medium text-white dark:border`}
            disabled={commentValue.length === 0}
            onClick={onAddComment}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
