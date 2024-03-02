import { AppDispatch } from "@/app/states/index";
import { setCommentModal } from "./slice";

export default function asyncSetCommentModal(e: React.MouseEvent) {
  e.preventDefault();
  return async (dispatch: AppDispatch) => {
    dispatch(setCommentModal(true));
  };
}
