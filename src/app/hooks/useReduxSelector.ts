import { useAppSelector } from "../states/hooks";

function useReduxSelector() {
  const authUser = useAppSelector((state) => state.authUser);
  const isPreload = useAppSelector((state) => state.isPreload);
  const dropDownMode = useAppSelector((state) => state.dropDownMode);
  const threads = useAppSelector((state) => state.threads);
  const profile = useAppSelector((state) => state.profile);
  const postModal = useAppSelector((state) => state.modal.postModal);
  const commentModal = useAppSelector((state) => state.modal.commentModal);
  const commentModalState = useAppSelector((state) => state.commentModalState);
  const leaderboard = useAppSelector((state) => state.leaderboard);
  const allUsers = useAppSelector((state) => state.allUsers);
  const language = useAppSelector((state) => state.language);
  const theme = useAppSelector((state) => state.theme);

  return {
    authUser,
    isPreload,
    dropDownMode,
    threads,
    postModal,
    profile,
    commentModal,
    commentModalState,
    leaderboard,
    allUsers,
    language,
    theme,
  };
}

export default useReduxSelector;
