import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { registerUser, UserRegistrationData } from '../service/UserService';

export const NewUserForm = () => {
  const { control, handleSubmit, getValues } = useForm();
  const [enviando, setEnviando] = useState(false)

  const onSubmit = (data:any) => {
    console.log(data);
  };

  const profileOptions = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Comum', value: 'Comum' },
  ];

  return (
    <div className="grid" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-12 text-center p-3 font-bold">
        Register New User
      </div>

      <div className="col-6">
      <label htmlFor="firstName">First Name</label>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <InputText id="firstName" {...field}/>
          )}
        />
       
      </div>

      <div className="col-6">
        <label htmlFor="lastName">Last Name</label>
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <InputText id="lastName" {...field} />
          )}
        />
      </div>

      <div className="col-6">
        <label htmlFor="email">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputText id="email" {...field} />
          )}
        />
      </div>

      <div className="col-6">
        <label htmlFor="password">Password</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputText id="password" type="password" {...field} />
          )}
        />
      </div>

      <div className="col-6">
        <label htmlFor="profile">Profile</label>
        <Controller
          name="profile"
          control={control}
          render={({ field }) => (
            <Dropdown  id="profile" options={profileOptions} {...field} />
          )}
        />
      </div>

      <div className="col-6">
        <label htmlFor="status">Status</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <InputSwitch id="status" checked={field.value} onChange={(e) => field.onChange(e.value)} />
          )}
        />
      </div>

      <div className="col-12 text-center p-3">
        <Button loading={enviando} label="Submit" type="submit" onClick={() => {
            setEnviando(true)
            registerUser(getValues() as UserRegistrationData  ).then(()=>{
              setEnviando(false)
            }).catch(e=>{
              console.error(e)
              setEnviando(false)
            })
        }} />
      </div>
    </div>
  );
};