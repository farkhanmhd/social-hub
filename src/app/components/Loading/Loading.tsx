import React from "react";
import LoadingBar from "react-redux-loading-bar";

function Loading() {
  return (
    <div id="loading">
      <LoadingBar className="z-[999] h-[5px] bg-blue-500" showFastActions />
    </div>
  );
}

export default Loading;
