import type { SyntheticEvent } from 'react';

import './App.scss';

function App() {
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const requestType = formData.get('request-type');
    const inputValue = formData.get('request-details');
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit} action="#">
        <label>
          <input type="radio" name="request-type" value="add" />
          Додати
        </label>

        <label>
          <input type="radio" name="request-type" value="get" />
          Отримати
        </label>

        <label>
          <input type="radio" name="request-type" value="delete" />
          Видалити
        </label>

        <input type="text" name="request-details" />
        <button type="submit">Відправити запрос</button>
      </form>
    </div>
  );
}

export default App;
