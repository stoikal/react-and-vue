import React, { useEffect, useState } from "react";
import bouncingLogo from "@/shared/bouncingLogo";
import reactLogo from "@/assets/react.svg";

function Logo () {
  const [position, setPosition] = useState(null)

  useEffect(() => {
    const subscriber = (pos) => {
      setPosition(pos)
    }

    bouncingLogo.subscribe(subscriber)
    bouncingLogo.start()

    return () => {
      bouncingLogo.unsubscribe(subscriber)
      bouncingLogo.stop()
    }
  }, [])

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: -1
        }}
      >
        {position && (
          <div
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              width: position.width,
              height: position.height,
              borderRadius: "50%",
            }}
          >
            <img
              src={reactLogo}
              width="100%"
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Logo;