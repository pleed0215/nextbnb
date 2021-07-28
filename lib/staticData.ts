export const monthList = Array.from(new Array(12)).map((_, index) =>
  String(index + 1)
);

export const dayList = Array.from(new Array(31)).map((_, index) =>
  String(index + 1)
);
export const yearList = Array.from(new Array(121)).map((_, index) =>
  String(2020 - index)
);
