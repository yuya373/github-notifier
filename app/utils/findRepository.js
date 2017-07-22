export function findRepositoryFromMatch(state, match) {
  return state.repositories.values.
    find((e) => e.nameWithOwner === `${match.params.owner}/${match.params.name}`);
}

export function findRepositoryFromNameWithOwner(values, {name, owner}) {
  return values.find((e) => e.nameWithOwner === `${owner}/${name}`);
}
