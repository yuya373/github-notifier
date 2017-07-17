import React from 'react';

export default function Token({
  token,
  onChange,
}) {
  return (
    <form>
      <div className="form-group">
        <label>Token</label>
        <input
          type="text"
          className="form-control"
          placeholder="Token"
          onChange={(e) => onChange(e.target.value)}
          value={token}
          />
      </div>
    </form>
  );
}
