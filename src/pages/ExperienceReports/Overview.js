import React from 'react';
import Categories from './Categories';
import AddReport from './AddReport';

const Overview = () => (
  <div className="ExperienceReportOverview">
    <h1>Erfahrungsberichte</h1>

    <Categories/>
    <AddReport/>
  </div>
);

export default Overview;
