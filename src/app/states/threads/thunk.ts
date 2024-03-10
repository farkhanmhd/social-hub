import { AppDispatch } from "@/app/states/index";
import {
  getAllThreads,
  getThreadOwner,
  createThread,
  likeThread,
  dislikeThread,
  neutralizeThreadLike,
  createComment,
  likeComment,
  neutralizeCommentLike,
  dislikeComment,
} from "@/app/api/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import {
  ThreadInterface,
  setThreads,
  addNewThread,
  updateLikeThread,
  updateDislikeThread,
  updateNeutralizeThreadLike,
  updateThreadComments,
  updateCommentLike,
  updateCommentDisLike,
  updateNeutralizeCommentLike,
} from "./slice";

function asyncSetThread() {
  return async (dispatch: AppDispatch) => {
    try {
      const threads = await getAllThreads();
      const threadsWithOwnersPromises: Promise<ThreadInterface>[] = threads.map(
        async (thread: ThreadInterface) => {
          const owner = await getThreadOwner(thread.id);
          return { ...thread, ...owner };
        },
      );
      const threadsWithOwners: ThreadInterface[] = await Promise.all(
        threadsWithOwnersPromises,
      );
      dispatch(setThreads(threadsWithOwners));
    } catch {
      dispatch(setThreads([]));
    }
  };
}

function asyncAddThread(newThread: ThreadInterface) {
  return async (dispatch: AppDispatch) => {
    const { title, body, category } = newThread;
    dispatch(showLoading());
    dispatch(addNewThread(newThread));
    try {
      await createThread({ title, body, category });
    } catch {
      dispatch(asyncSetThread());
    }
    dispatch(asyncSetThread());
    dispatch(hideLoading());
  };
}

function asyncLikeThread({
  threadId,
  userId,
}: {
  threadId: string;
  userId: string;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    dispatch(updateLikeThread({ threadId, userId }));
    try {
      await likeThread({ threadId });
    } catch {
      dispatch(asyncSetThread());
    }
    dispatch(hideLoading());
  };
}
function asyncDisLikeThread({
  threadId,
  userId,
}: {
  threadId: string;
  userId: string;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    dispatch(updateDislikeThread({ threadId, userId }));
    try {
      await dislikeThread({ threadId });
    } catch {
      dispatch(asyncSetThread());
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeThreadLike({
  threadId,
  userId,
}: {
  threadId: string;
  userId: string;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    dispatch(updateNeutralizeThreadLike({ threadId, userId }));
    try {
      await neutralizeThreadLike({ threadId });
    } catch {
      dispatch(asyncSetThread());
    }
    dispatch(hideLoading());
  };
}

function asyncAddComment(id: string, comment: string, authUser: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    dispatch(updateThreadComments({ id, comment, authUser }));
    try {
      await createComment({ content: comment, threadId: id });
    } catch {
      dispatch(asyncSetThread());
    }
    dispatch(hideLoading());
  };
}

function asyncLikeComment(threadId: string, commentId: string, userId: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    dispatch(updateCommentLike({ threadId, commentId, userId }));
    try {
      await likeComment({ threadId, commentId });
    } catch {
      dispatch(asyncSetThread());
    }
    dispatch(hideLoading());
  };
}

function asyncDisLikeComment(
  threadId: string,
  commentId: string,
  userId: string,
) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    dispatch(updateCommentDisLike({ threadId, commentId, userId }));
    try {
      await dislikeComment({ threadId, commentId });
    } catch {
      dispatch(asyncSetThread());
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeCommentLike(
  threadId: string,
  commentId: string,
  userId: string,
) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    dispatch(updateNeutralizeCommentLike({ threadId, commentId, userId }));
    try {
      await neutralizeCommentLike({ threadId, commentId });
    } catch {
      dispatch(asyncSetThread());
    }
    dispatch(hideLoading());
  };
}

export {
  asyncSetThread,
  asyncAddThread,
  asyncLikeThread,
  asyncDisLikeThread,
  asyncNeutralizeThreadLike,
  asyncAddComment,
  asyncLikeComment,
  asyncDisLikeComment,
  asyncNeutralizeCommentLike,
};
