import { FormEvent, useRef, useState } from 'react';
import { fetchFact } from './api';
import { fetchAge } from './api/fetch-age';

function App() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [fetchedNames, setFetchedNames] = useState<string[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function onFactSubmit(evt: FormEvent) {
    evt.preventDefault();
    if (textareaRef.current) {
      const fact = await fetchFact().then((fact) => fact.fact);
      textareaRef.current.value = fact;
      const cursorPosition = fact.indexOf(' ');
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }

  async function fetchAndSetAge() {
    if (!fetchedNames.includes(name)) {
      const fetchedAge = await fetchAge(name);
      setAge(fetchedAge.age.toString());
      setFetchedNames([...fetchedNames, fetchedAge.name]);
    }
  }

  function onNameChange(evt: FormEvent<HTMLTextAreaElement>) {
    setName(evt.currentTarget.value.trim());
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(fetchAndSetAge, 3000);
  }

  function onNameSubmit(evt: FormEvent) {
    evt.preventDefault();
    fetchAndSetAge();
  }

  return (
    <>
      <form action=''>
        <textarea ref={textareaRef} name='fact'></textarea>
        <button onClick={onFactSubmit} type='submit'>
          Получить факт
        </button>
      </form>
      <form action=''>
        <textarea onChange={onNameChange} name='name' value={name}></textarea>
        <p>Возраст: {age}</p>
        <button type='submit' onClick={onNameSubmit}>
          Отправить
        </button>
      </form>
    </>
  );
}

export default App;
