import { AppDispatch } from "../states";
import { setDropDownMode } from "../states/dropDownMode/slice";

const backToMainMenu = (dispatch: AppDispatch) => {
  dispatch(setDropDownMode("main"));
};

export default { backToMainMenu };
