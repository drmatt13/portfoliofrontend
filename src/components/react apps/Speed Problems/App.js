import './App.css';

import WorkSheet from './components/WorkSheet';

function App() {
  return <> 
    <div className="App-header">
      <WorkSheet addition={true} range={[10,10]} duration={60}/>
    </div>
  </>
}

export default App;
