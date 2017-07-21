export function findRepositoryFromMatch(state, match) {
  return state.repositories.values.
    find((e) => e.nameWithOwner === `${match.params.owner}/${match.params.name}`);
}
