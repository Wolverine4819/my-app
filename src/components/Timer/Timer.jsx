import React from "react";
import PropTypes from "prop-types";

import setTimeFormat from "../../utils/helpers";

export const Timer = ({ time, start, stop, reset, wait }) => (
  <>
    <header>
      <h1>StopWatch</h1>
      <h1>{setTimeFormat(time)}</h1>
    </header>
    <section>
      <div>
        <button type="button" onClick={start}>
          Start
        </button>
        <button type="button" onClick={stop}>
          Stop
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
        <button type="button" onClick={wait}>
          Wait
        </button>
      </div>
    </section>
  </>
);

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  wait: PropTypes.func.isRequired,
};
