import {Header} from '../../components/Header'
import background from '../../assets/background.png'
import './styles.css'
import ItemList from '../../components/ItemList'

import { useState } from 'react'

function App() {

  const [user, setUSer] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [repos, setRepos] = useState('')

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json()

    console.log(newUser)

    if(newUser.name){
      const{avatar_url, name, bio, login} = newUser
      setCurrentUser({avatar_url, name, bio, login})

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await reposData.json()

      console.log(newRepos)

      if (newRepos.length) {
        setRepos(newRepos);
      }
      
  }
}

  return (
    <div className="App">
      <Header />
      <div className='container'>
       <img src={background} alt='background' className='background'/>
      <div className='info'>
        <div className=''>                        
          <input 
          value={user} 
          onChange={event => setUSer(event.target.value)} 
          className='user' 
          placeholder='@usuário'>
            </input> 
          <button onClick={handleGetData}>Buscar</button>
          {currentUser?.name ? <> 
          <div className='perfil'>
            <img src={currentUser.avatar_url} className='fotoUser' alt='foto usuario'/>
            <div>
              <h3>{currentUser.name}</h3>
              <span>@{currentUser.login}</span>
              <p>{currentUser.bio}</p>
            </div>
          </div>
          <hr />
           </>: null}
           {repos?.length ? (
          <div>
            <h4 className='repositorio'>Repositórios</h4>
            {repos.map((repo) => (
            <ItemList title={repo.full_name} description={repo.description} />
                ))}
          </div>
          ): null}
        </div>
      </div>
    </div>
    </div>

  );
}


export default App;
