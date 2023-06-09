import React, { useState } from "react";
import GridLoader from "react-spinners/GridLoader";

function Loader() {
  let [loading, setLoading] = useState(true);
  return (
    <div style={{ marginTop: "200px" }}>
      <div className="sweet-loading text-center">
        <GridLoader
          color= "darkslategrey"
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
        />
      </div>
    </div>
  );
}

export default Loader;
