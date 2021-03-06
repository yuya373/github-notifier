// @flow
import React from 'react';

type Props = {
  token: string,
  onChange: (value: string) => void
};

export default function Token({
  token,
  onChange,
}: Props) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className="form-group">
        <label htmlFor="token">Token</label>
        <input
          id="token"
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
