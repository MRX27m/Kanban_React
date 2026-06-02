import { importShared } from './__federation_fn_import-h26HtImf.js';
import { j as jsxRuntimeExports } from './jsx-runtime-CyoIsdjr.js';
import { B as Button, a as api, M as Modal, I as Input } from './global-ByARPMR4.js';

const {useState: useState$2} = await importShared('react');
const TaskCard = ({ taskText, onRemove, onEdit, moveLeft, moveRight }) => {
  const [isEditing, setIsEditing] = useState$2(false);
  const [editValue, setEditValue] = useState$2(taskText);
  const handleSave = () => {
    if (editValue.trim()) onEdit(editValue.trim());
    setIsEditing(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "task-card", children: [
    isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        className: "input",
        value: editValue,
        onChange: (e) => setEditValue(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") handleSave();
          if (e.key === "Escape") setIsEditing(false);
        },
        autoFocus: true
      }
    ) : taskText,
    !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "edit-btn", onClick: () => {
      setEditValue(taskText);
      setIsEditing(true);
    }, children: "edit" }),
    moveLeft && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "⬅", className: "left-card-button", onClick: moveLeft }),
    moveRight && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "➡", className: "right-card-button", onClick: moveRight }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "X", className: "rm-btn", onClick: onRemove })
  ] });
};

var LeftRightEnum = /* @__PURE__ */ ((LeftRightEnum2) => {
  LeftRightEnum2["left"] = "left";
  LeftRightEnum2["right"] = "right";
  return LeftRightEnum2;
})(LeftRightEnum || {});
var NavigationEnum = /* @__PURE__ */ ((NavigationEnum2) => {
  NavigationEnum2["root"] = "/";
  NavigationEnum2["login"] = "/login";
  NavigationEnum2["register"] = "/register";
  NavigationEnum2["selectWorkSpace"] = "/SelectWorkpres";
  return NavigationEnum2;
})(NavigationEnum || {});

const {create} = await importShared('zustand');
const fetchTasksForColumns = async (boardId, columns) => {
  return Promise.all(
    columns.map(async (col) => {
      try {
        const res = await api.get(`/boards/${boardId}/columns/${col.id}/tasks`);
        return { ...col, tasks: res.data || [] };
      } catch {
        return { ...col, tasks: [] };
      }
    })
  );
};
const useColumnStore = create((set, get) => ({
  columns: [],
  boardId: null,
  fetchColumns: async (boardId) => {
    const res = await api.get(`/boards/${boardId}/columns`);
    const columns = await fetchTasksForColumns(boardId, res.data || []);
    set({ columns, boardId });
  },
  addColumn: async (name) => {
    if (!name.trim()) return;
    const { boardId } = get();
    const res = await api.post(`/boards/${boardId}/columns`, { name });
    set((s) => ({ columns: [...s.columns, { ...res.data, tasks: [] }] }));
  },
  removeColumn: async (column) => {
    const { boardId } = get();
    await api.delete(`/boards/${boardId}/columns/${column.id}`);
    set((s) => ({ columns: s.columns.filter((c) => c.id !== column.id) }));
  },
  moveColumn: async (colIndex, dir) => {
    const { boardId, columns } = get();
    const res = await api.patch(`/boards/${boardId}/columns/${columns[colIndex].id}/move`, { direction: dir });
    const newColumns = await fetchTasksForColumns(boardId, res.data || []);
    set({ columns: newColumns });
  },
  addTask: async (colIndex, text) => {
    if (!text.trim()) return;
    const { boardId, columns } = get();
    const res = await api.post(`/boards/${boardId}/columns/${columns[colIndex].id}/tasks`, { text });
    set((s) => ({
      columns: s.columns.map(
        (col, i) => i === colIndex ? { ...col, tasks: [...col.tasks || [], res.data] } : col
      )
    }));
  },
  removeTask: async (colIndex, taskId) => {
    const { boardId, columns } = get();
    await api.delete(`/boards/${boardId}/columns/${columns[colIndex].id}/tasks/${taskId}`);
    set((s) => ({
      columns: s.columns.map(
        (col, i) => i === colIndex ? { ...col, tasks: (col.tasks || []).filter((t) => t.id !== taskId) } : col
      )
    }));
  },
  editTask: async (colIndex, taskId, newText) => {
    const { boardId, columns } = get();
    await api.patch(`/boards/${boardId}/columns/${columns[colIndex].id}/tasks/${taskId}`, { text: newText });
    set((s) => ({
      columns: s.columns.map(
        (col, i) => i === colIndex ? { ...col, tasks: (col.tasks || []).map((t) => t.id === taskId ? { ...t, text: newText } : t) } : col
      )
    }));
  },
  moveTask: async (taskId, colIndex, dir) => {
    const { boardId, columns } = get();
    const targetIndex = dir === LeftRightEnum.left ? colIndex - 1 : colIndex + 1;
    if (targetIndex < 0 || targetIndex >= columns.length) return;
    const targetColumn = columns[targetIndex];
    await api.patch(`/boards/${boardId}/columns/${columns[colIndex].id}/tasks/${taskId}/move`, {
      targetColumnId: targetColumn.id
    });
    const task = (columns[colIndex].tasks || []).find((t) => t.id === taskId);
    if (!task) return;
    set((s) => ({
      columns: s.columns.map((col, i) => {
        if (i === colIndex) return { ...col, tasks: (col.tasks || []).filter((t) => t.id !== taskId) };
        if (i === targetIndex) return { ...col, tasks: [...col.tasks || [], { ...task, columnId: targetColumn.id }] };
        return col;
      })
    }));
  }
}));

