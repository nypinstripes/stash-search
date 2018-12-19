import { withRouter } from 'react-router-dom';
import React from 'react';

const Legal = props => (
  <div className="docs legal page-root">
    <div className="docs-container">
      <h2>(MIT) License</h2>
      <h3>
        <span>Copyright 2018 Stashy</span>
        <span className="hint">(not a real corporation)</span>
      </h3>
      <p>
        Permission is hereby granted, free of charge, to any person obtaining a
        copy of this software and associated documentation files
        (the &quot;Software&quot;), to deal in the Software without restriction,
        including without limitation the rights to use, copy, modify, merge,
        publish, distribute, sublicense, and/or sell copies of the Software, and
        to permit persons to whom the Software is furnished to do so, subject to
        the following conditions:
      </p>
      <ul>
        <li>
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        </li>
      </ul>
      <p>
        THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY
        KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
        CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
        TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
        SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </p>
    </div>
  </div>
);

export default withRouter(Legal);
