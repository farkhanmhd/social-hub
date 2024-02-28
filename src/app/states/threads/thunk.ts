import { AppDispatch } from "@/app/states/index";
import { getAllThreads, getThreadOwner, createThread } from "@/app/api/api";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { ThreadInterface, setThreads, addNewThread } from "./slice";

function asyncSetThread() {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
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
      JSON.stringify(error);
    }
    dispatch(hideLoading());
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
    } catch {
      dispatch(asyncSetThread());
    }
    dispatch(hideLoading());
  };
}

export { asyncSetThread, asyncAddThread };
