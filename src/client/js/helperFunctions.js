const dateDealer = require("date-dealer");

//calculate how many days left before the trip
export const daysLeftBeforeTour = (tour) => {
    const dateUntil = dateDealer.timeUntil(tour.departureD);
    return dateUntil.days;
}

//calculate how many days of the trip
export const durationTour = (tour) => {
    const timeBetween = dateDealer.timeBetween(tour.departureD , tour.arrivalD);
    return timeBetween.days;
}

//scroll result
export const scroll = () => {
    document.querySelector('#displayResult').scrollIntoView({
        behavior: 'smooth'
    });
};

//change worlds to capital
export const capital = (wordTyped) => {
    if(typeof wordTyped !== 'string') return '';
    return wordTyped[0].toUpperCase()+ wordTyped.slice(1);
}
