import { useEffect, useState } from 'react';
import { MemoForm } from './components/memoForm';
import {
  initMemo,
  getAllMemos,
  editMemo,
  createMemo,
  deleteMemo,
} from '../memo/functions/memoOperations';
import './memo.css';

export const Memo = () => {
  const [memos, setMemos] = useState([]);
  const [memoId, setMemoId] = useState(undefined);
  const [memoContent, setMemoContent] = useState('');
  const [showEditMemoForm, setShowEditMemoForm] = useState(false);
  const [showCreateMemoForm, setShowCreateMemoForm] = useState(false);

  useEffect(() => {
    if (getAllMemos() === null) {
      initMemo();
    }
    setMemos(getAllMemos());
  }, []);

  useEffect(() => {
    setMemos(getAllMemos());
  }, [showEditMemoForm]);

  useEffect(() => {
    setMemos(getAllMemos());
  }, [showCreateMemoForm]);

  const handleCreateLinkClick = (e) => {
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

    setShowEditMemoForm(true);
    setShowCreateMemoForm(false);

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
    </div>
  );
};
