import React from "react";

type InputProps = React.HTMLProps<HTMLInputElement> & { label: string };

function Input(props: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type="text"
        className="border border-gray-600 rounded p-2"
        {...props}
      />
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <h1 className="text-xl text-blue-800">Company</h1>
      <div className="flex">
        <Input
          id="name-of-the-legal-entity"
          placeholder="Enter the name of the legal entity"
          label="Name of the legal entity"
        />
        <div className="flex">
          <div className="flex flex-row">
            <Input
              id="client-id"
              label="Client ID"
              placeholder="Enter the clients IDs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
