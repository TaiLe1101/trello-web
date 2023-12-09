import {
  MouseSensor as DndKitMouseSensor,
  TouchSensor as DndKitTouchSensor,
} from "@dnd-kit/core";

// Chặn DnD event propagation nếu element có thuộc tính "data-no-dnd"
const handler = ({ nativeEvent: e }) => {
  let cur = e.target;

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false;
    }
    cur = cur.parentElement;
  }

  return true;
};

export class MouseSensor extends DndKitMouseSensor {
  static activators = [{ eventName: "onMouseDown", handler }];
}

export class TouchSensor extends DndKitTouchSensor {
  static activators = [{ eventName: "onTouchStart", handler }];
}
