import {
  getLocalStorage,
  setLocalStorage,
} from "../../../functions/localStorage";

export const initMemo = () => {
  setLocalStorage("test_key", []);
};

export const getAllMemos = () => {
  return getLocalStorage("test_key");
};

export const editMemo = (memos, id, content) => {
  const filteredMemos = memos.filter((m) => m.id !== id);
  const newMemos = filteredMemos.push({ id: id, content: content });
  const sortedMemos = newMemos.sort((a, b) => a.id - b.id);

  setLocalStorage("test_key", sortedMemos);
};

export const createMemo = (memos, content) => {
  const latestMemo = memos.slice(-1)[0];
  const newMemoId = latestMemo ? latestMemo + 1 : 1;
  memos.push({ id: newMemoId, content: content });

  setLocalStorage("test_key", memos);
};

export const deleteMemo = (memos, id) => {
  const filteredMemos = memos.filter((m) => m.id !== id);

  setLocalStorage("test_key", filteredMemos);
};
