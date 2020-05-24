import { AsyncStorage } from 'react-native';

export function isEmpty (data) {
    return (data === null ||
    data === undefined ||
    (data.hasOwnProperty('length') && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0))
  }

export async function storeData(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
        // Error saving data
      }
}

export async function retrieveData(key) {
    const value = await AsyncStorage.getItem(key);
    console.log('async value')
    console.log(value)
    if (value !== null) {
        // We have data!!
        return value
    }
    return null
}

export async function removeData(key) {
    try {
        console.log('ready to remvove')
        await AsyncStorage.removeItem(key);
        console.log('removed')
        return true;
      } catch (error) {
        return false;
      }
}

export function getCurrentAcademicYear() {
  let curDate = new Date()
  let currentYear = curDate.getFullYear()
  let currentMonth = curDate.getMonth() + 1
  let currentAcademicYear = ''
  let prevYear = parseInt(currentYear) - 1
  let nextYear = parseInt(currentYear) + 1
  if(currentMonth >= 4) {
    currentAcademicYear = currentYear + "-" + nextYear
  } else {
    currentAcademicYear =  prevYear + "-" + currentYear
  }
  return currentAcademicYear;
}

export function getAttendanceDateRanges(days) {
  let dateRange = {min: '', max: ''}
  var date = new Date();
  var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));

  var c_day =date.getDate();
  c_day = c_day < 10 ? '0'+c_day : c_day
  var c_month=date.getMonth()+1;
  c_month = c_month < 10 ? '0'+c_month : c_month
  var c_year=date.getFullYear();

  var l_day =last.getDate();
  l_day = l_day < 10 ? '0'+l_day : l_day
  var l_month=last.getMonth()+1;
  l_month = l_month < 10 ? '0'+l_month : l_month
  var l_year=last.getFullYear();

  dateRange.min = l_year+"-"+l_month+"-"+l_day
  dateRange.max = c_year+"-"+c_month+"-"+c_day
  return dateRange
}

export function getCurrentDate() {
  let date = new Date()
  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = date.getFullYear()
  day = day < 10 ? "0"+day : day
  month = month < 10 ? "0"+month : month
  let retDate = year+"-"+month+"-"+day
  return retDate
}