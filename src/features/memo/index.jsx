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
import { useAuthContext } from '../../contexts/authContext';

export const Memo = () => {
  const [memos, setMemos] = useState([]);
  const [memoId, setMemoId] = useState(undefined);
  const [memoContent, setMemoContent] = useState('');
  const [showEditMemoForm, setShowEditMemoForm] = useState(false);
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (getAllMemos().length === 0) {
      initMemo();
    }
    setMemos(getAllMemos());
  }, []);

  const handleCreateLinkClick = () => {
    const newMemoContent = '新規メモ';
    const newMemoId = createMemo(memos, newMemoContent);
    setShowEditMemoForm(true);

    setMemoId(newMemoId);
    setMemoContent(newMemoContent);
  };

  const handleMemoClick = (id, content) => {
    setShowEditMemoForm(true);

    setMemoId(id);
    setMemoContent(content);
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
            <li
              className="memo-content"
              key={memo.id}
              onClick={() => handleMemoClick(memo.id, memo.content)}
            >
              {memo.content.split(/\n/)[0]}
            </li>
          );
        })}
      </ol>
    );
  };

  const renderMemoCreateLink = () => {
    if (isLoggedIn) {
      return (
        <div className="memo-create-link" onClick={handleCreateLinkClick}>
          +
        </div>
      );
    }

    return null;
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
        {renderMemoCreateLink()}
      </div>
      <div className="memo-form">{renderMemoForm()}</div>
    </div>
  );
};
