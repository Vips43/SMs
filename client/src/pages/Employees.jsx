import { Eye, Plus, PlusIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import AddEmp from "@/components/employee/AddEmp";
import Search from "@/components/form/Search";
import AddSite from "@/components/oth/AddSite";
import ModalButton from "@/components/oth/ModalButton";
import ShowSites from "@/components/oth/ShowSites";
import { useAddUser, useGetAllUsers } from "@/hooks/empHooks";
import EmployeeList from "@/components/employee/EmployeeList";

function Employees() {
  const [toggle, setToggle] = useState({ search: false, sites: false });
  useEffect(() => {
    document.title = "SMs | Employees";
  }, []);

  const [empData, setEmpData] = useState({
    name: "",
    email: "",
    limit: 12,
    page: 1,
  });

  const { data: response, isFetching: responding } = useGetAllUsers({
    email: empData.email,
    limit: empData.limit,
    name: empData.name,
    page: empData.page,
  });
  const { mutateAsync: addUser, isFetching: addingUser, error } = useAddUser();
  const { register, formState: { errors }, handleSubmit, } = useForm();


  const search = (data) => {
    setEmpData((prev) => ({ ...prev, ...data, page: 1 }));
  };

  return (
    <div className="h-dvh overflow-hidden flex flex-col p-1">
      <div className="fab">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-lg btn-circle btn-info">
          <PlusIcon />
        </div>

        <div className="fab-close">
          Close <span className="btn btn-circle btn-lg btn-error">✕</span>
        </div>

        <div className="bg-blue-300 pl-1 rounded-md flex items-center justify-between gap-3 w-fit">
          <span className="text-sm font-medium">Add Employee</span>
          <AddEmp
            type="add"
            onSubmitEmp={addUser}
            userError={error}
            loading={addingUser}
          />
        </div>
        <div className="bg-blue-300 pl-1 rounded-md flex items-center justify-between gap-3 w-fit">
          <span className="text-sm font-medium">Show Sites</span>
          <ModalButton
            id="showSiteModal"
            onClick={() => {
              setToggle((prev) => ({ ...prev, sites: prev.sites }));
            }}
            title={
              <span>
                <Eye className="h-4 w-4" />{" "}
              </span>
            }
            btn="btn-secondary btn-md btn-square">
            <ShowSites show={toggle.sites} />
          </ModalButton>
        </div>
        <div className="bg-blue-300 pl-1 rounded-md flex items-center justify-between gap-3 w-fit">
          <span className="text-sm font-medium">Add Site</span>
          <ModalButton
            id="addSiteModal"
            onClick={() => {
              setToggle((prev) => ({ ...prev, sites: !prev.sites }));
            }}
            title={<Plus className="w-4 h-4" />}
            btn="btn-md btn-primary">
            <AddSite />
          </ModalButton>
        </div>
      </div>

      <div className="shrink-0 flex justify-end items-center gap-1 p-2">
        <h3 className="text-2xl font-semibold mr-auto">Employees</h3>
        <div className="flex ml-auto items-center gap-3">
          <button
            type="button"
            className="btn btn-neutral btn-square"
            popoverTarget="popover-1"
            style={{ anchorName: "--anchor-1" }}
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      <div
        className="dropdown dropdown-end menu bg-base-100 rounded-box shadow-md p-4 mt-2"
        popover="auto"
        id="popover-1"
        style={{ positionAnchor: "--anchor-1" }}
      >
        <Search
          register={register}
          errors={errors}
          onSubmit={handleSubmit(search)}
        />
      </div>

      {/* Added min-h-[350px] or padding-bottom to give room for dropdowns */}
      <EmployeeList response={response} responding={responding} />
    </div>
  );
}

export default Employees;
