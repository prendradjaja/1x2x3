const Puzzle = require('./puzzle');

const solutions = {};
const legalMoves = ['U2', 'D2', 'E2', 'L2', 'R2'];

function bfs(root) {
  const q = [];
  solutions[root.id_()] = '';
  q.push({ puzzle: root, path: [] })
  while (q.length
    // && Object.keys(solutions) < 43
  ) {
    let path;
    ({ puzzle, path } = q.shift());
    console.log(puzzle.id_());
    for (let neighbor of neighbors(puzzle)) {
      if (!solutions[neighbor.node.id_()]) {
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
console.log(JSON.stringify(solutions, null, 2));
