import React, { Component } from 'react';
import './Impressum.css';

class Impressum extends Component {
  render() {
    return (
      <div id="impressum">
        <h1>Impressum</h1>
      		<h2>ANGABEN GEMÄß § 5 TMG: </h2>
      		<p>Nagel Bohr Renkhoff GbR </p>
      		<p>
      			Neubrücker Straße 9928 <br/>
      			Am Umwelt-Campus Birkenfeld <br/>
      			z.H. Herrn Oliver Nagel <br/>
      			55768 Hoppstädten-Weiersbach
      		</p>
      		<h2>VERTRETEN DURCH:</h2>
      		<p>Oliver Nagel, Hannah Bohr, Justus Renkhoff <br/>
      			Neubrücker Straße. 9928 <br/>
      			Am Umwelt-Campus Birkenfeld <br/>
      			55768 Hoppstädten-Weiersbach</p>
      		<h2>KONTAKT:</h2>
      		<p>E-Mail: info@job-lion.com</p>
      		<p>© Bildrechte: fotolia.com</p>

      </div>
    );
  }
}

export default Impressum;
