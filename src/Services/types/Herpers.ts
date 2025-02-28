export const getRowClassName = (_: unknown, index: number) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };
  