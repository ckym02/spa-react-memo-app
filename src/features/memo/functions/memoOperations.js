import {
  getLocalStorage,
  setLocalStorage,
} from '../../../functions/localStorage';

const MEMO_LOCAL_STORAGE_KEY = 'memo_key';

export const initMemo = () => {
  setLocalStorage(MEMO_LOCAL_STORAGE_KEY, []);
};

export const getAllMemos = () => {
  return getLocalStorage(MEMO_LOCAL_STORAGE_KEY) || [];
};

export const editMemo = (memos, id, content) => {
  const newMemos = memos.filter((m) => m.id !== id);
  newMemos.push({ id: id, content: content });
  const sortedMemos = newMemos.sort((a, b) => a.id - b.id);

  setLocalStorage(MEMO_LOCAL_STORAGE_KEY, sortedMemos);
};

export const createMemo = (memos, content) => {
  const latestMemo = memos.slice(-1)[0];
  const newMemoId = latestMemo ? latestMemo.id + 1 : 1;
  memos.push({ id: newMemoId, content: content });

  setLocalStorage(MEMO_LOCAL_STORAGE_KEY, memos);
  return newMemoId;
};

export const deleteMemo = (memos, id) => {
  const newMemos = memos.filter((m) => m.id !== id);

  setLocalStorage(MEMO_LOCAL_STORAGE_KEY, newMemos);
};
