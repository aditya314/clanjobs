// https://github.com/obengwilliam/pipeawait
const pipe =
  (...fns) =>
  param =>
    fns.reduce(async (result, next) => next(await result), param);

export default pipe;
