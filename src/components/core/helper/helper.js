import moment from 'moment';

export const timeConvertor = (time) => {
  let listTime = time.split(':');
  let hours = Number(listTime[0]);
  let minutes = Number(listTime[1].slice(0, 2));
  let AMPM = listTime[1].slice(2);
  if (AMPM === 'PM' && hours < 12) hours += 12;
  if (AMPM === 'AM' && hours === 12) hours -= 12;
  return `${hours}:${minutes}`;
};

export const createTimeSlots = (startTime, endTime) => {
  let fromTime = moment(startTime, 'HH:mm');
  let toTime = moment(endTime, 'HH:mm');

  let arr = [];
  while (fromTime <= toTime) {
    arr.push(new moment(fromTime).format('HH:mm'));
    fromTime.add(30, 'minutes');
  }
  return arr
    .map((ele, index) =>
      index !== arr.length - 1 ? `${arr[index]} - ${arr[index + 1]}` : null
    )
    .filter((ele) => ele !== null);
};

export const ownUnique = (list) => {
  return list.reduce((previousValue, currentValue, index, arr) => {
    let startTime = timeConvertor(currentValue['Available at']);
    let endTime = timeConvertor(currentValue['Available until']);
    let totalTimeSlots = createTimeSlots(startTime, endTime);
    currentValue.timeSlots = totalTimeSlots;
    previousValue.map((ele) => {
      if (
        ele.Name === currentValue.Name &&
        ele['Day of Week'] === currentValue['Day of Week']
      ) {
        ele.timeSlots = ele.timeSlots.concat(currentValue.timeSlots);
      }
    });
    if (
      !previousValue.find(
        (ele) =>
          ele.Name === currentValue.Name &&
          ele['Day of Week'] === currentValue['Day of Week']
      )
    ) {
      previousValue.push(currentValue);
    }
    return previousValue;
  }, []);
};