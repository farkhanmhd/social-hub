import { AppDispatch } from "@/app/states/index";
import { getAllThreads, getThreadOwner } from "@/app/utils/api";
import { ThreadInterface, setThreads } from "./slice";

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
      JSON.stringify(error);
    }
  };
}

export default asyncSetThread;
