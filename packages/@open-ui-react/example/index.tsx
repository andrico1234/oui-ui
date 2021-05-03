import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CheckboxGroup } from '../.';

const App = () => {
  const [disabled, setDisabled] = React.useState(false);
  return (
    <div>
      <button onClick={() => setDisabled(!disabled)}>Disable</button>
      <CheckboxGroup>
        <CheckboxGroup.Option name="one">
          <CheckboxGroup.Icon disabled={disabled} />
          <CheckboxGroup.Label />
        </CheckboxGroup.Option>
      </CheckboxGroup>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
