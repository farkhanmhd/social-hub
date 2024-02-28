import { AppDispatch } from "@/app/states/index";
import {
  getAllThreads,
  getThreadOwner,
  createThread,
  likeThread,
} from "@/app/api/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import {
  ThreadInterface,
  setThreads,
  addNewThread,
  updateLikeThread,
  updateDislikeThread,
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
    } catch (error) {
      alert(error);
    }
  };
}

function asyncAddThread(
  newThread: ThreadInterface,
  { title, body, category }: { title: string; body: string; category: string },
) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    dispatch(addNewThread(newThread));
    try {
      await createThread({ title, body, category });
    } catch (error) {
      dispatch(asyncSetThread());
      alert(error);
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
    } catch (error) {
      dispatch(asyncSetThread());
      alert(error);
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
      await likeThread({ threadId });
    } catch (error) {
      dispatch(asyncSetThread());
      alert(error);
    }
    dispatch(hideLoading());
  };
}

export { asyncSetThread, asyncAddThread, asyncLikeThread, asyncDisLikeThread };
