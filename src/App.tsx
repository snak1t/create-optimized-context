import React from 'react';
import { Provider } from './data.provider';
import { AComponent } from './a.component';
import { BComponent } from './b.component';
import { CComponent } from './c.component';

function App() {
  return (
    <Provider>
      <div style={{ padding: 20 }}>
        <AComponent />
        <BComponent />
        <CComponent />
      </div>
    </Provider>
  );
}

export default App;
