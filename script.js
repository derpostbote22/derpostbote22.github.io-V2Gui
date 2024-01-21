document.addEventListener('DOMContentLoaded', function () {
    // Time function
    function formatDateTime(date) {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${dayOfWeek}, ${hours}:${minutes}`;
    }

    // Initial SOC value
    let cur_soc = 55;

    // Initial relative price value
    let rel_pri = 0;

    // Maximum relative price value
    let max_pri = 0.65;

    // Total energy value
    let tot_ene = 60;

    // Total price value
    let tot_pri = 0;

    // Display current SOC
    const currentSOCContainer = document.getElementById('currentSOCContainer');
    const curSOCValue = document.getElementById('curSOCValue');
    const currentSOC = document.getElementById('currentSOC');

    currentSOC.textContent = `Current SOC: ${cur_soc}%`;

    // Display relative price
    const relPriContainer = document.getElementById('relPriContainer');
    const relPriValue = document.getElementById('relPriValue');
    const relPri = document.getElementById('relPri');

    // Display total price
    const totPriContainer = document.getElementById('totPriContainer');
    const totPriValue = document.getElementById('totPriValue');
    const totPri = document.getElementById('totPri');

    // Time Slider
    const timeSlider = document.getElementById('sliderTop');
    const timeValue = document.getElementById('sliderValueTop');
    const minMaxValues = document.querySelectorAll('.min-max-values');

    // Set the minimum and maximum values for the time slider
    const currentTime = new Date();
    const maxTime = new Date(currentTime);
    maxTime.setHours(currentTime.getHours() + 24);

    timeSlider.min = currentTime.toISOString().slice(0, 16);
    timeSlider.max = maxTime.toISOString().slice(0, 16);
    timeSlider.value = currentTime.toISOString().slice(0, 16);
    timeValue.textContent = `${formatDateTime(currentTime)}`;
    minMaxValues[0].textContent = `${formatDateTime(currentTime)}`;
    minMaxValues[1].textContent = `${formatDateTime(maxTime)}`;

    // Top Slider
    const sliderTop = document.getElementById('sliderTop');
    const sliderValueTop = document.getElementById('sliderValueTop');

    // Calculate and display relative price based on the formula
    rel_pri = max_pri * (1 - sliderTop.value/100);
    relPriValue.textContent = rel_pri.toFixed(2);

    sliderValueTop.textContent = formatDateTime(new Date(currentTime.getTime() + (maxTime - currentTime) * (sliderTop.value / 100)));

    sliderTop.addEventListener('input', function () {
        rel_pri = max_pri * (1 - sliderTop.value/100);
        relPriValue.textContent = rel_pri.toFixed(2);
        sliderValueTop.textContent = formatDateTime(new Date(currentTime.getTime() + (maxTime - currentTime) * (sliderTop.value / 100)));
    });

    // Middle Slider
    const sliderMiddle = document.getElementById('sliderMiddle');
    const sliderValueMiddle = document.getElementById('sliderValueMiddle');

    sliderValueMiddle.textContent = `${sliderMiddle.value}%`;

    sliderMiddle.addEventListener('input', function () {
        sliderValueMiddle.textContent = `${sliderMiddle.value}%`;

        // Calculate and display total price based on the formula
        tot_pri = rel_pri * tot_ene * (sliderMiddle.value - cur_soc) / 100;
        totPriValue.textContent = `£${tot_pri.toFixed(2)}`;
    });

    // Bottom Slider
    const sliderBottom = document.getElementById('sliderBottom');
    const sliderValueBottom = document.getElementById('sliderValueBottom');

    sliderValueBottom.textContent = `${sliderBottom.value}%`;

    sliderBottom.addEventListener('input', function () {
        sliderValueBottom.textContent = `${sliderBottom.value}%`;
    });
});