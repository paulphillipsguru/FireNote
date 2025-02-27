/**
 * Fire Danger Calculation Utility
 * 
 * This class calculates various fire-related metrics based on environmental factors
 * such as temperature, humidity, wind speed, fuel load, drought conditions, and terrain slope.
 * 
 * ------------------------------
 * **INPUT PARAMETERS (FireModel)**
 * ------------------------------
 * - `Temp` (number) : Air temperature in degrees Celsius.
 * - `RH` (number) : Relative humidity (percentage), affecting moisture content.
 * - `WindSpeed` (number) : Wind speed in km/h, influencing fire spread.
 * - `FuelLoad` (number) : Amount of burnable material (e.g., grass, leaves, branches).
 * - `DroughtFactor` (number) : Scale (typically 0-10) indicating soil dryness.
 * - `GroundSlope` (number) : The steepness of the land, which impacts fire behavior.
 * 
 * ------------------------------
 * **OUTPUT PARAMETERS (ResponseModel)**
 * ------------------------------
 * - `FDI` (number) : Fire Danger Index, a numerical representation of fire risk.
 * - `FDIName` (string) : Fire risk category based on FDI value.
 * - `FlameHeight` (number) : Expected flame height in meters.
 * - `SpottingDistance` (number) : How far embers might travel, igniting new fires.
 * - `RateOfSpread` (number) : Speed at which the fire is expected to spread.
 * - `FireIntensity` (number) : The overall energy release of the fire.
 * - `FMC` (number) : Fuel Moisture Content, indicating how dry the vegetation is.
 * 
 * ------------------------------
 * **CALCULATION METHODS**
 * ------------------------------
 * - `getFmc(rh, temp)`: Computes Fuel Moisture Content (FMC), higher values indicate less flammability.
 * - `getBase(rh, temp, wind, droughtFactor)`: A base metric used in fire spread calculations.
 * - `getRos(baseNumber, slope, fuel)`: Calculates the **Rate of Spread** (how fast the fire moves).
 * - `getFireIntensity(ros, fuelLoad)`: Determines how intense the fire is based on rate of spread.
 * - `getFlameHeight(ros, fuelLoad)`: Estimates how high the flames will reach.
 * - `getSpotting(ros, fuelLoad)`: Predicts how far embers may travel.
 * - `getFdi(droughtFactor, rh, wind, temp)`: Computes **Fire Danger Index (FDI)**.
 * - `getFdiName(index)`: Converts the FDI number into a readable fire risk category.
 * 
 * ------------------------------
 * **USAGE**
 * ------------------------------
 * Call `calc(model: FireModel)` with the required environmental inputs to get 
 * a `ResponseModel` containing the calculated fire behavior and danger predictions.
 * 
 * Example Usage:
 * ```
 * const fireModel: FireModel = {
 *   Temp: 30,
 *   RH: 20,
 *   WindSpeed: 15,
 *   FuelLoad: 5,
 *   DroughtFactor: 8,
 *   GroundSlope: 10
 * };
 * 
 * const calculator = new fireDangerCalc();
 * const fireRisk = calculator.calc(fireModel);
 * console.log(fireRisk);
 * ```
 * 
 * This will output fire danger metrics that help assess wildfire risks.
 */

export type FireModel = {
  Temp: number,
  RH: number,
  WindSpeed: number,
  FuelLoad: number,
  DroughtFactor: number,
  GroundSlope: number
}

export type ResponseModel = {
  FDI: number,
  FDIName: string,
  FlameHeight: number,
  SpottingDistance: number,
  RateOfSpread: number,
  FireIntensity: number,
  FMC: number
}

export class fireDangerCalc {
  static getFmc(rh: number, temp: number): number {
    const fmc = 5.658 + 0.04651 * rh + (3.151 * Math.pow(10, -4) * Math.pow(rh, 3) / temp) - (0.1854 * Math.pow(temp, 0.77));
    return Math.min(Math.round(fmc * 100) / 100, 35);
  }
  static getBase(rh: number, temp: number, wind: number, droughtFactor: number): number {
    const base = 2 * Math.exp(-0.45 + 0.987 * Math.log(droughtFactor) - 0.0345 * rh + 0.0338 * temp + 0.0234 * wind);
    return Math.round(base * 100) / 100; // Rounds to two decimal places
  }

  static getRos(baseNumber: number, slope: number, fuel: number): number {
    const ros = 0.0012 * baseNumber * fuel * Math.exp(0.069 * slope) * 1000;
    return Math.round(ros * 100) / 100; // Rounds to two decimal places
  }

  static getFireIntensity(ros: number, fuelLoad: number): number {
    const fireIntensity = 18600 * (ros / 1000) * (fuelLoad / 36);
    return Math.round(fireIntensity); // Rounds to the nearest whole number
  }

  static getFlameHeight(ros: number, fuelLoad: number): number {
    const flameHeight = 13 * (ros / 1000) + 0.24 * fuelLoad - 2;
    return Math.max(flameHeight, 0); // Ensures the value is not negative
  }

  static getSpotting(ros: number, fuelLoad: number): number {
    const spotting = (ros / 1000 * (4.17 - 0.033 * fuelLoad) - 0.36) * 1000;
    return Math.round(Math.max(spotting, 0)); // Ensures the value is not negative and rounds to the nearest whole number
  }

  static getFdi(droughtFactor: number, rh: number, wind: number, temp: number): number {
    const fdi = 2 * Math.exp(-0.45 + 0.987 * Math.log(droughtFactor) - 0.0345 * rh + 0.0338 * temp + 0.0234 * wind);
    return Math.round(fdi); // Rounds to the nearest whole number
  }

  static formatDistance(distance: number): string {
    return distance < 1000 
        ? `${distance.toFixed(0)} m` 
        : `${(distance / 1000).toFixed(1)} km`;
  }

  static getFdiName(index: number): string {
    if (index >= 0 && index < 12) {
      return "LOW-MODERATE";
    } else if (index >= 12 && index < 25) {
      return "HIGH";
    } else if (index >= 25 && index < 50) {
      return "VERY HIGH";
    } else if (index >= 50 && index < 75) {
      return "SEVERE";
    } else if (index >= 75 && index < 100) {
      return "EXTREME";
    } else {
      return "CATASTROPHIC";
    }
  }

  static calc(model: FireModel) : ResponseModel
  {    
    var result = {
      FMC: this.getFmc(model.RH,model.Temp),
      FDI :this.getFdi(model.DroughtFactor,model.RH,model.WindSpeed,model.Temp),      
      
    } as ResponseModel;
    result.FDIName = this.getFdiName(result.FDI);
    var base = this.getBase(model.RH,model.Temp,model.WindSpeed,model.DroughtFactor);
    result.RateOfSpread = this.getRos(base,model.GroundSlope,model.FuelLoad);
    result.SpottingDistance = this.getSpotting(result.RateOfSpread,model.FuelLoad);
    result.FireIntensity = this.getFireIntensity(result.RateOfSpread,model.FuelLoad);
    result.FlameHeight = this.getFlameHeight(result.RateOfSpread,model.FuelLoad);
    console.log(result);
    return result;
  }

}