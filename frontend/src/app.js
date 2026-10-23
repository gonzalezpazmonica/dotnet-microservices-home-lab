const sensorInputs = [
    { id: 'S16', input: document.querySelector('#sensor-s16'), label: document.querySelector('#label-s16'), dot: document.querySelector('#dot-s16') },
    { id: 'S17', input: document.querySelector('#sensor-s17'), label: document.querySelector('#label-s17'), dot: document.querySelector('#dot-s17') }
];

const kpiState = document.querySelector('#kpi-state');
const miniState = document.querySelector('#k3-mini-state');
const result = document.querySelector('#scenario-result');
const resultText = result.querySelector('p');

function updateScenario() {
    const repairedSensors = sensorInputs.filter(({ input }) => input.checked);
    const unlocked = repairedSensors.length === sensorInputs.length;

    for (const sensor of sensorInputs) {
        const isActive = sensor.input.checked;
        sensor.label.textContent = isActive ? 'SIMULADO' : 'DEAD';
        sensor.dot.classList.toggle('alive', isActive);
        sensor.dot.classList.toggle('dead', !isActive);
    }

    kpiState.innerHTML = unlocked
        ? '<span class="state-pill unlocked"><span aria-hidden="true">✓</span> Desbloqueado en el escenario</span>'
        : '<span class="state-pill locked"><span aria-hidden="true">⌑</span> Bloqueado</span>';
    miniState.textContent = unlocked ? 'Escenario activo' : 'Bloqueado';
    miniState.classList.toggle('unlocked-text', unlocked);
    result.classList.toggle('unlocked-result', unlocked);

    if (unlocked) {
        resultText.textContent = 'K3 queda desbloqueado en este escenario simulado. El beneficio potencial de 24.000 €/año es una cifra predefinida, no un ahorro medido ni garantizado.';
    } else if (repairedSensors.length === 1) {
        const remaining = sensorInputs.find(({ input }) => !input.checked).id;
        resultText.textContent = `${repairedSensors[0].id} está activo en el escenario. Aún falta ${remaining} para cumplir los requisitos de K3.`;
    } else {
        resultText.textContent = 'Activa S16 y S17 para explorar el desbloqueo de K3. Esto no cambia el estado de ningún equipo real.';
    }
}

for (const sensor of sensorInputs) {
    sensor.input.addEventListener('change', updateScenario);
}

document.querySelector('#reset-scenario').addEventListener('click', () => {
    for (const sensor of sensorInputs) sensor.input.checked = false;
    updateScenario();
});

document.querySelector('#dismiss-disclaimer').addEventListener('click', () => {
    document.querySelector('.disclaimer').hidden = true;
});
