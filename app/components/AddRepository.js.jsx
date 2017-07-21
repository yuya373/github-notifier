// @flow
import React from 'react';
import Icon from './Icon.js.jsx';

type Props = {
  form: {
    owner: string,
    name: string
  },
  success: boolean,
  error: string,
  fetching: boolean,
  onOwnerChange: (value: string) => void,
  onNameChange: (value: string) => void,
  onAdd: () => void,
};

export default function AddRepository({
  form, success, error, fetching,
  onOwnerChange, onNameChange, onAdd,
}: Props) {
  const handleClickAdd = (e) => {
    e.preventDefault();
    onAdd();
  };

  const errorMessage =
        error.length > 1 ? (<p>{error}</p>) : null;
  return (
    <form>
      {errorMessage}
      <div className="form-group">
        <label htmlFor="owner">
          Owner
        </label>
        <input
          id="owner"
          type="text"
          className="form-control"
          placeholder="github"
          onChange={(e) => onOwnerChange(e.target.value)}
          value={form.owner}
          />
      </div>
      <div className="form-group">
        <label htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="form-control"
          placeholder="fetch"
          onChange={(e) => onNameChange(e.target.value)}
          value={form.name}
          />
      </div>
      <div className="form-actions">
        <button
          disabled={fetching}
          type="submit"
          className="btn btn-form btn-primary"
          onClick={(e) => handleClickAdd(e)}
          >
          {fetching ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
}
