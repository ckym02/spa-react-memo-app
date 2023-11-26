import { useAuthContext } from '../../../contexts/authContext';
import './memoForm.css';

export const MemoForm = ({
  memoId,
  memoContent,
  onMemoContentChange,
  onSubmit,
  onDelete,
}) => {
  const { isLoggedIn } = useAuthContext();

  const renderOperationButton = () => {
    if (isLoggedIn) {
      return (
        <>
          <button className="form-button" type="submit">
            保存
          </button>
          <button type="button" onClick={() => onDelete()}>
            削除
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <form onSubmit={onSubmit}>
      <label className="label">
        メモの内容：
        <textarea
          className="textarea"
          name="content"
          value={memoContent}
          onChange={onMemoContentChange}
        />
        <input type="hidden" name="id" value={memoId} />
      </label>
      {renderOperationButton()}
    </form>
  );
};
