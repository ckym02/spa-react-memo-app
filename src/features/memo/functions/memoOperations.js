import {
  getLocalStorage,
  setLocalStorage,
} from "../../../functions/localStorage";

const MEMO_LOCAL_STORAGE_KEY = "memo_key";

export const initMemo = () => {
  setLocalStorage(MEMO_LOCAL_STORAGE_KEY, []);
};

export const getAllMemos = () => {
  return getLocalStorage(MEMO_LOCAL_STORAGE_KEY);
};

export const editMemo = (memos, id, content) => {
  const filteredMemos = memos.filter((m) => m.id !== id);
  const newMemos = filteredMemos.push({ id: id, content: content });
  const sortedMemos = newMemos.sort((a, b) => a.id - b.id);

  setLocalStorage(MEMO_LOCAL_STORAGE_KEY, sortedMemos);
};

export const createMemo = (memos, content) => {
  const latestMemo = memos.slice(-1)[0];
  const newMemoId = latestMemo ? latestMemo.id + 1 : 1;
  memos.push({ id: newMemoId, content: content });

  setLocalStorage(MEMO_LOCAL_STORAGE_KEY, memos);
};

export const deleteMemo = (memos, id) => {
  const filteredMemos = memos.filter((m) => m.id !== id);

  setLocalStorage(MEMO_LOCAL_STORAGE_KEY, filteredMemos);
};
