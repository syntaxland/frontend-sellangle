import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const formattedTime = currentTime.toLocaleString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });

  return (
      <div className="d-flex justify-content-center text-center py-2 digital-clock">
        <Button
          variant="outline-transparent"
          size="sm"
          className="rounded"
          disabled
        >
          {/* <i className="fas fa-clock"></i>  */}
          {formattedTime}
        </Button>
      </div>
  );
};

export default Time;
