import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let timerId = null;

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  mins: document.querySelector('span[data-minutes]'),
  secs: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      alert('Please choose a date in the future');
      return;
    }
    refs.startBtn.addEventListener('click', () => {
      const selectedTime = selectedDates[0].getTime();

      console.log('Selected Time :', selectedDates[0]);

      timerId = setInterval(() => {
        reverseTimer(selectedTime);
      }, 1000);
    });
  },
};

flatpickr(refs.input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function reverseTimer(selectedTime) {
  const currentDate = new Date().getTime();
  const remainingTime = selectedTime - currentDate;

  addLeadingZero(remainingTime);

  if (remainingTime <= 0) {
    clearInterval(timerId);
    refs.days.textContent = '00';
    refs.hours.textContent = '00';
    refs.mins.textContent = '00';
    refs.secs.textContent = '00';
  }
}

function addLeadingZero(remainingTime) {
  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  const day = days.toString().padStart(2, '00');
  const hour = hours.toString().padStart(2, '00');
  const minute = minutes.toString().padStart(2, '00');
  const second = seconds.toString().padStart(2, '00');

  refs.days.textContent = day;
  refs.hours.textContent = hour;
  refs.mins.textContent = minute;
  refs.secs.textContent = second;
}
