import React from "react";
import { Client, Company, Response } from "./types/types";

type InputProps = React.HTMLProps<HTMLInputElement> & { label: string };

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  props: InputProps,
  ref
) {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.id} className="text-gray-700 text-sm">
        {props.label}
      </label>
      <input
        ref={ref}
        type="text"
        className="border border-gray-300 p-1"
        {...props}
      />
    </div>
  );
});

type ChipProps = React.HTMLProps<HTMLDivElement> & {
  label: string;
  onDelete: () => void;
};

function Chip(props: ChipProps) {
  return (
    <div
      id={props.label}
      className="flex flex-row justify-between items-center bg-blue-100 text-blue-900 w-fit rounded-3xl px-1 pl-2 border border-solid border-blue-300"
    >
      {props.label}
      <button
        onClick={props.onDelete}
        aria-label={props.label}
        className="text-red-800 text-sm p-1 bg-transparent border-none active:outline-none active:border-0 focus-visible:border-0 focus-visible:outline-0"
      >
        <small>X</small>
      </button>
    </div>
  );
}

function App() {
  const [company, setCompany] = React.useState<Response<Company>>();
  const [isBusy, setIsBusy] = React.useState<boolean>(false);
  const clientsRef = React.useRef<HTMLInputElement>(null);
  const msNumbersRef = React.useRef<HTMLInputElement>(null);
  const groupsRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    fetch("/v1/company/1")
      .then((res) => res.json())
      .then((data) => {
        setCompany(data);
      });
  }, []);

  const onDelete = (
    id: string,
    type: "clients" | "msNumbers" | "groups" | "brands",
    name?: string
  ) => {
    const dataUpdated = company?.data.data[type]?.filter(
      (item: Client) => item.name !== name || item.id !== id
    );
    if (!company) return;
    setCompany({
      ...company,
      data: {
        ...company.data,
        data: {
          ...company.data.data,
          [type]: dataUpdated || undefined,
        },
      },
    });
  };

  const onAdd = (
    event: React.KeyboardEvent<HTMLInputElement>,
    type: "clients" | "msNumbers" | "groups"
  ) => {
    if (!company) return;
    if (event.key !== "Enter") return;
    const data = event.currentTarget.value.split(",");

    const dataUpdated = company?.data.data[type]?.concat(
      data.map((name) => ({ name }))
    );
    setCompany({
      ...company,
      data: {
        ...company.data,
        data: {
          ...company.data.data,
          [type]: dataUpdated || undefined,
        },
      },
    });
    const mapInputsCallacks = {
      clients: () => {
        clientsRef.current?.focus();
        if (!clientsRef.current) return;
        clientsRef.current.value = "";
      },
      msNumbers: () => {
        msNumbersRef.current?.focus();
        if (!msNumbersRef.current) return;
        msNumbersRef.current.value = "";
      },
      groups: () => {
        groupsRef.current?.focus();
        if (!groupsRef.current) return;
        groupsRef.current.value = "";
      },
    };
    mapInputsCallacks[type]();
  };

  const onSave = () => {
    setIsBusy(true);
    if (!company) return;
    fetch("/v1/company", {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      method: "PUT",
      body: JSON.stringify(company),
    })
      .then((res) => res.json())
      .then((data) => {
        setCompany(data);
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  return (
    <div className="flex flex-col w-full justify-center items-center h-lvh">
      <h1 className="text-4xl text-gray-800 bold mb-2">Mock Workshop</h1>
      <div className="shadow rounded-md border p-4 w-1/2 h-fit bg-white">
        <h1 className="text-xl text-blue-800 mb-2">Company</h1>
        <div className="flex flex-col border-0 border-b border-gray-300 pb-4">
          <Input
            id="name-of-the-legal-entity"
            placeholder="Enter the name of the legal entity"
            label="Name of the legal entity"
            defaultValue={company?.data.data.name}
          />
          <div className="flex flex-row gap-2 mt-2">
            <div className="flex flex-col w-1/2">
              <Input
                id="client-id"
                label="Client ID"
                placeholder="Enter the clients IDs"
                ref={clientsRef}
                onKeyDown={(e) => {
                  onAdd(e, "clients");
                }}
              />
              <div className="flex flex-row mt-2 gap-2 w-full flex-wrap">
                {company &&
                  company?.data.data?.clients?.map(({ name, id }) => {
                    return (
                      <Chip
                        key={name}
                        label={name}
                        onDelete={() => onDelete(id!, "clients", name)}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="flex flex-col  w-1/2">
              <Input
                id="mc-number"
                label="MC Number"
                placeholder="Enter the MC Numbers"
                ref={msNumbersRef}
                onKeyDown={(e) => {
                  onAdd(e, "msNumbers");
                }}
              />
              <div className="flex flex-row mt-2 gap-2 w-full flex-wrap">
                {company &&
                  company?.data.data?.msNumbers?.map(({ name, id }) => {
                    return (
                      <Chip
                        key={name}
                        label={name}
                        onDelete={() => onDelete(id!, "msNumbers", name)}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 mt-2 w-full">
            <div className="flex flex-col w-full">
              <Input
                id="group-id"
                label="Group ID"
                placeholder="Enter the group IDs"
                ref={groupsRef}
                onKeyDown={(e) => {
                  onAdd(e, "groups");
                }}
              />
              <div className="flex flex-row mt-2 gap-2 w-full flex-wrap">
                {company &&
                  company?.data.data?.groups?.map(({ name, id }) => {
                    return (
                      <Chip
                        key={name}
                        label={name}
                        onDelete={() => onDelete(id!, "groups", name)}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <Input
                id="brand-id"
                label="Brand ID"
                placeholder="Brand ID autogenerated"
                disabled
              />
            </div>
          </div>
        </div>
        <button
          onClick={onSave}
          className="bg-blue-500 text-white p-2 rounded-md w-full mt-4"
          disabled={isBusy}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default App;
