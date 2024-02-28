import { useAppSelector } from "../states/hooks";

function useReduxSelector() {
  const authUser = useAppSelector((state) => state.authUser);
  const isPreload = useAppSelector((state) => state.isPreload);
  const dropDownMode = useAppSelector((state) => state.dropDownMode);
  const threads = useAppSelector((state) => state.threads);
  const postModal = useAppSelector((state) => state.postModal);

  return {
    authUser,
    isPreload,
    dropDownMode,
    threads,
    postModal,
  };
}

export default useReduxSelector;
