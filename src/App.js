import './App.css';

import { Timer, useTimer } from "./components/Timer";


function App() {
  const timerHook = useTimer();
  return (
    <div>
      <Timer {...timerHook} />
    </div>
  );
}

export default App;

