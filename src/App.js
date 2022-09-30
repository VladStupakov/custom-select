import { useState } from "react";
import { SelectComponent } from "./SelectComponent";

const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
  { label: 'Option 4', value: 4 },
  { label: 'Option 5', value: 5 },
]

function App() {

  const [value, setValue] = useState(options[0])
  const [value1, setValue1] = useState([])

  return (
    <div className="App">
      <SelectComponent options={options} value={value} onChange={option => setValue(option)}/>
      <SelectComponent multiple options={options} value={value1} onChange={option => setValue1(option)}/>
    </div>
  );
}

export default App;
