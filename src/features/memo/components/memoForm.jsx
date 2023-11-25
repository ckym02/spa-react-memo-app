import '../memo.css';

export const MemoForm = ({
  memoId,
  memoContent,
  onMemoContentChange,
  onSubmit,
  onDelete,
}) => {
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
      <button className="form-button" type="submit">
        保存
      </button>
      <button type="button" onClick={() => onDelete()}>
        削除
      </button>
    </form>
  );
};
