const statusCheck = (inputStatus) => {
  const allowedStatus = ["ignored", "interested"];

  return allowedStatus.includes(inputStatus);
};

module.exports = statusCheck;
