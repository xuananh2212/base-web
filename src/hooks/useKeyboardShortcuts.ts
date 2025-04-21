"use client";

import { useEffect } from "react";

// Define types for actions and their key combinations
type Actions = {
  onAdd?: () => void;
  onEdit?: () => void;
  onSave?: () => void;
  onView?: () => void;
  onRecord?: () => void;
  onUnrecord?: () => void;
  onCopyAdd?: () => void;
  onDelete?: () => void;
  onAddRow?: () => void;
  onCopyRow?: () => void;
  onDeleteRow?: () => void;
  onPrint?: () => void;
  onDuplicate?: () => void;
  onClose?: () => void;
  onHelp?: () => void;
  onQuickSearch?: () => void;
  onAdvancedSearch?: () => void;
  onSwitchTab1?: () => void;
  onSwitchTab2?: () => void;
  onSwitchTab3?: () => void;
  onSwitchTab4?: () => void;
  onSwitchTab5?: () => void;
  onSwitchTab6?: () => void;
  onPreview?: () => void;
  onFilter?: () => void;
  onSearch?: () => void;
};

// Define default key combinations for each action
const defaultKeyMap: { [key in keyof Actions]: string } = {
  onAdd: "Ctrl+I",
  onEdit: "Ctrl+E",
  onSave: "Ctrl+S",
  onView: "Ctrl+O",
  onRecord: "Ctrl+R",
  onUnrecord: "Ctrl+U",
  onCopyAdd: "Ctrl+M",
  onDelete: "Ctrl+D",
  onAddRow: "Ctrl+Insert",
  onCopyRow: "Ctrl+C",
  onDeleteRow: "Ctrl+Delete",
  onPrint: "Ctrl+P",
  onDuplicate: "Ctrl+Shift+C",
  onClose: "Escape",
  onHelp: "F1",
  onQuickSearch: "Alt+X",
  onAdvancedSearch: "Alt+Y",
  onSwitchTab1: "Alt+1",
  onSwitchTab2: "Alt+2",
  onSwitchTab3: "Alt+3",
  onSwitchTab4: "Alt+4",
  onSwitchTab5: "Alt+5",
  onSwitchTab6: "Alt+6",
  onPreview: "Ctrl+F7",
  onFilter: "F9",
  onSearch: "Ctrl+F",
};

// Type guard to check if a key is a valid key of Actions
const isValidActionKey = (key: string): key is keyof Actions => key in defaultKeyMap;

const useKeyboardShortcuts = (actions: Actions, dependencies: any[] = []) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { ctrlKey, shiftKey, altKey, key } = event;
      const keyCombination =
        `${ctrlKey ? "Ctrl+" : ""}${shiftKey ? "Shift+" : ""}${altKey ? "Alt+" : ""}${key}`?.toLowerCase();

      for (const actionKey in defaultKeyMap) {
        if (
          isValidActionKey(actionKey) &&
          defaultKeyMap[actionKey]?.toLowerCase() === keyCombination &&
          actions[actionKey]
        ) {
          event.preventDefault();
          event.stopPropagation();
          actions[actionKey]?.();
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [actions, ...dependencies]);
};

export default useKeyboardShortcuts;
