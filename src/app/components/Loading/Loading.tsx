import React from "react";
import LoadingBar from "react-redux-loading-bar";

function Loading() {
  return (
    <div id="loading">
      <LoadingBar
        className="fixed top-0 z-[99999] h-[5px] bg-blue-500"
        showFastActions
      />
    </div>
  );
}

export default Loading;
