//================================================
// quantumTunnel.Dependencies
// sharpcodex , sharpcodex@gmail.com
//================================================

function QuantomError(message) {
    this.message = message;
    this.name = "Quantum tunnel";
}

if (typeof ($) !== "function") {
    throw new QuantomError(QT.resources.nojQuery);
}
