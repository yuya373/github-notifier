export function findIssueFromNumber(nodes, number) {
  return nodes.find((e) => e.number === number);
}
