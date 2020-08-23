const Puzzle = require('./puzzle');

const solutions = {};
const legalMoves = ['U2', 'D2', 'E2', 'L2', 'R2'];

function bfs(root) {
  const q = [];
  solutions[root.id_()] = '';
  q.push({ puzzle: root, path: [] })
  while (q.length) {
    let path;
    ({ puzzle, path } = q.shift());
    for (let neighbor of neighbors(puzzle)) {
      if (solutions[neighbor.node.id_()] == null) {
        const newPath = [...path, neighbor.move];
        solutions[neighbor.node.id_()] = [...newPath].reverse().join(' ');
        q.push({
          puzzle: neighbor.node,
          path: newPath,
        })
      }
    }
  }
}

function* neighbors(puzzle) {
  for (let move of legalMoves) {
    yield {
      node: puzzle.clone().move(move),
      move,
    };
  }
}

bfs(new Puzzle());
console.log('const cases =', JSON.stringify(solutions, null, 2));
