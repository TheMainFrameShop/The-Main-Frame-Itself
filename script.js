// ===== META Time Travelers OS =====
const bootSequence = [
    { text:'?? Pre-Prehistoric Mode: Launching Dino Game!', theme:'preprehistoric', disclaimer:'Offline placeholder', products:[], preLoadDino:true },
    { text:'?? History Era: Include dark & light past', theme:'history', disclaimer:'Placeholder items', products:[] },
    { text:'?? Life Era: Theories of Life, Gravity, Apple', theme:'life', disclaimer:'Placeholder items', products:[] },
    { text:'?? Present Era: Modern Fun', theme:'present', disclaimer:'Placeholder items', products:[] },
    { text:'?? Future Era: Predictions & Dreams', theme:'future', disclaimer:'Placeholder items', products:[] }
];

let idx=0, bootPaused=false, sensoryOff=false, inventory=[];
const bootText = document.getElementById('bootText');
const productOverlay = document.getElementById('productOverlay');
const inventoryModal = document.getElementById('inventory');
const inventoryList = document.getElementById('inventoryItems');

// ===== PRELOAD CHROME DINO =====
function openDinoGame() {
    try { window.open('chrome://dino', '_blank'); } catch(e){ console.log('Cannot open Dino tab'); }
}
openDinoGame();

// ===== BOOT LOOP =====
function nextBoot() {
    if(bootPaused) return;
    const section = bootSequence[idx];
    bootText.textContent = section.text;
    productOverlay.innerHTML = '<p class=\"disclaimer\">'+section.disclaimer+'</p>';

    // Preload Dino for Prehistoric Mode
    if(section.preLoadDino){ console.log('Dino game should be visible now!'); }

    idx = (idx+1)%bootSequence.length;
    setTimeout(nextBoot,3000);
}

// ===== INVENTORY =====
document.getElementById('inventoryBtn').addEventListener('click',()=>{inventoryModal.style.display='block'; renderInventory();});
function renderInventory() {
    inventoryList.innerHTML='';
    inventory.forEach(item=>{
        const li = document.createElement('li'); li.textContent=item; inventoryList.appendChild(li);
    });
}

// ===== CONTROLS =====
document.getElementById('pauseBtn').addEventListener('click',()=>{bootPaused=!bootPaused; document.getElementById('pauseBtn').textContent=bootPaused?'?? Resume':'?? Pause'; if(!bootPaused) nextBoot();});
document.getElementById('vibeBtn').addEventListener('click',()=>{alert('No-Sleep Mode toggled!')});
document.getElementById('motionBtn').addEventListener('click',()=>{alert('Reduce Motion toggled!')});
document.getElementById('sensoryBtn').addEventListener('click',()=>{sensoryOff=!sensoryOff; alert('Sensory Mode: '+(sensoryOff?'Off':'On'))});

// ===== EXIT WARNING =====
window.onbeforeunload = function(){ return '?? Are you sure you want to leave? Boot sequence will rewind!'; }

// ===== START =====
nextBoot();
