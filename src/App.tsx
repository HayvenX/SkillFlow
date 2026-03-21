import './App.scss';

import type { SyntheticEvent } from 'react';
import { useState } from 'react';

import { get, insert, remove } from '@/api';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const requestType = formData.get('request-type');
    const inputValue = formData.get('request-details');

    if (!requestType || (requestType !== 'get' && !inputValue)) return;

    switch (requestType) {
      case 'add': {
        setIsLoading(true);

        if (typeof inputValue !== 'string') {
          console.error('Невірний тип даних для додавання');
          setIsLoading(false);
          return;
        }

        const { error } = await insert(inputValue);
        if (error) console.error(error);

        setIsLoading(false);
        break;
      }
      case 'get': {
        setIsLoading(true);

        const { data, error } = await get();
        if (error) console.error(error);

        setContent(JSON.stringify(data));
        setIsLoading(false);
        break;
      }
      case 'delete': {
        setIsLoading(true);

        if (typeof inputValue !== 'string') {
          console.error('Невірний тип даних для видалення');
          setIsLoading(false);
          return;
        }

        const { error } = await remove(inputValue);
        if (error) console.error(error);

        setIsLoading(false);
        break;
      }
      default:
        console.error('Невідомий тип запиту');
    }
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

      {isLoading && <div className="loading">Завантаження...</div>}

      {content && <div className="content">{content}</div>}
    </div>
  );
}

export default App;
