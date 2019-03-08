//only things specific to this menu should be included here
//things that are shared between multiple menus, or that are command specific should be
//defined in the commands/index.js file

import viewSubmenu from "./viewSubmenu";
export const copyOptionsMenu = {
  text: "Copy Options",
  submenu: [
    { cmd: "toggleCopyFeatures", shouldDismissPopover: false },
    { cmd: "toggleCopyPartialFeatures", shouldDismissPopover: false },
    { cmd: "toggleCopyParts", shouldDismissPopover: false },
    { cmd: "toggleCopyPartialParts", shouldDismissPopover: false }
  ]
};
export const createNewAnnotationMenu = {
  text: "Create",
  cmd: "createMenuHolder",
  submenu: ["newFeature", "newPart", "newTranslation", "newPrimer"]
};
export default [
  {
    text: "File",
    "data-test": "file",
    submenu: [
      {
        cmd: "newSequence",
        "data-test": "newSequence"
      },
      "renameSequence",
      "saveSequence",
      "deleteSequence",
      "duplicateSequence",
      "--",
      { cmd: "toggleReadOnlyMode", shouldDismissPopover: false },
      "--",
      "importSequence",
      {
        text: "Export Sequence",
        submenu: [
          { cmd: "exportSequenceAsGenbank" },
          { cmd: "exportSequenceAsFasta" },
          { cmd: "exportSequenceAsTeselagenJson" }
        ]
      },
      "--",
      {
        text: "Print",
        cmd: "print"
        // submenu: [{ cmd: "printCircularView" }, { cmd: "printLinearView" }]
      },
      { cmd: "viewRevisionHistory", text: "Revision History" },
      { cmd: "viewProperties", text: "Properties", icon: "properties" }
    ]
  },
  {
    text: "Edit",
    submenu: [
      createNewAnnotationMenu,
      "--",
      "cut",
      "copy",
      copyOptionsMenu,
      "paste",
      "--",
      "undo",
      "redo",
      "--",
      "find",
      "goTo",
      "--",
      "select",
      "selectAll",
      "selectInverse",
      "--",
      "complementSelection",
      "complementEntireSequence",
      "reverseComplementSelection",
      "reverseComplementEntireSequence",
      "rotateToCaretPosition"
    ]
  },
  {
    text: "View",
    submenu: viewSubmenu
  },
  {
    text: "Tools",
    cmd: "toolsMenu",
    submenu: ["restrictionEnzymesManager", "simulateDigestion"]
  }
];
