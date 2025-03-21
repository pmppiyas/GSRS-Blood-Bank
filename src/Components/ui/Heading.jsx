import React from "react";

function Heading({ title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2  p-8 border-2 border-dotted ">
      <h3 className="text-5xl font-semibold">{title}</h3>
      <p>{subtitle}</p>
    </div>
  );
}

export default Heading;
