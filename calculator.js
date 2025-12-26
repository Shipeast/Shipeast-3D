const gramsInput = document.getElementById("grams");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const materialSelect = document.getElementById("material");
const dphCheckbox = document.getElementById("dph");
const output = document.getElementById("output");
const calculatedPriceInput = document.getElementById("calculatedPrice");

[gramsInput, hoursInput, minutesInput, materialSelect, dphCheckbox].forEach(el=>{
    el.addEventListener("input", calculate);
});

function calculate(){
    const grams = parseFloat(gramsInput.value);
    const hours = parseFloat(hoursInput.value)||0;
    const minutes = parseFloat(minutesInput.value)||0;
    const material = materialSelect.value;
    const dphEnabled = dphCheckbox.checked;

    if(isNaN(grams)||grams<=0){ output.innerHTML="Vyplň spotřebu filamentu."; return; }
    const time = hours + minutes/60;
    if(time<=0){ output.innerHTML="Vyplň dobu tisku."; return; }

    const pricePerGram = { pla:350/1000, petg:390/1000 };
    const filament = grams*1.10;
    const materialCost = filament*pricePerGram[material];
    const timeCost = time*70;
    const MIN_PRICE = 150;
    const subtotal = Math.max(materialCost+timeCost, MIN_PRICE);
    const dph = dphEnabled?subtotal*0.21:0;
    const total = Math.round(subtotal+dph);

    // Animace plynulého přepočtu
    output.innerHTML=`
        <div class="line"><span>Materiál (+10%)</span><span>${materialCost.toFixed(2)} Kč</span></div>
        <div class="line"><span>Tisk</span><span>${timeCost.toFixed(2)} Kč</span></div>
        ${subtotal===MIN_PRICE?`<div class="line"><span>Minimální cena</span><span>${MIN_PRICE} Kč</span></div>`:``}
        ${dphEnabled?`<div class="line"><span>DPH</span><span>${dph.toFixed(2)} Kč</span></div>`:``}
        <div class="total">${total} Kč</div>
    `;
    if(calculatedPriceInput) calculatedPriceInput.value = total;
}
calculate();
