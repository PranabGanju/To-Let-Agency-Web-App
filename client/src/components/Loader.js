import React, { useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import { css } from "styled-components";

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const override = css` 
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    `;
  return (
    <div>
      <div className="sweet-loading">
        <GridLoader
          color=" #180976"
          loading={loading}
          cssOverride={override}
          size={90}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
