import { AppDispatch } from "../states";
import { setDropDownMode } from "../states/dropDownMode/slice";

const backToMainMenu = (dispatch: AppDispatch) => {
  dispatch(setDropDownMode("main"));
};

function getTimeDifference(postTime: string): string {
  const currentTime: Date = new Date();
  const postDate: Date = new Date(postTime);

  const timeDifference: number =
    Math.abs(currentTime.getTime() - postDate.getTime()) / 1000;

  let timePassed: string = "";

  if (timeDifference < 60) {
    timePassed = `${Math.floor(timeDifference)} s`;
  } else if (timeDifference < 3600) {
    const minutes: number = Math.floor(timeDifference / 60);
    timePassed = `${minutes} min`;
  } else if (timeDifference < 86400) {
    const hours: number = Math.floor(timeDifference / 3600);
    timePassed = `${hours} h`;
  } else if (timeDifference < 604800) {
    const days: number = Math.floor(timeDifference / 86400);
    timePassed = `${days} d`;
  } else if (timeDifference < 2629746) {
    const weeks: number = Math.floor(timeDifference / 604800);
    timePassed = `${weeks} w`;
  } else {
    const months: number = Math.floor(timeDifference / 2629746);
    timePassed = `${months} mo`;
  }

  return timePassed;
}

export { backToMainMenu, getTimeDifference };
