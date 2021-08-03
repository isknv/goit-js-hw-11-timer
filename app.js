// таймер может в минуса заходить - надо очищать интервал, когда достигнет нуля
let setInt = null;

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.trgtDate = targetDate;
    this.days = document.querySelector(`${selector} [data-value="days"]`);
    this.hours = document.querySelector(`${selector} [data-value="hours"`);
    this.minutes = document.querySelector(`${selector} [data-value="mins"]`);
    this.seconds = document.querySelector(`${selector} [data-value="secs"]`);
    this.startTime();
    this.dateTime();
  }

  startTime() {
    setInt = setInterval(() => {
      this.dateTime();
    }, 1000);
  }

  dateTime() {
    const dataNow = Date.now();
    const time = this.trgtDate - dataNow;
    const { days, hours, mins, secs } = this.getTimerComponents(time);
    this.showDate(days, hours, mins, secs);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  getTimerComponents(time) {
    if (time > 0) clearTimeout(setInt);

    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  showDate(days, hours, mins, secs) {
    this.days.textContent = days;
    this.hours.textContent = hours;
    this.minutes.textContent = mins;
    this.seconds.textContent = secs;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2019'),
});
