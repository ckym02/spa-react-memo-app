import { useEffect, useState } from "react";
import { MemoForm } from "./components/memoForm";
import {
  initMemo,
  getAllMemos,
  editMemo,
  createMemo,
  deleteMemo,
} from "../memo/functions/memoOperations";

export const Memo = () => {
  const [memos, setMemos] = useState([]);
  const [memoId, setMemoId] = useState(undefined);
  const [memoContent, setMemoContent] = useState("");
  const [showEditMemoForm, setShowEditMemoForm] = useState(false);
  const [showCreateMemoForm, setShowCreateMemoForm] = useState(false);

  // 初期値の設定
  useEffect(() => {
    initMemo();
  }, []);

  useEffect(() => {
    setMemos(getAllMemos());
  }, [showEditMemoForm]);

  useEffect(() => {
    setMemos(getAllMemos());
  }, [showCreateMemoForm]);

  const handleAddLinkClick = (e) => {
    e.preventDefault();
    setShowEditMemoForm(false);
    setShowCreateMemoForm(true);
  };

  const handleNewMemoSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    createMemo(memos, formJson.content);
    setShowCreateMemoForm(false);
  };

  const handleMemoClick = (e) => {
    e.preventDefault();

    const memoId = Number(e.currentTarget.id);
    const targetMemo = memos.find((m) => m.id === memoId);
    setShowEditMemoForm(true);
    setShowCreateMemoForm(false);
    setMemoContent(targetMemo.content);
    setMemoId(targetMemo.id);
  };

  const handleMemoContentChange = (e) => {
    setMemoContent(e.target.value);
  };

  const handleDelete = (id) => {
    deleteMemo(memos, id);
    setShowEditMemoForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    editMemo(memos, Number(formJson.id), formJson.content);
    setShowEditMemoForm(false);
  };

  const renderMemoList = () => {
    if (memos.length === 0) return null;
    return (
      <ol style={{ paddingLeft: 40 }}>
        {memos.map((memo) => {
          return (
            <li style={{ listStyle: "none" }}>
              <a href="/#" id={memo.id} key={memo.id} onClick={handleMemoClick}>
                {memo.content.split(/\n/)[0]}
              </a>
            </li>
          );
        })}
      </ol>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "inline-block", margin: 10 }}>
          {renderMemoList()}
          <div style={{ paddingLeft: 40 }}>
            <a href="/#" onClick={handleAddLinkClick}>
              +
            </a>
          </div>
        </div>
        {showCreateMemoForm ? (
          <MemoForm
            memoId={memoId}
            memoContent={memoContent}
            onSubmit={handleNewMemoSubmit}
          />
        ) : null}
        {showEditMemoForm ? (
          <MemoForm
            memoId={memoId}
            memoContent={memoContent}
            onMemoContentChange={handleMemoContentChange}
            onSubmit={handleSubmit}
            onDelete={() => handleDelete(memoId)}
          />
        ) : null}
      </header>
    </div>
  );
};
