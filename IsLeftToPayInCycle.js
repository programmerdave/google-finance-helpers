/**
 * Is left to pay in cycle
 *
 * @param {int} billDueDay The current bill due day [1..]
 * @param {int} globalBillDueDay The day all the bills are due [1..]
 * @param {int} currentMonth The current month [1-12]
 * @param {Date} billPayMonthYear The date that contains the month and year that the bill gets paid
 * @return Wether or not this bill is still left to pay in this cycle
 * @customfunction
 */
function IsLeftToPayInCycle(billDueDay, globalBillDueDay, currentMonth, billPayMonthYear) {
  Logger.log(((billPayMonthYear.getMonth()+1) % 12)+1);

  if (billDueDay < globalBillDueDay) {
    var billPayNextMonth = ((billPayMonthYear.getMonth()+1) % 12)+1;
    var isMatchingNextMonth = currentMonth == billPayNextMonth;
    Logger.log(isMatchingNextMonth);

    return isMatchingNextMonth;
  }
}

Logger.log(IsLeftToPayInCycle(1, 7, 12, new Date("12/1/2019")));
