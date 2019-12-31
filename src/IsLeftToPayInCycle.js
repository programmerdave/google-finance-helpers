/**
 * Is bill still left to pay this cycle?
 *
 * @param {Date} currentDate The current date 
 * @param {number} cycleEndDay The day of the month the credit card payment cycle ends for the month 
 * @param {number} billDueDay The day of the month this bill is due
 * @returns {boolean} Wether or not this bill is still left to pay in this cycle
 * @customfunction
 */
function IsLeftToPayInCycle(currentDate, cycleEndDay, billDueDay) {
  // We need to take into account that if the billDueDay <= cycleEndDay, then that bill still needs to get counted this month since the cycle hasn't finished yet
  if ( (currentDate.getDate() > cycleEndDay && (currentDate.getDate() <= billDueDay || billDueDay <= cycleEndDay)) ||
       (currentDate.getDate() <= cycleEndDay && currentDate.getDate() <= billDueDay && billDueDay <= cycleEndDay)) {
         return true;
    /*if (oneTimeDate == undefined || oneTimeDate == null) {
      return true;
    }
    
    if (billDueDay < cycleDueDay) {
      var nextMonthDate = currentMonthDate +  numDaysThisMonth;
      return currentMonth == nextMonthDate.getMonth() && currentYear == nextMonthDate.getYear();
    } else {
      return currentMonth == currentMonthDate.getMonth() && currentYear == currentMonthDate.getYear();
    }*/
  } else {
    return false;
  }
}