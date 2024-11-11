
import { NewUserForm, UserTable, Dashboard } from './component'
import { LoginForm } from './component/LoginForm'


function App() {
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
        
        <div className="col-6">
          <LoginForm/>
        </div>
      </div> 
    
  )
}

export default App
