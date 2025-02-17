import './App.css'
import { useState, useEffect } from 'react';
import CardList from './components/CardList';
import Scroll from './components/Scroll';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorFallBack';
import Searcher from './components/Searcher';

function App() {

  const [contacts, setContacts] = useState([]);
  const [ageFilter, setAgeFilter] = useState(0);
  const [searchField, setSearchField] = useState('');
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  }
  const onAgeFilterChange = (event) => {
    setAgeFilter(event.target.value);
  };

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=20')
      .then(response => response.json())
      .then(contacts => setContacts(contacts.results));
  }, [])

  const searchedContacts = contacts.filter(contact => {
    const fullName = (contact.name['first'] + ' ' + contact.name['last']).toLowerCase();
    const age = contact.dob.age;
    return fullName.includes(searchField.toLowerCase()) && age > ageFilter;
  });

  const onAZ = () => {
    let az = contacts.sort((a, b) => {
      return (a.name['first'] + " " +
        a.name['last']).localeCompare(b.name['first'] + " " + b.name['last'])
    })
    setContacts([...az]); //clone the list
  }
  const onZA = () => {
    let za = contacts.sort((a, b) => {
      return (b.name['first'] + " " +
        b.name['last']).localeCompare(a.name['first'] + " " + a.name['last'])
    })
    setContacts([...za]); //clone the list
  }



  return (
    <div className='tc'>
      <header>
        <h1 className='f1'>My contacts</h1>
      </header>
      {contacts.length === 0 ? <h2 className='f2'>Loading...</h2> :
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Searcher
            searchChange={onSearchChange}
            ageFilterChange={onAgeFilterChange}
            az={onAZ}
            za={onZA}
          />
          <Scroll>
            <CardList contacts={searchedContacts} />
          </Scroll>
        </ErrorBoundary>
      }
      <footer>
        <hr /><p>Desarrollo de Software para Dispositivos Moviles.
          {new Date().getFullYear()}</p>
      </footer>
    </div>

  );
}

export default App;
