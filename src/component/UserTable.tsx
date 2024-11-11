
import React, { useEffect, useState } from 'react';
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profile: "common" | "admin"; // definindo o tipo do perfil com valores permitidos
    status: boolean;
  }
  const mockUserData: UserData[] = [
    {
      firstName: "FirstName1",
      lastName: "LastName1",
      email: "user1@example.com",
      password: "password1",
      profile: "common",
      status: true,
    },
    {
      firstName: "FirstName2",
      lastName: "LastName2",
      email: "user2@example.com",
      password: "password2",
      profile: "common",
      status: false,
    },
    {
      firstName: "FirstName3",
      lastName: "LastName3",
      email: "user3@example.com",
      password: "password3",
      profile: "common",
      status: true,
    },
    {
      firstName: "FirstName4",
      lastName: "LastName4",
      email: "user4@example.com",
      password: "password4",
      profile: "common",
      status: false,
    },
    {
      firstName: "FirstName5",
      lastName: "LastName5",
      email: "user5@example.com",
      password: "password5",
      profile: "common",
      status: true,
    },
    {
      firstName: "FirstName6",
      lastName: "LastName6",
      email: "user6@example.com",
      password: "password6",
      profile: "common",
      status: false,
    },
    {
      firstName: "FirstName7",
      lastName: "LastName7",
      email: "user7@example.com",
      password: "password7",
      profile: "common",
      status: true,
    },
    {
      firstName: "FirstName8",
      lastName: "LastName8",
      email: "user8@example.com",
      password: "password8",
      profile: "common",
      status: false,
    },
    {
      firstName: "FirstName9",
      lastName: "LastName9",
      email: "user9@example.com",
      password: "password9",
      profile: "admin",
      status: true,
    },
    {
      firstName: "FirstName10",
      lastName: "LastName10",
      email: "user10@example.com",
      password: "password10",
      profile: "admin",
      status: false,
    },
  ];
export const UserTable=() => {
    const [products, setProducts] = useState<UserData[]>(mockUserData);
    const [statuses] = useState<{label:string, value: boolean}[]>([{label:'ATIVO', value: true},{label:'INATIVO', value: false}]);
    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState<number>(5);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        let _products = [...products];
        let { newData, index } = e;

        console.log({newData})

        _products[index] = newData as UserData;

        setProducts(_products);
    };

    const textEditor = (options: ColumnEditorOptions) => {
        return <InputText 
        type="text" 
        value={options.value} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback!(e.target.value)} />;
    };

    const statusEditor = (options: ColumnEditorOptions) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                optionLabel="label"
                optionValue='value'
                onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
                placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <Tag value={option.label} severity={option.value?'success':'warning'}></Tag>;
                }}
            />
        );
    };
    const profileEditor = (options: ColumnEditorOptions) => {
        const optionsDropdown = [{label:'common', value: 'common'},{label:'admin', value: 'admin'}]
        return (
            <Dropdown
                value={options.value}
                options={optionsDropdown}
                optionLabel="label"
                optionValue='value'
                onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
                placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <Tag value={option.label} severity={option.value==="admin"?'info':'secondary'}></Tag>;
                }}
            />
        );
    };

    const nameBodyTemplate = (rowData: UserData) => {
        return <Tag value={`${rowData.firstName} ${rowData.lastName}` } severity={"danger"}></Tag>;
    };

    const profileBodyTemplate = (rowData: UserData) => {
        return <Tag value={rowData.profile} severity={rowData.profile==="admin"?"info": "secondary"}></Tag>;
    };


    const statusBodyTemplate = (rowData: UserData) => {
        return <Tag value={rowData.status?"ATIVO": "INATIVO"} severity={rowData.status?'success':'warning'}></Tag>;
    };


    const allowEdit = (rowData: UserData) => {
        return true;
    };

    return (
        <div className="card p-fluid">
            <DataTable 
            value={products.slice(first,first+rows)}
        
            paginator={false}
             editMode="row" 
             dataKey="email"
              onRowEditComplete={onRowEditComplete} 
              >

                <Column 
                field="email" 
                header="Email" 
                editor={(options) => textEditor(options)} 
                style={{ width: '20%' }}/>

                <Column field="firstName"
                 header="FirstName"
                 
                 editor={(options) => textEditor(options)}
                style={{ width: '20%' }}/>
                <Column field="lastName"
                 header="LastName"
                 
                 editor={(options) => textEditor(options)}
                style={{ width: '20%' }}/>

                <Column 
                field="status"
                 header="Status"
                 body={statusBodyTemplate}
                editor={(options) => statusEditor(options)}
                style={{ width: '20%' }}/>

                <Column 
                field="profile" 
                header="Profile"
                body={profileBodyTemplate}
                editor={(options) => profileEditor(options)} 
                style={{ width: '20%' }}/>

                <Column rowEditor={allowEdit}
                 headerStyle={{ width: '10%', minWidth: '8rem' }}
                  bodyStyle={{ textAlign: 'center' }}/>
            </DataTable>
            <Paginator first={first} rows={rows} totalRecords={mockUserData.length} rowsPerPageOptions={[1,5,10, 20, 30]} onPageChange={onPageChange} />
        </div>
    );
}