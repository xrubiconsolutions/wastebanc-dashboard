import React, { useRef } from "react";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

export const TwakReact = () => {
  const tawkMessengerRef = useRef();

  return (
    <>
      <TawkMessengerReact
        propertyId={process.env.REACT_APP_TAWKTO_PROPERTYID}
        widgetId={process.env.REACT_APP_TAWKTO_WIDGETID}
        ref={tawkMessengerRef}
      />
    </>
  );
};
