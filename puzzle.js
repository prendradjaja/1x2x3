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
      this._cp = state.cp;
      this._ep = state.ep;
      this._eo = state.eo;
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
    } else {
      // TODO Does cubejs throw errors?
      throw new Error("Invalid move: " + m);
    }
  }

  toJSON() {
    return {
      cp: this._cp,
      ep: this._ep,
      eo: this._eo,
    };
  }

  move(alg) {
    alg.split(' ').forEach(m => this._move(m));
  }

  clone() {
    return new Cube(this.toJSON());
  }

  display_() {
    throw new Error("Not implemented yet"); // TODO
    // Only need to show three sides
  }

  isSolved() {
    throw new Error("Not implemented yet"); // TODO
    // Rotate so C0 is in P0, check against initial state, then unrotate
  }
}

function permute(arr, indices) {
  return indices.map(i => arr[i]);
}