const ReactExports = await importShared('react');


function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false;
    for (const [key, value] of objA) {
      if (!Object.is(value, objB.get(key))) {
        return false;
      }
    }
    return true;
  }
  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false;
    for (const value of objA) {
      if (!objB.has(value)) {
        return false;
      }
    }
    return true;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (const keyA of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, keyA) || !Object.is(objA[keyA], objB[keyA])) {
      return false;
    }
  }
  return true;
}

const { useRef } = ReactExports;
function useShallow(selector) {
  const prev = useRef();
  return (state) => {
    const next = selector(state);
    return shallow(prev.current, next) ? prev.current : prev.current = next;
  };
}

const {useState: useState$1} = await importShared('react');
const Column = ({ column, colIndex, totalColumns }) => {
  const { addTask, removeTask, editTask, moveTask, moveColumn, removeColumn } = useColumnStore(
    useShallow((s) => ({
      addTask: s.addTask,
      removeTask: s.removeTask,
      editTask: s.editTask,
      moveTask: s.moveTask,
      moveColumn: s.moveColumn,
      removeColumn: s.removeColumn
    }))
  );
  const [value, setValue] = useState$1("");
  const [isOpen, setIsOpen] = useState$1(false);
  const isFirst = colIndex === 0;
  const isLast = colIndex === totalColumns - 1;
  const handleAddTask = () => {
    addTask(colIndex, value);
    setValue("");
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "column", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "column-header", children: [
      column.name,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "column-buttons", children: [
        !isFirst && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "left-column-button", children: "⬅", onClick: () => moveColumn(colIndex, LeftRightEnum.left) }),
        !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "➡", className: "right-column-button", onClick: () => moveColumn(colIndex, LeftRightEnum.right) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { isOpen, onClose: () => setIsOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        placeholder: "Введіть нову задачу",
        value,
        setValue,
        onKeyDown: (e) => {
          if (e.key === "Enter") handleAddTask();
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Add card +", className: "add-card", onClick: () => setIsOpen(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "X", className: "rm-column-btn", onClick: () => removeColumn(column) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tasks", children: (column.tasks || []).map((task) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TaskCard,
      {
        taskText: task.text,
        onEdit: (newText) => editTask(colIndex, task.id, newText),
        onRemove: () => removeTask(colIndex, task.id),
        moveLeft: !isFirst ? () => moveTask(task.id, colIndex, LeftRightEnum.left) : void 0,
        moveRight: !isLast ? () => moveTask(task.id, colIndex, LeftRightEnum.right) : void 0
      },
      task.id
    )) })
  ] });
};

const {useState,useEffect} = await importShared('react');

const {Link,useLocation,useParams} = await importShared('react-router-dom');
const WorkSpace = () => {
  const location = useLocation();
  const { id } = useParams();
  const boardName = location.state?.name || "Моя дошка";
  const { columns, fetchColumns, addColumn } = useColumnStore();
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [memberError, setMemberError] = useState("");
  const [memberSuccess, setMemberSuccess] = useState("");
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  useEffect(() => {
    if (id) fetchColumns(id);
  }, [id]);
  const handleAddMember = async () => {
    if (!memberEmail.trim()) return;
    try {
      await api.post(`/boards/${id}/members`, { email: memberEmail });
      setMemberEmail("");
      setMemberError("");
      setMemberSuccess("Учасника додано!");
      setTimeout(() => {
        setMemberSuccess("");
        setIsMemberOpen(false);
      }, 2e3);
    } catch (e) {
      setMemberSuccess("");
      setMemberError(e?.response?.data?.message || "Користувача не знайдено");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "title", children: boardName }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { isOpen, onClose: () => setIsOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Input,
      {
        placeholder: "Введіть назву колонки",
        value,
        setValue,
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            addColumn(value);
            setValue("");
            setIsOpen(false);
          }
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { isOpen: isMemberOpen, onClose: () => {
      setIsMemberOpen(false);
      setMemberEmail("");
      setMemberError("");
      setMemberSuccess("");
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Email учасника",
          value: memberEmail,
          setValue: (v) => {
            setMemberEmail(v);
            setMemberError("");
            setMemberSuccess("");
          },
          onKeyDown: (e) => {
            if (e.key === "Enter") handleAddMember();
          }
        }
      ),
      memberError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: memberError }),
      memberSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "success-message", children: memberSuccess }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Додати", className: "add-member-btn", onClick: handleAddMember })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Add column +", className: "add-column", onClick: () => setIsOpen(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "+ Учасник", className: "add-member-button", onClick: () => setIsMemberOpen(true) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: NavigationEnum.selectWorkSpace, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "back-btn", type: "button", children: "Boards" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "board", children: columns.map((col, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Column, { column: col, colIndex: index, totalColumns: columns.length }, col.id)) })
  ] });
};

export { WorkSpace, WorkSpace as default };
