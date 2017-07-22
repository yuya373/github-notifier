import React from 'react';

export default function Avatar({
  avatarUrl, login,
}) {
  return (
    <img
      src={avatarUrl}
      alt={login}
      style={{width: "44px"}}
      />
  );
}
