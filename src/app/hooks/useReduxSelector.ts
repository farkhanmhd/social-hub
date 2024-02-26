import { useAppSelector } from "../states/hooks";

function useReduxSelector() {
  const authUser = useAppSelector((state) => state.authUser);
  const isPreload = useAppSelector((state) => state.isPreload);
  const dropDownMode = useAppSelector((state) => state.dropDownMode);

  return {
    authUser,
    isPreload,
    dropDownMode,
  };
}

export default useReduxSelector;
