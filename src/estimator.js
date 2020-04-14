const covid19ImpactEstimator = (data) => {
  var time = data.periodType;
  if (time == 'days') {
    var factor = data.timeToElapse / 3;
  } else if (time == 'months') {
    var factor = (data.timeToElapse * 30) / 3;
  } else if (time == 'years') {
    var factor = (data.timeToElapse * 360) / 3;
  } else {
    return 'error';
  }

  const impact = {};
  impact.currentlyInfected = data.reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  impact.hospitalBedsByRequestedTime =
    data.totalHospitalBeds * 0.35 - impact.severeCasesByRequestedTime;
  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  impact.casesForVentilatorsByRequestedTime =
    impact.infectionsByRequestedTime * 0.02;
  impact.dollarsInFlight =
    impact.infectionsByRequestedTime *
    data.timeToElapse *
    data.region.avgDailyIncomeInUSD *
    data.region.avgDailyIncomePopulation;

  const severeImpact = {};
  severeImpact.currentlyInfected = data.reportedCases * 50;
  severeImpact.infectionsByRequestedTime =
    severeImpact.currentlyInfected * 2 ** factor;
  severeImpact.severeCasesByRequestedTime =
    severeImpact.infectionsByRequestedTime * 0.15;
  severeImpact.hospitalBedsByRequestedTime =
    data.totalHospitalBeds * 0.35 - severeImpact.severeCasesByRequestedTime;
  severeImpact.casesForICUByRequestedTime =
    severeImpact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForVentilatorsByRequestedTime =
    severeImpact.infectionsByRequestedTime * 0.02;
  severeImpact.dollarsInFlight =
    severeImpact.infectionsByRequestedTime *
    data.timeToElapse *
    data.region.avgDailyIncomeInUSD *
    data.region.avgDailyIncomePopulation;

  return { data: data, impact: impact, severeImpact: severeImpact };
};

export default covid19ImpactEstimator;
