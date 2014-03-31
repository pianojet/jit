// these are labels for the days of the week
var cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// these are human-readable month name labels, in order
var cal_months_labels = ['January', 'February', 'March', 'April',
                     'May', 'June', 'July', 'August', 'September',
                     'October', 'November', 'December'];

// these are the days of the week for each month, in order
var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// this is the current date
var cal_current_date = new Date();

function Calendar(month, year) {
  this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
  this.year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
  this.html = '';
}

Calendar.prototype.generateHTML = function(){

  // get first day of month
  var firstDay = new Date(this.year, this.month, 1);
  var startingDay = firstDay.getDay();
  
  // find number of days in month
  var monthLength = cal_days_in_month[this.month];
  
  // compensate for leap year
  if (this.month == 1) { // February only!
    if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
      monthLength = 29;
    }
  }
  
  // do the header
  var monthName = cal_months_labels[this.month]
  var html = '<table class="calendar-table">';
  // html += '<tr><th colspan="7">';
  // html +=  monthName + "&nbsp;" + this.year;
  // html += '</th></tr>';
  html += '<tr class="calendar-header">';
  for(var i = 0; i <= 6; i++ ){
    html += '<td class="calendar-header-day">';
    html += cal_days_labels[i];
    html += '</td>';
  }
  html += '</tr><tr>';

  // fill in the days
  var day = 1;
  var label = "";
  // this loop is for is weeks (rows)
  for (var i = 0; i < 9; i++) {
    // this loop is for weekdays (cells)
    for (var j = 0; j <= 6; j++) { 
      label = 'label_'+(this.month+1)+'_'+day;
      html += '<td class="calendar-day">';
      if (day <= monthLength && (i > 0 || j >= startingDay)) {
        //html += '<div id='+label+' ng-bind-html="'+label+'_content"></div>';
        //html += '<div id='+label+'></div>';
        html += day;
        day++;
      }
      html += '</td>';
    }
    // stop making rows if we've run out of days
    if (day > monthLength) {
      break;
    } else {
      html += '</tr><tr>';
    }
  }
  html += '</tr></table>';

  this.html = html;
}

Calendar.prototype.getMonthData = function(){

  // get first day of month
  var firstDay = new Date(this.year, this.month, 1);
  var startingDay = firstDay.getDay();
  
  // find number of days in month
  var monthLength = cal_days_in_month[this.month];
  
  // compensate for leap year
  if (this.month == 1) { // February only!
    if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
      monthLength = 29;
    }
  }
  
  // do the header
  var monthName = cal_months_labels[this.month]

  var calendar_array_head = new Array(7);
  for(var i=0; i<7; i++){
    calendar_array_head[i] = cal_days_labels[i];
  }
  var calendar_array = new Array(9);

  // fill in the days
  var day = 1;
  var label = "";
  // this loop is for is weeks (rows)
  for (var i = 0; i < 9; i++) {
    // this loop is for weekdays (cells)
    calendar_array[i] = new Array(7);
    for (var j = 0; j <= 6; j++) { 
      label = 'label_'+this.year+'_'+(this.month+1)+'_'+day;
      if (day <= monthLength && (i > 0 || j >= startingDay)) {
        calendar_array[i][j] = label;
        day++;
      }
      else calendar_array[i][j] = "blank";
    }
    // stop making rows if we've run out of days
    if (day > monthLength) {
      break;
    }
  }
  return {'month_name': monthName, 'month_data_head': calendar_array_head, 'month_data': calendar_array};
}

Calendar.prototype.getHTML = function() {
  return this.html;
}

Calendar.prototype.getMonthNumber = function() {
  return (this.month+1);
}

Calendar.prototype.getMonthName = function() {
  return cal_months_labels[this.month];
}

Calendar.prototype.getDayNumber = function() {
  return cal_current_date.getDate();
}

Calendar.prototype.getHTML = function() {
  return this.html;
}

