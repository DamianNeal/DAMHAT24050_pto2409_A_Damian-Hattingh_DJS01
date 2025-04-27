// Mars Climate Orbiter Challenge - Corrected Code

// Given Parameters
const params = {
  vel: 10000, // initial velocity in km/h
  acc: 3,     // acceleration in m/s²
  time: 3600, // time in seconds
  d: 0,       // initial distance in km
  fuel: 5000, // initial fuel in kg
  fbr: 0.5    // fuel burn rate in kg/s
};

// Function to validate parameters
function validateParams({ vel, acc, time, d, fuel, fbr }) {
  if (typeof vel !== "number" || typeof acc !== "number" || typeof time !== "number" || 
      typeof d !== "number" || typeof fuel !== "number" || typeof fbr !== "number") {
    throw new Error("All parameters must be numbers.");
  }
  if (vel < 0 || acc < 0 || time < 0 || fuel < 0 || fbr < 0) {
    throw new Error("Parameters cannot be negative.");
  }
}

// Function to calculate new velocity
function calcNewVel({ vel, acc, time }) {
  // Convert acceleration from m/s² to km/h²
  const accInKmPerH2 = acc * 3600; 
  return vel + (accInKmPerH2 * (time / 3600)); // time/3600 to match km/h
}

// Function to calculate new distance
function calcNewDistance({ vel, acc, time, d }) {
  // Convert velocity from km/h to km/s
  const velInKms = vel / 3600;
  // Convert acceleration from m/s² to km/s²
  const accInKms2 = acc / 1000;
  return d + (velInKms * time) + (0.5 * accInKms2 * Math.pow(time, 2));
}

// Function to calculate remaining fuel
function calcRemainingFuel({ fuel, fbr, time }) {
  const burnedFuel = fbr * time;
  const remainingFuel = fuel - burnedFuel;
  if (remainingFuel < 0) {
    throw new Error("Fuel exhausted. Remaining fuel cannot be negative.");
  }
  return remainingFuel;
}

// Main execution
try {
  validateParams(params);

  const newVelocity = calcNewVel(params);
  const newDistance = calcNewDistance(params);
  const remainingFuel = calcRemainingFuel(params);

  console.log(`Corrected New Velocity: ${newVelocity.toFixed(2)} km/h`);
  console.log(`Corrected New Distance: ${newDistance.toFixed(2)} km`);
  console.log(`Corrected Remaining Fuel: ${remainingFuel.toFixed(2)} kg`);

} catch (error) {
  console.error("Error:", error.message);
}
