document.addEventListener('DOMContentLoaded', () => {
console.log("Hello, world");

// get element by id from html (inputs)
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

// get element by id from html (outputs)
const age_years = document.getElementById('result_years');
const age_months = document.getElementById('result_months');
const age_days = document.getElementById('result_days');

// Need to calculate the amount of time bewteen a given date (dob) to the current date (todays date), which will == current age in years, months, days. Need to create a function to subtract current date from the date of birth. Where does todays date come from? What is the method called? Object Method (Date Object)

// Function to calculate age
function calculateAge(day, month, year) {
    const today = new Date();
    console.log(today);
    const birthDate= new Date(year, month -1, day);

    // Get varibles from getElementbyID (outputs) and use (.get object method)
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();
   
    // Conditional adjusts the months if the DOB hasnt occurred or month is current but day hasnt occurred. Doesnt add a year and adjust for a negative number in months.
    if (ageMonths < 0 ||(ageMonths === 0 && ageDays < 0 )){
        ageYears --; ageMonths += 12

}
    if (ageDays < 0 ) {
        ageMonths--;
        const prevMonth = new Date(today.getFullYear(),today.getMonth(),0)
        ageDays += prevMonth.getDate()
    }

    if (ageMonths < 0) {
        ageYears--;
         ageMonths += 12;
    
    }
// Conditional for months that equal 12 to rollover to the next year or 11 plus a day (since the index for January is 0) Also resetting the months to 0. 
    if (ageMonths === 12 || (ageMonths === 11 && ageDays > 0)) {
        ageYears += 1;
        ageMonths = 0;
    }
          
    
        return {
            ageYears, ageMonths, ageDays
        }
}

function animateResult(spanElement, finalValue){
    let startValue = 0;
    const duration = 1000; // 1 second animation
    const frameDuration = 1000/60; //60 frames per second
    const totalFrames = duration/frameDuration;
    const step = finalValue/totalFrames;

    let currentFrame = 0;
    const timer = setInterval (() => {
        currentFrame++;
        startValue+= step;

        if (currentFrame >= totalFrames) {
            clearInterval(timer);
            spanElement.textContent = finalValue; //Ensure number ends exactly on the final value
        }else {
                spanElement.textContent = 
                Math.floor(startValue);
        }
    }, frameDuration);

 }


// Add event listener for submit button
// Prevent document submission or opening a URL
const form = document.getElementById('ageForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user input values
const day = parseInt(dayInput.value);
const month = parseInt(monthInput.value);
const year = parseInt(yearInput.value);
console.log('Input values:', day, month, year);
 
const {ageDays, ageMonths, ageYears} = calculateAge(day, month, year);

animateResult(age_days , ageDays);
animateResult(age_months , ageMonths);
animateResult(age_years , ageYears);


    
});
})