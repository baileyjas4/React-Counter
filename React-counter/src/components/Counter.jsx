import { useEffect, useState } from "react";

function Counter() {
  // Core state
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState("");

  /* -----------------------------------
     Update history when count changes
  ----------------------------------- */
  useEffect(() => {
    setHistory((prevHistory) => [...prevHistory, count]);
  }, [count]);

  /* -----------------------------------
     Auto-save count to localStorage
     Simulates async save + cleanup
  ----------------------------------- */
  useEffect(() => {
    setStatus("Saving...");

    const timeoutId = setTimeout(() => {
      localStorage.setItem("count", JSON.stringify(count));
      setStatus("Changes saved.");
    }, 500);

    // Cleanup if count changes before save completes
    return () => {
      clearTimeout(timeoutId);
    };
  }, [count]);

  /* -----------------------------------
     Keyboard event listeners
  ----------------------------------- */
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "ArrowUp") {
        setCount((prev) => prev + step);
      }
      if (event.key === "ArrowDown") {
        setCount((prev) => prev - step);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [step]);

  /* -----------------------------------
     Button handlers
  ----------------------------------- */
  const increment = () => {
    setCount((prev) => prev + step);
  };

  const decrement = () => {
    setCount((prev) => prev - step);
  };

  const reset = () => {
    setCount(0);
    setHistory([]);
    localStorage.removeItem("count");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Advanced Counter</h2>

      <h3>Current Count: {count}</h3>

      <button onClick={decrement}>Decrement</button>
      <button onClick={increment} style={{ marginLeft: "10px" }}>
        Increment
      </button>
      <button onClick={reset} style={{ marginLeft: "10px" }}>
        Reset
      </button>

      <div style={{ marginTop: "15px" }}>
        <label>
          Step Value:{" "}
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          />
        </label>
      </div>

      <p>{status}</p>

      <h4>Count History:</h4>
      <ul>
        {history.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>

      <p>
        Use <strong>ArrowUp</strong> to increment and{" "}
        <strong>ArrowDown</strong> to decrement.
      </p>
    </div>
  );
}

export default Counter;
