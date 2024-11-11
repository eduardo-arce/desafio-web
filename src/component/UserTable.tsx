
import React, { useEffect, useState } from 'react';
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column, ColumnEditorOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { LoadingSpinner } from './LoadingSpinner';
import { getTableData } from '../service/UserService';

interface UserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profile: "Admin" | "Comum";
    status: boolean;
  }
  interface PaginatedUsers {
    current: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    data: UserData[];
  }
  const mockUserData: PaginatedUsers= {
    "current": 0,
    "pageSize": 5,
    "totalItems": 24,
    "totalPages": 5,
    "data": [
      {
        "id": 1,
        "firstName": "Admin",
        "lastName": "Admin",
        "email": "admin",
        "password": "admin",
        "profile": "Admin",
        "status": true
      },
      {
        "id": 3,
        "firstName": "Ana",
        "lastName": "Pereira",
        "email": "ana.pereira@yahoo.com",
        "password": "abcd",
        "profile": "Admin",
        "status": true
      },
      {
        "id": 6,
        "firstName": "Juliana",
        "lastName": "Almeida",
        "email": "juliana.almeida@outlook.com",
        "password": "pass1234",
        "profile": "Admin",
        "status": true
      },
      {
        "id": 7,
        "firstName": "Ricardo",
        "lastName": "Costa",
        "email": "ricardo.costa@gmail.com",
        "password": "1234abcd",
        "profile": "Comum",
        "status": true
      },
      {
        "id": 8,
        "firstName": "Mariana",
        "lastName": "Lima",
        "email": "mariana.lima@yahoo.com",
        "password": "senha567",
        "profile": "Admin",
        "status": true
      }
    ]
  }
export const UserTable=() => {
    const [users, setUsers] = useState<PaginatedUsers>(mockUserData);
    const [statuses] = useState<{label:string, value: boolean}[]>([{label:'ATIVO', value: true},{label:'INATIVO', value: false}]);
    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState<number>(5);
    const [loading, setLoading] = useState(true)

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
        //TODDO acionar paginação;
    };

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        let _products = [...users.data];
        let { newData, index } = e;

        console.log({newData})

        _products[index] = newData as UserData;

        setUsers({...users, data: _products});
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
        const optionsDropdown = [{label:'Comum', value: 'Comum'},{label:'Admin', value: 'Admin'}]
        return (
            <Dropdown
                value={options.value}
                options={optionsDropdown}
                optionLabel="label"
                optionValue='value'
                onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
                placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <Tag value={option.label} severity={option.value==="Admin"?'info':'secondary'}></Tag>;
                }}
            />
        );
    };


    const profileBodyTemplate = (rowData: UserData) => {
        return <Tag value={rowData.profile} severity={rowData.profile==="Admin"?"info": "secondary"}></Tag>;
    };


    const statusBodyTemplate = (rowData: UserData) => {
        return <Tag value={rowData.status?"ATIVO": "INATIVO"} severity={rowData.status?'success':'warning'}></Tag>;
    };


    const allowEdit = (rowData: UserData) => {
        return true;
    };

    
    useEffect(()=>{
        const fetchData = async () => {
            try {
              const data = await getTableData();
              setUsers(data)
              setLoading(false)
            } catch (error) {
                setLoading(false)
              console.error('Erro ao carregar os dados do usuário');
            }
          };
      
          fetchData();
    }, [])

    if(loading){
        return  <LoadingSpinner/>
    }

    return (
        <div className="card p-fluid">
            <DataTable 
            value={users?.data?? []}
        
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
            <Paginator first={users?.current-1} rows={users?.pageSize} totalRecords={users?.totalItems} rowsPerPageOptions={[1,5,10, 20, 30]} onPageChange={onPageChange} />
        </div>
    );
}