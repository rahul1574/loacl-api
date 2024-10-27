import './App.css';
import {
  BrowserRouter as Router,
  Route,
  // Link,
  Routes
} from "react-router-dom";
import Edit from './Components/Edit';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Sigininlog from './Components/Sigininlog';
import Signupuplog from './Components/Signupuplog';
import Costlog from './Components/Costlog';
import Loginlog from './Components/Loginlog';
import Home from './Components/Home';
import PasswordRecovery from './Components/PasswordRecovery';
import PasswordRecoverycost from './Components/PasswordRecoverycost';
import Homepage from './Components/Homepage';
import Aboutus from './Components/Aboutus';
import Services from './Components/Services';
import Contactus from './Components/Contactus';

function App() {
  
  return (
    <>
        <Router>
          <div id='background' style={{height:'750px'}}>
          <Home/>
          <Routes>
            <Route path="logincost/user/:id/edit" element={<Edit/>}></Route>
            <Route path="signup" element={<Signup/>}></Route>
            <Route path="signin" element={<Signin/>}></Route>
            <Route path="logincost" element={<Costlog/>}></Route>
            <Route path="loginlog" element={<Loginlog/>}></Route>
            <Route path="signinlog" element={<Sigininlog/>}></Route>
            <Route path="signuplog" element={<Signupuplog/>}></Route>
            <Route path="passwordrecoverlog" element={<PasswordRecovery/>}></Route>
            <Route path="passwordrecovercost" element={<PasswordRecoverycost/>}></Route>
            <Route path="homepage" element={<Homepage/>}></Route>
            <Route path="aboutus" element={<Aboutus/>}></Route>
            <Route path="services" element={<Services/>}></Route>
            <Route path="contactus" element={<Contactus/>}></Route>
          </Routes>
          </div>
          {/* <div style={{background:'white',height:'100px'}}></div> */}

        </Router>
    </>
  );
}

export default App;