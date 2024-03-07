import React from "react";

type InputProps = React.HTMLProps<HTMLInputElement> & { label: string };

function Input(props: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id}>{props.label}</label>
      <input type="text" className="border border-gray-200 p-1" {...props} />
    </div>
  );
}

function App() {
  return (
    <div className="container flex w-full">
      <div className="shadow rounded-xl border p-2">
        <h1 className="text-xl text-blue-800">Company</h1>
        <div className="flex flex-col">
          <Input
            id="name-of-the-legal-entity"
            placeholder="Enter the name of the legal entity"
            label="Name of the legal entity"
          />
          <div className="flex flex-row gap-2">
            <div className="flex flex-col">
              <Input
                id="client-id"
                label="Client ID"
                placeholder="Enter the clients IDs"
              />
            </div>
            <div className="flex flex-col">
              <Input
                id="mc-number"
                label="MC Number"
                placeholder="Enter the MC Numbers"
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col">
              <Input
                id="group-id"
                label="Group ID"
                placeholder="Enter the group IDs"
              />
            </div>
            <div className="flex flex-col">
              <Input
                id="brand-id"
                label="Brand ID"
                placeholder="Enter the Brand IDs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
