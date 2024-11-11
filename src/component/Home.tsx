
import { NewUserForm, UserTable, Dashboard } from './'

export const Home = ()=> {
  return (
    
      <div className="grid">
        <div className="col-6">
          <Dashboard/>          
        </div>
        <div className="col-6">
          <UserTable/>
        </div>
        <div className="col-6">
          <NewUserForm/>
        </div>
        
      </div> 
    
  )
}
