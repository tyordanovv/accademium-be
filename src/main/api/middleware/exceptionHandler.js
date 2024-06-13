import { StatusCodes } from 'http-status-codes';

function handleErrors(err, req, res, next) {
  console.error(`Request ${req.id} failed`, err);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    id: req.id,
    message: "Unknown error occurred.",
  });
}

export default handleErrors;