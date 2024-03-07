import React from "react";
import axios from "axios";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Company, Connection, Response } from "./types/types";

const BASE_API_URL = import.meta.env.VITE_USER_API_URL;
const DEFAULT_COMPANY_ID = "65e9d3a158ce52ceea5ead13";

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

function EditClient() {
  const [company, setCompany] = React.useState<Response<Company>>();
  const [isBusy, setIsBusy] = React.useState<boolean>(false);
  const clientsRef = React.useRef<HTMLInputElement>(null);
  const msNumbersRef = React.useRef<HTMLInputElement>(null);
  const groupsRef = React.useRef<HTMLInputElement>(null);
  let { id } = useParams();
  let navigate = useNavigate();

  React.useEffect(() => {
    const COMPANY_ID = id || DEFAULT_COMPANY_ID;
    if (!COMPANY_ID) return;
    (async () => {
      try {
        const { data } = await axios.get<Response<Company>>(
          `${BASE_API_URL}/v1/company/${COMPANY_ID}`
        );
        setCompany(data);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    })();

    // fetch(`${BASE_API_URL}/v1/company/${COMPANY_ID}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCompany(data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     navigate("/");
    //   });
  }, []);

  const onDelete = (referenceParam?: string) => {
    const dataUpdated = company?.data.connections?.filter(({ reference }) => {
      return reference !== referenceParam;
    });

    if (!company) return;
    setCompany({
      ...company,
      data: {
        ...company.data,
        connections: dataUpdated || undefined,
      },
    });
  };

  const onAdd = (
    event: React.KeyboardEvent<HTMLInputElement>,
    type: "GROUP" | "CLIENT" | "MC"
  ) => {
    if (!company) return;
    if (event.key !== "Enter") return;
    const data = event.currentTarget.value.split(",");

    const connections = data.map((item) => {
      return {
        reference: item,
        type: type.toUpperCase(),
      };
    }) as Connection[];

    if (!company.data.connections) return;
    setCompany({
      ...company,
      data: {
        ...company.data,
        connections: [...company?.data?.connections, ...connections],
      },
    });

    const mapInputsCallacks = {
      CLIENT: () => {
        clientsRef.current?.focus();
        if (!clientsRef.current) return;
        clientsRef.current.value = "";
      },
      MC: () => {
        msNumbersRef.current?.focus();
        if (!msNumbersRef.current) return;
        msNumbersRef.current.value = "";
      },
      GROUP: () => {
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
    const body = JSON.stringify({
      name: company.data.name,
      connections: company.data.connections,
    });
    fetch(`${BASE_API_URL}/v1/company`, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        setCompany(data.data);
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
            defaultValue={company?.data.name}
          />
          <div className="flex flex-row gap-2 mt-2">
            <div className="flex flex-col w-1/2">
              <Input
                id="client-id"
                label="Client ID"
                placeholder="Enter the clients IDs"
                ref={clientsRef}
                onKeyDown={(e) => {
                  onAdd(e, "CLIENT");
                }}
              />
              <div className="flex flex-row mt-2 gap-2 w-full flex-wrap">
                {company &&
                  company?.data?.connections
                    ?.filter((con) => con.type === "CLIENT")
                    ?.map(({ reference }) => {
                      return (
                        <Chip
                          key={reference}
                          label={reference}
                          onDelete={() => {
                            onDelete(reference);
                          }}
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
                  onAdd(e, "MC");
                }}
              />
              <div className="flex flex-row mt-2 gap-2 w-full flex-wrap">
                {company &&
                  company?.data?.connections
                    ?.filter((con) => con.type === "MC")
                    ?.map(({ reference }) => {
                      return (
                        <Chip
                          key={reference}
                          label={reference}
                          onDelete={() => {
                            onDelete(reference);
                          }}
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
                  onAdd(e, "GROUP");
                }}
              />
              <div className="flex flex-row mt-2 gap-2 w-full flex-wrap">
                {company &&
                  company?.data?.connections
                    ?.filter((con) => con.type === "GROUP")
                    ?.map(({ reference }) => {
                      return (
                        <Chip
                          key={reference}
                          label={reference}
                          onDelete={() => {
                            onDelete(reference);
                          }}
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

function App() {
  return (
    <Routes>
      <Route path="/:id" element={<EditClient />} />
      <Route path="/" element={<EditClient />} />
    </Routes>
  );
}

export default App;
