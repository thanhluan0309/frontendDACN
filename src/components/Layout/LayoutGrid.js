import RGL, { WidthProvider } from "react-grid-layout";
import "./style.css";

import { useEffect, useState } from "react";
const ReactGridLayout = WidthProvider(RGL);
export const Layoutgrid = () => {
  // {lg: layout1, md: layout2, ...}
  const [collum, setcollum] = useState(1);
  const [rows, setrows] = useState(200);
  const [layout1, setlayout1] = useState({
    layout: [],
  });
  const defaultProps = {
    className: "layout",
    rowHeight: 30,
    onLayoutChange: function () {},
  };
  const onLayoutChange = (layout) => {
    setlayout1({ layout });
  };

  const layoutvc = [
    { i: "a", x: 0, y: 0, w: 3, h: 1 },
    { i: "b", x: 1, y: 2, w: 3, h: 1 },
    { i: "c", x: 4, y: 0, w: 3, h: 1 },
  ];

  const onDrop = (layout1, layoutItem, _event) => {
    alert(
      `Dropped element props:\n${JSON.stringify(
        layoutItem,
        ["x", "y", "w", "h"],
        2
      )}`
    );
  };

  useEffect(() => {
    console.log("layout", layout1);
    console.log(collum);
  });

  return (
    <>
      <div>
        <div
          className="droppable-element"
          draggable={true}
          unselectable="on"
          onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
        >
          Droppable Element (Drag me!)
        </div>
        <button
          onClick={() => {
            setcollum(collum + 1);
            setrows(rows + 200);
          }}
        >
          Add collum
        </button>
      </div>
      <div>
        <ReactGridLayout
          {...defaultProps}
          className="layout"
          layout={layout1.layout}
          cols={collum}
          rowHeight={200}
          onDrop={onDrop}
          isDroppable={true}
          isBounded={true}
          onLayoutChange={onLayoutChange}
        >
          {layoutvc.map((item) => (
            <div className="CssforItem_layout" key={item.i}>
              <span className="text">{item.i}</span>
            </div>
          ))}
        </ReactGridLayout>
      </div>
    </>
  );
};
