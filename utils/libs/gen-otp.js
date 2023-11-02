/**
 * Generate a random numbers, which can be used as OTPs for verification purposes
 * @param tokenLength - Length of token to be generated
 * @returns {string} - Token generated
 */
const generateToken = (tokenLength = 6) => {
  const digits = [...Array(10).keys()];
  let randomToken = "";
  for (let i = 0; i < tokenLength; i += 1) {
    const randNumber = Math.floor(Math.random() * Math.floor(10));
    randomToken += digits[randNumber].toString();
  }

  return randomToken;
};

module.exports.generateToken = generateToken;
