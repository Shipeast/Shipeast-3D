const gramsSlider = document.getElementById("grams");
const gramsValue = document.getElementById("gramsValue");
const timeSlider = document.getElementById("timeRange");
const timeValue = document.getElementById("timeValue");
const output = document.getElementById("output");
const calculatedPriceInput = document.getElementById("calculatedPrice");

function updateSliders(){
    gramsValue.textContent = `${gramsSlider.value} g`;
    timeValue.textContent = `${timeSlider.value} hod`;
    calculate();
}

gramsSlider.addEventListener("input", updateSliders);
timeSlider.addEventListener("input", updateSliders);
document.getElementById("material").addEventListener("change", calculate);
document.getElementById("dph").addEventListener("change", calculate);

function calculate(){
    const grams = parseFloat(gramsSlider.value);
    const time = parseFloat(timeSlider.value);
    const material = document.getElementById("material").value;
    const dphEnabled = document.getElementById("dph").checked;

    const pricePerGram = { pla: 350/1000, petg: 390/1000 };
    const filament = grams * 1.10;
    const materialCost = filament * pricePerGram[material];
    const timeCost = time * 70;
    const MIN_PRICE = 150;
    const subtotal = Math.max(materialCost + timeCost, MIN_PRICE);
    const dph = dphEnabled ? subtotal*0.21 : 0;
    const total = Math.round(subtotal + dph);

    output.innerHTML = `
        <div class="line"><span>Materiál (+10%)</span><span>${materialCost.toFixed(2)} Kč</span></div>
        <div class="line"><span>Tisk</span><span>${timeCost.toFixed(2)} Kč</span></div>
        ${subtotal===MIN_PRICE?`<div class="line"><span>Minimální cena</span><span>${MIN_PRICE} Kč</span></div>`:``}
        ${dphEnabled?`<div class="line"><span>DPH</span><span>${dph.toFixed(2)} Kč</span></div>`:``}
        <div class="total">${total} Kč</div>
    `;

    if(calculatedPriceInput) calculatedPriceInput.value = total;
}

// Inicializace
updateSliders();
