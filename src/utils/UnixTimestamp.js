export default function age(UNIX_timestamp) {
  var difference = Math.abs(new Date() - new Date(UNIX_timestamp * 1000));

  var time = {};
  time.hours = Math.floor(difference / (1000 * 60 * 60));
  time.minutes = Math.floor(difference / (1000 * 60));
  time.seconds = Math.floor(difference / 1000);

  if (time.hours > 0) {
    return time.hours + " hr";
  } else if (time.minutes > 0) {
    return time.minutes + " min";
  } else if (time.seconds > 0) {
    return time.seconds + " sec";
  }
}
