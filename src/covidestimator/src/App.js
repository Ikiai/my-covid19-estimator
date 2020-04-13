import React, { Component } from 'react';
import covid19ImpactEstimator from 'estimator/src/estimator';

const covid = require('./covid.jpeg');
class App extends Component {
  state = {
    data: {},
    submitted: false
  };

  onSubmit = (event) => {
    event.preventDefault();
    const population = parseInt(this.population.value);
    const timeToElapse = parseInt(this.timeToElapse.value);
    const reportedCases = parseInt(this.reportedCases.value);
    const totalHospitalBeds = parseInt(this.totalHospitalBeds.value);
    const periodType = this.periodType.value;
    const data = {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
      },
      periodType: periodType,
      timeToElapse: timeToElapse,
      reportedCases: reportedCases,
      population: population,
      totalHospitalBeds: totalHospitalBeds
    };

    this.setState({ data, submitted: true });
    covid19ImpactEstimator(data);
  };
  renderestimation() {
    return (
      <div>
        <div>
          Input:{' '}
          <ul style={{ listStyleType: 'none' }}>
            <li>Region: {this.state.data.region.name}</li>
            <li>Average age:{this.state.data.region.avgAge}</li>
            <li>
              Average Daily Income in USD:{' '}
              {this.state.data.region.avgDailyIncomeInUSD}
            </li>
            <li>
              Average daily Income Population:{' '}
              {this.state.data.region.avgDailyIncomePopulation}
            </li>
            <li>Period Type: {this.state.data.periodType}</li>
            <li>Time to elapse: {this.state.data.timeToElapse}</li>
            <li>Number of reported cases: {this.state.data.reportedCases}</li>
            <li>Population: {this.state.data.population}</li>
            <li>
              Total number of hospital beds: {this.state.data.totalHospitalBeds}
            </li>
          </ul>
        </div>
        <div>
          Impact:{' '}
          <ul style={{ listStyleType: 'none' }}>
            <li>
              Currently Infected:{' '}
              {Math.trunc(
                covid19ImpactEstimator(this.state.data).impact.currentlyInfected
              ).toLocaleString()}
            </li>
            <li>
              Infections by requested time:{' '}
              {Math.trunc(
                covid19ImpactEstimator(this.state.data).impact
                  .infectionsByRequestedTime
              ).toLocaleString()}
            </li>
            <li>
              Severe Cases by requested time:{' '}
              {Math.trunc(
                covid19ImpactEstimator(this.state.data).impact
                  .severeCasesByRequestedTime
              ).toLocaleString()}{' '}
            </li>
            <li>
              Hospital Beds by requested time:{' '}
              {Math.trunc(
                covid19ImpactEstimator(this.state.data).impact
                  .hospitalBedsByRequestedTime
              ).toLocaleString()}{' '}
            </li>
            <li>
              Cases for ICU by requested time:{' '}
              {Math.trunc(
                covid19ImpactEstimator(this.state.data).impact
                  .casesForICUByRequestedTime
              ).toLocaleString()}
            </li>
            <li>
              Cases for ventilators by requested time:{' '}
              {Math.trunc(
                covid19ImpactEstimator(this.state.data).impact
                  .casesForVentilatorsByRequestedTime
              ).toLocaleString()}{' '}
            </li>
            <li>
              Dollars in flight:{' '}
              {Math.trunc(
                covid19ImpactEstimator(this.state.data).impact.dollarsInFlight
              ).toLocaleString()}{' '}
            </li>
          </ul>
        </div>
        <div>
          SevereImpact:{' '}
          <ul style={{ listStyleType: 'none' }}>
            <li>
              Currently Infected:{' '}
              {Math.trunc(
                covid19ImpactEstimator(this.state.data).severeImpact
                  .currentlyInfected
              ).toLocaleString()}{' '}
            </li>
            <li>
              Infections by requested time:
              {Math.trunc(
                covid19ImpactEstimator(this.state.data).severeImpact
                  .infectionsByRequestedTime
              ).toLocaleString()}{' '}
            </li>
            <li>
              Severe cases by requested time:{' '}
              {Math.trunc(
                covid19ImpactEstimator(this.state.data).severeImpact
                  .severeCasesByRequestedTime
              ).toLocaleString()}{' '}
            </li>
            <li>
              Hospital beds by requested time:{' '}
              {Math.trunc(
                covid19ImpactEstimator(this.state.data).severeImpact
                  .hospitalBedsByRequestedTime
              ).toLocaleString()}{' '}
            </li>
            <li>
              Cases for ICU by requested time:{' '}
              {Math.trunc(
                covid19ImpactEstimator(this.state.data).severeImpact
                  .casesForICUByRequestedTime
              ).toLocaleString()}{' '}
            </li>
            <li>
              Cases for Ventilators by requested time:{' '}
              {Math.trunc(
                covid19ImpactEstimator(this.state.data).severeImpact
                  .casesForVentilatorsByRequestedTime
              ).toLocaleString()}
            </li>
            <li>
              Dollars in flight:{' '}
              {Math.trunc(
                covid19ImpactEstimator(this.state.data).severeImpact
                  .dollarsInFlight
              ).toLocaleString()}{' '}
            </li>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.submitted === false) {
      return (
        <div>
          <div
            style={{
              backgroundColor: 'grey',
              padding: '5%',
              paddingLeft: '10%',
              height: '650px'
            }}
          >
            <img src={covid} alt="" width="300px" style={{}} />
            <form onSubmit={this.onSubmit}>
              <h1>COVID-19-ESTIMATOR</h1>
              <div>
                <legend>Population</legend>
                <input
                  type="data-population"
                  ref={(input) => (this.population = input)}
                ></input>
              </div>
              <div>
                <legend>Time to Elapse</legend>
                <input
                  type="data-time-to-elapse"
                  ref={(input) => (this.timeToElapse = input)}
                ></input>
              </div>
              <div>
                <legend>Reported Cases</legend>
                <input
                  type="data-reported-cases"
                  ref={(input) => (this.reportedCases = input)}
                ></input>
              </div>
              <div>
                <legend>Total Hospital Beds</legend>
                <input
                  type="data-hospital-beds"
                  ref={(input) => (this.totalHospitalBeds = input)}
                ></input>
              </div>
              <div>
                <legend>Period Type</legend>
                <select
                  type="data-period-type"
                  ref={(input) => (this.periodType = input)}
                >
                  <option>days</option>
                  <option>weeks</option>
                  <option>months</option>
                </select>
              </div>
              <button type="data-go-estimate">Go Estimate</button>
            </form>
          </div>
        </div>
      );
    }
    if (this.state.submitted === true) {
      return (
        <div>
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.781)',
              float: 'right',
              padding: '10%',
              height: '500px'
            }}
          >
            {this.renderestimation()}
          </div>
          <div
            style={{
              backgroundColor: 'grey',
              padding: '5%',
              height: '650px'
            }}
          >
            <img src={covid} alt="" width="300px" style={{}} />
            <form onSubmit={this.onSubmit}>
              <h1>COVID-19-ESTIMATOR</h1>
              <div>
                <legend>Population</legend>
                <input
                  type="data-population"
                  ref={(input) => (this.population = input)}
                ></input>
              </div>
              <div>
                <legend>Time to Elapse</legend>
                <input
                  type="data-time-to-elapse"
                  ref={(input) => (this.timeToElapse = input)}
                ></input>
              </div>
              <div>
                <legend>Reported Cases</legend>
                <input
                  type="data-reported-cases"
                  ref={(input) => (this.reportedCases = input)}
                ></input>
              </div>
              <div>
                <legend>Total Hospital Beds</legend>
                <input
                  type="data-hospital-beds"
                  ref={(input) => (this.totalHospitalBeds = input)}
                ></input>
              </div>
              <div>
                <legend>Period Type</legend>
                <select
                  type="data-period-type"
                  ref={(input) => (this.periodType = input)}
                >
                  <option>days</option>
                  <option>weeks</option>
                  <option>months</option>
                </select>
              </div>
              <button type="data-go-estimate">Go Estimate</button>
            </form>
          </div>
        </div>
      );
    }
  }
}

export default App;
