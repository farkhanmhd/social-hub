import { setPostModal } from "@/app/states/postModal/slice";
import { AppDispatch } from "@/app/states/index";

export default function openModal() {
  return async (dispatch: AppDispatch) => {
    dispatch(setPostModal(true));
  };
}
