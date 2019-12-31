/**
 * Is bill still left to pay this cycle?
 *
 * @param {Date} currentDate The current date 
 * @param {number} cycleEndDay The day of the month the credit card payment cycle ends for the month 
 * @param {number} billDueDay The day of the month this bill is due
 * @param {Date} oneTimePaymentDate If this is provided, then this bill will only be counted in the month and year when this payment is due
 * @returns {boolean} Wether or not this bill is still left to pay in this cycle
 * @customfunction
 */
function IsLeftToPayInCycle(currentDate, cycleEndDay, billDueDay, oneTimePaymentDate) {
  // We need to take into account that if the billDueDay <= cycleEndDay, then that bill still needs to get counted this month since the cycle hasn't finished yet
  if ( (currentDate.getDate() > cycleEndDay && (currentDate.getDate() <= billDueDay || billDueDay <= cycleEndDay)) ||
       (currentDate.getDate() <= cycleEndDay && currentDate.getDate() <= billDueDay && billDueDay <= cycleEndDay)) {
    if (!oneTimePaymentDate) {
      return true;
    } else {
      //If our bill due day is before the end of our cycle, then we need to check that the oneTimePaymentDate matches the next month since it's checking the start of the next month
      if (billDueDay <= cycleEndDay) {
        var nextMonthDate = AddDays(currentDate, 31);//numDaysThisMonth;
        return oneTimePaymentDate.getMonth() == nextMonthDate.getMonth() && oneTimePaymentDate.getFullYear() == nextMonthDate.getFullYear();
      } else {
        return oneTimePaymentDate.getMonth() == currentDate.getMonth() && oneTimePaymentDate.getFullYear() == currentDate.getFullYear();
      }
    }
  } else {
    return false;
  }
}

/**
 * Add days to an existing Date
 * 
 * @param {Date} date The date 
 * @param {number} days The number of days to add to the date
 */
function AddDays(date, days) {
  var newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}