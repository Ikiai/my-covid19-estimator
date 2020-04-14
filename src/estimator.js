const covid19ImpactEstimator = (data) => {
  if (data.periodType === 'days') {
    // eslint-disable-next-line no-undef
    factor = data.timeToElapse / 3;
  } else if (data.periodType === 'months') {
    // eslint-disable-next-line no-undef
    factor = (data.timeToElapse * 30) / 3;
  } else if (data.periodType === 'years') {
    // eslint-disable-next-line no-undef
    factor = (data.timeToElapse * 360) / 3;
  } else {
    return 'error';
  }

  const impact = {};
  impact.currentlyInfected = data.reportedCases * 10;
  // eslint-disable-next-line no-undef
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** factor;
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  // eslint-disable-next-line max-len
  impact.hospitalBedsByRequestedTime = data.totalHospitalBeds * 0.35 - impact.severeCasesByRequestedTime;
  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  impact.casesForVentilatorsByRequestedTime = impact.infectionsByRequestedTime * 0.02;
  // eslint-disable-next-line max-len
  impact.dollarsInFlight = impact.infectionsByRequestedTime * data.timeToElapse * data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation;

  const severeImpact = {};
  severeImpact.currentlyInfected = data.reportedCases * 50;
  // eslint-disable-next-line no-undef
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** factor;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  // eslint-disable-next-line max-len
  severeImpact.hospitalBedsByRequestedTime = data.totalHospitalBeds * 0.35 - severeImpact.severeCasesByRequestedTime;
  severeImpact.casesForICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForVentilatorsByRequestedTime = severeImpact.infectionsByRequestedTime * 0.02;
  // eslint-disable-next-line max-len
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * data.timeToElapse * data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation;

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
