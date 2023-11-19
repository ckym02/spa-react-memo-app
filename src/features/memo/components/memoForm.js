export const MemoForm = ({
  memoId,
  memoContent,
  handleSubmit,
  handleChange,
  handleDelete,
}) => {
  const renderTextarea = () => {
    if (!(handleChange === undefined)) {
      return (
        <textarea
          style={{ display: "block" }}
          name="content"
          value={memoContent}
          rows={4}
          cols={40}
          onChange={handleChange}
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

  return (
    <div style={{ display: "inline-block" }}>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block" }}>
          メモの内容：
          {renderTextarea()}
          <input type="hidden" name="id" value={memoId} />
        </label>
        <button type="submit">保存</button>
        {handleDelete ? (
          <button type="button" onClick={() => handleDelete()}>
            削除
          </button>
        ) : null}
      </form>
    </div>
  );
};
