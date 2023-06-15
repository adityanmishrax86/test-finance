
import './App.css'




function App() {

  function login() {
    window.location.href = '/login';
  }
  

  return (
    <>
      <button onClick={login}>Login</button>

    </>
  )
}

export default App
