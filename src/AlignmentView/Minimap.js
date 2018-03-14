import React from "react";
// import { getRangeLength } from "ve-range-utils/lib";
import Draggable from "react-draggable";
import Axis from "../RowItem/Axis";
// import SelectionLayer from "../RowItem/SelectionLayer";
import getXStartAndWidthFromNonCircularRange from "../RowItem/getXStartAndWidthFromNonCircularRange";

const laneHeight = 20;
export default class Minimap extends React.Component {
  onDrag = (e, { x }) => {
    const { onMinimapScroll, dimensions: { width = 200 } } = this.props;
    const scrollHandle = this.getScrollHandleWidthAndXStart();
    const percent = x / (width - scrollHandle.width);
    onMinimapScroll(percent);
  };

  handleMinimapClick = e => {
    const { onMinimapScroll, dimensions: { width = 200 } } = this.props;
    const scrollHandle = this.getScrollHandleWidthAndXStart();

    const percent =
      this.getXPositionOfClickInMinimap(e) / (width - scrollHandle.width);
    onMinimapScroll(percent);
  };
  getXPositionOfClickInMinimap = e => {
    const leftStart = this.minimap.getBoundingClientRect().left;
    return Math.max(e.clientX - leftStart, 0);
  };

  getCharWidth = () => {
    const { alignmentTracks = [], dimensions: { width = 200 } } = this.props;
    const [template] = alignmentTracks;
    const seqLength = template.alignmentData.sequence.length;
    const charWidth = Math.min(16, width / seqLength);
    return charWidth || 12;
  };
  getScrollHandleWidthAndXStart = () => {
    const {
      numBpsShownInLinearView = 20,
      percentScrolled,
      dimensions
    } = this.props;
    const charWidth = this.getCharWidth();
    const { width } = getXStartAndWidthFromNonCircularRange(
      { start: 0, end: Math.max(numBpsShownInLinearView - 1, 0) },
      charWidth
    );
    const x = percentScrolled * ((dimensions.width || 200) - width);
    return {
      width: Math.min(width, dimensions.width),
      x
    };
  };

  render() {
    const {
      alignmentTracks = [],
      dimensions: { width = 200 },
      style = {}
    } = this.props;
    const [template, ...nonTemplates] = alignmentTracks;
    const seqLength = template.alignmentData.sequence.length;
    const charWidth = this.getCharWidth();
    const scrollHandle = this.getScrollHandleWidthAndXStart();

    return (
      <div
        ref={ref => (this.minimap = ref)}
        className={"alignmentMinimap"}
        style={{ position: "relative", width, ...style }}
        onClick={this.handleMinimapClick}
      >
        <Draggable
          bounds={"parent"}
          zIndex={105}
          position={{ x: scrollHandle.x, y: 0 }}
          // start={{ x: scrollHandle.x, y: 0 }}
          axis={"x"}
          onDrag={this.onDrag}
        >
          <div
            style={{
              height: "100%",
              border: "none",
              // background: '#0099ff',
              opacity: ".3",
              top: "0px",
              position: "absolute",
              zIndex: "10",
              width: scrollHandle.width,
              background: "yellow"
            }}
          />
        </Draggable>

        <svg height={alignmentTracks.length * laneHeight} width={width}>
          {alignmentTracks.map(({ matchHighlightRanges }, i) => {
            //need to get the chunks that can be rendered
            return matchHighlightRanges.map((range, index) => {
              const { xStart, width } = getXStartAndWidthFromNonCircularRange(
                range,
                charWidth
              );
              return (
                <rect
                  key={i + "-" + index}
                  y={laneHeight * i}
                  height={laneHeight - 3}
                  fill={range.isMatch ? "grey" : "red"}
                  {...{ x: xStart, width }}
                />
              );
            });
          })}
        </svg>
        <Axis
          {...{
            row: { start: 0, end: seqLength },
            tickSpacing: Math.floor(seqLength / 10),
            bpsPerRow: seqLength,
            charWidth,
            annotationHeight: 15,
            sequenceLength: seqLength
          }}
        />
      </div>
    );
  }
}