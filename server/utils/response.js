function success(res, data = null, status = 200) {
  return res.status(status).json({
    ok: true,
    data
  });
}

function failure(res, message = "ERROR", status = 400) {
  return res.status(status).json({
    ok: false,
    error: message
  });
}

module.exports = {
  success,
  failure
};
