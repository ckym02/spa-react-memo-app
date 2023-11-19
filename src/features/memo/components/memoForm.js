import '../memo.css';

export const MemoForm = ({
  memoId,
  memoContent,
  onMemoContentChange,
  onSubmit,
  onDelete,
}) => {
  const renderTextarea = () => {
    if (onMemoContentChange === undefined) {
      return <textarea className="textarea" name="content" />;
    }

    return (
      <textarea
        className="textarea"
        name="content"
        value={memoContent}
        onChange={onMemoContentChange}
      />
    );
  };

  const renderDeleteButton = () => {
    if (onDelete === undefined) return null;

    return (
      <button type="button" onClick={() => onDelete()}>
        削除
      </button>
    );
  };

  return (
    <div className="memo-form">
      <form onSubmit={onSubmit}>
        <label className="label">
          メモの内容：
          {renderTextarea()}
          <input type="hidden" name="id" value={memoId} />
        </label>
        <button className="form-button" type="submit">
          保存
        </button>
        {renderDeleteButton()}
      </form>
    </div>
  );
};
