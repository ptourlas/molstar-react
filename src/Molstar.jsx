import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "molstar/build/viewer/molstar.css";
import { Viewer } from "molstar/build/viewer/molstar";

const Molstar = props => {

  const { pdbId, url, dimensions, options, clearView } = props;
  const viewerElement = useRef(null);
  const viewer = useRef(null);

  useEffect(() => {
    const mandatoryOptions = dimensions ? { layoutIsExpanded: false } : {};
    const viewerOptions = { ...(options || {}), ...mandatoryOptions };
    viewer.current = new Viewer(viewerElement.current, viewerOptions);
    if (pdbId) viewer.current.loadPdb(pdbId);
    if (url) viewer.current.loadStructureFromUrl(url);
  }, [])

  useEffect(() => {
    if (clearView) viewer.current.plugin.state.data.dispose()
    console.log('CHANGEDw:', clearView)
  }, [clearView])

  if (!dimensions) return <div ref={viewerElement} />

  return (
    <div style={{
      position: "relative",
      width: dimensions[0], height: dimensions[1]
    }}>
      <button onClick={() => viewer.current.plugin.state.data.dispose()}>clear</button>
      <div ref={viewerElement} style={{
        position: "absolute",
        width: dimensions[0], height: dimensions[1], left: 0, right: 0
      }} />
    </div>
  );
};

Molstar.propTypes = {
  pdbId: PropTypes.string,
  url: PropTypes.string,
  dimensions: PropTypes.array,
  options: PropTypes.object,
  clearView: PropTypes.bool
};

export default Molstar;