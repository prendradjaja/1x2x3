const Puzzle = require('./puzzle');

const initialState = {
  cp: [0, 1, 2, 3],
  ep: [0, 1],
  eo: [0, 0],
};

test('Constructor', () => {
  const p = new Puzzle();
  expect(p.toJSON()).toEqual(initialState);
});

test('.move mutates & .clone.move does not', () => {
  const p = new Puzzle();
  p.move('U2');
  expect(p.toJSON()).toEqual({
    ...initialState,
    cp: [1, 0, 2, 3]
  });
  const q = p.clone().move('U2');
  expect(p.toJSON()).toEqual({
    ...initialState,
    cp: [1, 0, 2, 3]
  });
  expect(q.toJSON()).toEqual(initialState);
});

test('.standardRotation', () => {
  const p = new Puzzle();
  p.move('U2');
  const state = p.toJSON();

  p.standardRotation_();
  expect(p.toJSON().cp[0]).toBe(0); // should move C0 to P0

  p.move('y2');
  expect(p.toJSON()).toEqual(state); // should not have done any moves other than rotations
});

test('.id should not alter puzzle state', () => {
  const p = new Puzzle();
  p.move('U2');
  const state = p.toJSON();

  p.id_();

  expect(p.toJSON()).toEqual(state);
});
