const statusCheck = (inputStatus) => {
  console.log(inputStatus);
  const allowedStatus = ["ignored", "interested"];

  return allowedStatus.includes(inputStatus);
};

module.exports = statusCheck;
