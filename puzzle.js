// _prefix = private
// suffix_ = extensions beyond what cubejs has

class Puzzle {
  constructor(state) {
    if (!state) {
      this._cp = [0, 1, 2, 3];
      // No CO
      this._ep = [0, 1];
      this._eo = [0, 0];
    } else {
      this._cp = [...state.cp];
      this._ep = [...state.ep];
      this._eo = [...state.eo];
    }

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
    // This means that the slice move 'E2' preserves EO.

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
    } else if (m === 'x2') {
      this.move('R2 L2');
    } else if (m === 'y2') {
      this.move('U2 E2 D2');
    } else if (m === 'z2') {
      this.move('x2 y2');
    } else {
      // TODO Does cubejs throw errors?
      throw new Error("Invalid move: " + m);
    }
  }

  toJSON() {
    return {
      cp: [...this._cp],
      ep: [...this._ep],
      eo: [...this._eo],
    };
  }

  move(alg) {
    alg.split(' ').forEach(m => this._move(m));
    return this;
  }

  clone() {
    return new Puzzle(this.toJSON());
  }

  display_() {
    throw new Error("Not implemented yet"); // TODO
    // Only need to show three sides
  }

  isSolved() {
    throw new Error("Not implemented yet"); // TODO
    // Rotate so C0 is in P0, check against initial state, then unrotate
  }

  static inverse(alg) {
    // Each move is its own inverse, so no need to invert individual moves
    return alg.split(' ').reverse();
  }

  // (In-place) Rotate the puzzle so corner 0 is in position 0.
  standardRotation_() {
    const currentIndex = this._cp.indexOf(0);
    if (currentIndex === 0) {
      return this;
    } else if (currentIndex === 1) {
      return this.move('y2');
    } else if (currentIndex === 2) {
      return this.move('x2');
    } else if (currentIndex === 3) {
      return this.move('z2');
    }
  }

  id_() {
    const puzzle = this.clone().standardRotation_();
    const cp = puzzle._cp.join('');
    const ep = puzzle._ep.join('');
    const eo = puzzle._eo.join('');
    return cp + '.' + ep + '.' + eo;
  }
}

function permute(arr, indices) {
  return indices.map(i => arr[i]);
}

module.exports = Puzzle;
