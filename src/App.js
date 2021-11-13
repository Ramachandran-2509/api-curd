import "./App.css";
import { faBell, faEnvelope, faLaughWink, faSearch, faList } from "@fortawesome/free-solid-svg-icons";
import { createContext, useContext, useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router";
import { Link, Route, Switch, Redirect, useParams } from "react-router-dom";
const initialuserlist = [
  {
    id: 1,
    name: "Howard Barrows",
    pic: "https://cdn.fakercloud.com/avatars/HenryHoffman_128.jpg",
    details: "Optimist, Stock Market Analyst, Voyager"
  },
  {
    id: 2,
    name: "Steve Cormier",
    pic: "https://cdn.fakercloud.com/avatars/anthonysukow_128.jpg",
    details: " Dolores eum beatae sit eveniet delectus"
  },
  {
    id: 3,
    name: "Sheila Nienow",
    pic: "https://cdn.fakercloud.com/avatars/kumarrajan12123_128.jpg",
    details: "Ipsa exercitationem deserunt tenetur"
  },
  {
    id: 4,
    name: "Paulette Gutman",
    pic: "https://cdn.fakercloud.com/avatars/scottiedude_128.jpg",
    details: "Vel sequi ea temporibus voluptates"
  }
];
//creating context
const contextdata = createContext(null);
function App() {
  const [newlist, setnewlist] = useState(initialuserlist);
  //to hide/show the side navbar when the menu button on the top is clicked(for small screens)
  const [navshow, setnavshow] = useState("block");
  return (
    <div className="wholepage">
      {/*hides side nav bar when the menu button is clicked */}
      <div className="nav-bar" style={{ display: navshow }}>
        <Link className="link" to="/Dashboard">
          <div className="nav-items">
            <FontAwesomeIcon icon={faLaughWink} size="2x" /><span>Dashboard</span>
          </div>
        </Link>
        <Link className="link" to="/users">
          <div className="nav-items" >
            <FontAwesomeIcon icon={faList} size="1x" />
            List Users
          </div>
        </Link>
        <hr />
        <div className="procontainer">
          <img className="proimage" src="https://startbootstrap.github.io/startbootstrap-sb-admin-2/img/undraw_rocket.svg" />
          <div>SB Admin Pro is packed with premium features, components, and more!</div>
          <button className="probutton">Upgrade to Pro!</button>
        </div>
      </div>
      {/*creating a menubar on top */}
      <div>
        <div className="topnavbar">
          {/*when menu button is clicked, the side navbar toggles between hide/show. 
              This menu button is not available for large screens and the sidenavbar is always visible */}
          <button className="navtogglebutton" onClick={() => { navshow === "block" ? setnavshow("none") : setnavshow("block") }}><MenuIcon /></button>

          <div className="searchbarNicon">
            <input type="text" placeholder="Search for..." className="topnavsearchbar"></input>
            <button className="topnavbaricon"><FontAwesomeIcon icon={faSearch} className="topnavicon" /></button>
          </div>
          <div className="topnavrightpart">
            <div className="topnavbellicon"><FontAwesomeIcon icon={faBell} /></div>
            <div className="topnavbellicon"><FontAwesomeIcon icon={faEnvelope} /></div>
            <div className="topnavusername">douglas McGee</div>
          </div>
        </div>
        {/* providing context */}
       <contextdata.Provider value={{ newlist: newlist, setnewlist: setnewlist }}>
        <Routes />
      </contextdata.Provider>

        {/*creating a copyright content at the bottom of screen */}
        <div className="coyrightcontainer">Copyright © Your Website 2021</div>
      </div>

    </div>

  );
}
function Routes(){
  return(
    <>
     <div className="container">
          <Switch>
            <Route path="/Dashboard">
              <Dashboard />
            </Route>
            <Route path="/users">
              <Listusers />
            </Route>

            <Route path="/create-user">
              <Createuser />
            </Route>
            {/* "/:id" is dynamic, which is formed when the corresponding button is clicked */}
            <Route path="/edit-user/:id">
              <Edituser  />
            </Route>
            <Route path="/profile/:id">
              <Profile  />
            </Route>
            <Route path="/edit-profile/:id">
              <Editprofile />
            </Route>
            <Route exact path = "/">
              <Redirect to = "/Dashboard"/>
            </Route>
          </Switch>
        </div>
    </>
  )
}
//creates the dashboard page 
function Dashboard() {
  return (
    <div className="dashboard-container">
      <Link className="dashboard-content" to="/create-user">Create User</Link><br />
      <Link className="dashboard-content" to="/users">List Users</Link>
    </div>
  )
}
//creates new user
function Createuser() {
  //using context
  const {newlist, setnewlist} = useContext(contextdata);
  {/*details of new user */}
  const [newusername, setnewUsername] = useState("");
  const [newuserPic, setnewUserPic] = useState("");
  const [newuserdetails, setnewUserdetails] = useState("");
  return (
    <div className="new-input-boxes">
      {/* when a value is typed in the input box it creates new user with the typed value*/}
      <input type="text" className="input-box name-input" placeholder="user name..."
        onchange={(event) => setnewUsername(event.target.value)} />

      <input type="text" className="input-box pic-input" placeholder="user image..."
        onchange={(event) => setnewUserPic(event.target.value)} />

      <textarea rows="3"  placeholder="user details..." className="input-box"
      onchange={(event) => setnewUserdetails(event.target.value)} />
      {/*user list will be updated by adding the new user details */}
      <button className="dashboard-content input-button" onClick={() => {
        setnewlist([...newlist, { id: newlist.length + 1, name: newusername, pic: newuserPic, details: newuserdetails }]);
      }}><Link className="dashboard-content" to="/users">List Users</Link></button>

    </div>
  )
}
//lists the users with details
function Listusers() {
  //using context
  const {newlist, setnewlist} = useContext(contextdata);
  const history = useHistory();
  return (
    <div className="list-users">
      {newlist.map(({ name, pic, details, id }) =>
        <div className="card">
          <img src={pic} />
          <div className="username">{name}</div>
          <div className="profile">{details}</div>
          <div className = "list-buttons">
            {/*routes to the new path with the current id, when edit button is clicked */}
          <button onClick={() => history.push("/edit-user/" + id)}>Edit User</button>
          {/*removes the user with the current id from the list, when delete button is clicked */}
          <button className = "delete-button" 
          onClick={() => setnewlist(newlist.filter(user => user.id !== id))} >Delete User</button><br/>
          <button className = "profile-button" onClick={() => history.push("/profile/" + id)}>Profile</button>
            </div>
        </div>)}
    </div>
  )
}
//edits the user 
function Edituser() {
  //using context
  const {newlist} = useContext(contextdata);
  {/* takes the id from the dynamic path using the hook useparams */}
  const { id } = useParams();
  const user = newlist.find((user) => user.id === +id);
  const [username, setUsername] = useState(user.name);
  const [userPic, setUserPic] = useState(user.pic);
  //edits the user name and pic for the user with the path id
  newlist[id - 1].name = username;
  newlist[id - 1].pic = userPic;
  return (
    <div className="new-input-boxes">
      {/* user details are changed when the value in the input box changes */}
      <input type="text" placeholder={username} className="input-box name-input"
       onChange={(event) => setUsername(event.target.value)} />
      <input type="text" placeholder={userPic} className="input-box pic-input"
      onChange={(event) => setUserPic(event.target.value)} />
      <div>
      </div>
      <Link className="dashboard-content" to="/users">List Users</Link>
    </div>
  )
}
//provides profile information of clicked user
function Profile() {
  //using context
  const {newlist} = useContext(contextdata);
  const history = useHistory();
  const { id } = useParams();
  //finds user with the path id
  const user = newlist.find((user) => user.id === +id);
  return (
    <div className="profile-page">
      <div>{user.name}</div>
      <div>{user.details}</div>
      {/* a dynamic path is formed and page goes to that path when the button is clicked */}
      <button className="edit-profile-button"
      onClick={() => history.push("/edit-profile/" + id)}>Edit Profile</button>
    </div>
  )
}
//edits profile details
function Editprofile() {
  //using context
  const {newlist} = useContext(contextdata);
  const { id } = useParams();
  //finds user with the path id
  const user = newlist.find((user) => user.id === +id);
  const [userprofile, setUserprofile] = useState(user.details);
  //edits user details with the path id
  newlist[id - 1].details = userprofile;
  return (
    <div className="profile-page">
      <textarea rows="3"  placeholder={userprofile} className="input-box"
      onChange={(event) => setUserprofile(event.target.value)} />
      <div>{user.name}</div>
      <div>{userprofile}</div>
      <Link className="dashboard-content" to="/users">List Users</Link>
    </div>
  )

}

export default App;