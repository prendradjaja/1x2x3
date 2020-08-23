// _prefix = private
// suffix_ = extensions beyond what cubejs has

class Puzzle {
  constructor() {
    // Not necessarily compatible with cubejs
    this._cp = [0, 1, 2, 3];
    // No CO
    this._ep = [0, 1];
    this._eo = [0, 0];

    // Solved state is pictured as:
    // - F = White
    // - R = Red
    // - D = Green

    // CP is defined as:
    // - 0 = Blue-Orange
    // - 1 = Blue-Red
    // - 2 = Green-Orange
    // - 3 = Green-Red

    // EP is defined as:
    // - 0 = Orange
    // - 1 = Red

    // EO is defined as:
    // - Orange: WhiteF in P0, YellowF in P1
    // - Red: WhiteF in P1, YellowF in P0

    // All possible CP/EO/EO combinations for this puzzle are solvable.
  }

  _move(m) {
    if (m === 'U2') {
      this._cp = permute(this._cp, [1, 0, 2, 3]);
    } else if (m === 'D2') {
      this._cp = permute(this._cp, [0, 1, 3, 2]);
    } else if (m === 'L2') {
      this._cp = permute(this._cp, [2, 1, 0, 3]);
      this._eo[0] = +!this._eo[0];
    } else if (m === 'R2') {
      this._cp = permute(this._cp, [0, 3, 2, 1]);
      this._eo[1] = +!this._eo[1];
    } else if (m === 'E2') {
      this._ep = permute(this._ep, [1, 0]);
    } else {
      // TODO Does cubejs throw errors?
      throw new Error("Invalid move: " + m);
    }
  }

  move(alg) {
    alg.split(' ').forEach(m => this._move(m));
  }

  display_() {
    throw new Error("Not implemented yet"); // TODO
    // Only need to show three sides
  }

  isSolved() {
    throw new Error("Not implemented yet"); // TODO
    // Need to handle the "fresh" state as well as each of x2, y2, z2 (and that's it)
  }
}

function permute(arr, indices) {
  return indices.map(i => arr[i]);
}