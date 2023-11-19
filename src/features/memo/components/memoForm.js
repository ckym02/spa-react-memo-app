export const MemoForm = ({
  memoId,
  memoContent,
  onMemoContentChange,
  onSubmit,
  onDelete,
}) => {
  const renderTextarea = () => {
    if (!(onMemoContentChange === undefined)) {
      return (
        <textarea
          style={{ display: "block" }}
          name="content"
          value={memoContent}
          rows={4}
          cols={40}
          onChange={onMemoContentChange}
        />
      );
    }

    return (
      <textarea
        style={{ display: "block" }}
        name="content"
        rows={4}
        cols={40}
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
    <div style={{ display: "inline-block" }}>
      <form onSubmit={onSubmit}>
        <label style={{ display: "block" }}>
          メモの内容：
          {renderTextarea()}
          <input type="hidden" name="id" value={memoId} />
        </label>
        <button type="submit">保存</button>
        {renderDeleteButton()}
      </form>
    </div>
  );
};
