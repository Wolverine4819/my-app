import { useCallback, useEffect, useState, useMemo } from "react";
import { Observable, Subject } from "rxjs";
import { map, buffer, debounceTime, filter, takeUntil } from "rxjs/operators";

export const useTimer = () => {
  const [state, setState] = useState("stop");
  const [time, setTime] = useState(0);

  const stop = useMemo(() => new Subject(), []);
  const click = useMemo(() => new Subject(), []);

  const handleStart = () => {
    setState("start");
  };

  const handleStop = useCallback(() => {
    setTime(0);
    setState("stop");
  }, []);

  const handleReset = useCallback(() => {
    setTime(0);
  }, []);

  const handleWait = useCallback(() => {
    click.next();
    setState("wait");
    click.next();
  }, [click]);

  useEffect(() => {
    const doubleClick = click.pipe(
      buffer(click.pipe(debounceTime(300))),
      map((list) => list.length),
      filter((value) => value >= 2)
    );
    const timer = new Observable((observer) => {
      let count = 0;
      const intervalId = setInterval(() => {
        observer.next((count += 1));
        console.log(count);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    });

    const subscribtion = timer
      .pipe(takeUntil(doubleClick))
      .pipe(takeUntil(stop))
      .subscribe({
        next: () => {
          if (state === "start") {
            setTime((prev) => prev + 1);
          }
        },
      });

    return () => {
      subscribtion.unsubscribe();
    };
  }, [state,click, stop]);

  return {
    start: handleStart,
    stop: handleStop,
    wait: handleWait,
    reset: handleReset,
    time,
  };
};
