import { useEffect, useState } from 'react';
import { MemoForm } from './components/MemoForm';
import {
  initMemo,
  getAllMemos,
  editMemo,
  createMemo,
  deleteMemo,
} from './functions/memoOperations';
import './memo.css';

export const Memo = () => {
  const [memos, setMemos] = useState([]);
  const [memoId, setMemoId] = useState(undefined);
  const [memoContent, setMemoContent] = useState('');
  const [showEditMemoForm, setShowEditMemoForm] = useState(false);

  useEffect(() => {
    if (getAllMemos() === null) {
      initMemo();
    }
    setMemos(getAllMemos());
  }, []);

  const handleCreateLinkClick = (e) => {
    e.preventDefault();

    const newMemoContent = '新規メモ';
    const newMemoId = createMemo(memos, newMemoContent);
    setShowEditMemoForm(true);

    setMemoId(newMemoId);
    setMemoContent(newMemoContent);
  };

  const handleMemoClick = (e) => {
    e.preventDefault();

    setShowEditMemoForm(true);

    const memoId = Number(e.currentTarget.id);
    const targetMemo = memos.find((m) => m.id === memoId);
    setMemoId(targetMemo.id);
    setMemoContent(targetMemo.content);
  };

  const handleMemoContentChange = (e) => {
    setMemoContent(e.target.value);
  };

  const handleDelete = (id) => {
    deleteMemo(memos, id);
    setMemos(getAllMemos());
    setShowEditMemoForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    editMemo(memos, Number(formJson.id), formJson.content);

    setMemos(getAllMemos());
    setShowEditMemoForm(false);
  };

  const renderMemoList = () => {
    if (memos.length === 0) return null;

    return (
      <ol>
        {memos.map((memo) => {
          return (
            <li className="memo-content" key={memo.id}>
              <a href="/#" id={memo.id} onClick={handleMemoClick}>
                {memo.content.split(/\n/)[0]}
              </a>
            </li>
          );
        })}
      </ol>
    );
  };

  const renderMemoForm = () => {
    if (showEditMemoForm) {
      return (
        <MemoForm
          memoId={memoId}
          memoContent={memoContent}
          onMemoContentChange={handleMemoContentChange}
          onSubmit={handleSubmit}
          onDelete={() => handleDelete(memoId)}
        />
      );
    }

    return null;
  };

  return (
    <div className="main-content">
      <div className="memo-lists">
        {renderMemoList()}
        <div className="memo-create-link">
          <a href="/#" onClick={handleCreateLinkClick}>
            +
          </a>
        </div>
      </div>
      <div className="memo-form">{renderMemoForm()}</div>
    </div>
  );
};
