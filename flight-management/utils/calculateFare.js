function calculateFare(baseFare, seatClass) {
  let multiplier = seatClass === "business" ? 1.5 : 1;
  return baseFare * multiplier;
}
module.exports = { calculateFare };
