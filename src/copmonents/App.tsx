import AppHeader from './app-header/app-header';
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';
import styles from './App.module.css';
import { useEffect, useState } from 'react';

function App() {
  
  const [ingredients, setIngredients] = useState([]);
  const [isLoaded, setLoading] = useState(false);
  const BASE_URL = 'https://norma.nomoreparties.space/api';

  useEffect(() => {
    fetch(`${BASE_URL}/ingredients`)
      .then(response => {
        if (response.ok) {
          setLoading(true);
            return response.json();
        }
        else
        { 
          setLoading(false);
            return Promise.reject(`Ошибка ${response.status}`);
        }
    })
      .then(res => {
          setIngredients(res.data)
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className= {styles.App}>
    <AppHeader />
    <main>
    <div className={styles.content}>
    { 
      isLoaded ? 
      <>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </> :(
        <p>Loading...</p>
      )}
    </div>
    </main>
    </div>
  );
}

export default App;