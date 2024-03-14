import { FormEvent, useRef, useState } from 'react';
import { fetchFact } from './api';
import { fetchAge } from './api/fetch-age';
import {
  AppRoot,
  Button,
  Div,
  FormField,
  FormItem,
  Paragraph,
  Textarea,
} from '@vkontakte/vkui';

function App() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [name, setName] = useState('');
  const [isValidName, setIsValidName] = useState(true);
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

  function validateName(value: string) {
    setIsValidName(/^[a-zA-Z]+$/.test(value));
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
    validateName(evt.currentTarget.value.trim());
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(fetchAndSetAge, 3000);
  }

  function onNameSubmit(evt: FormEvent) {
    evt.preventDefault();
    validateName(name);
    fetchAndSetAge();
  }

  return (
    <AppRoot>
      <Div>
        <form action=''>
          <FormItem>
            <Textarea getRef={textareaRef} name='fact'></Textarea>
          </FormItem>
          <FormItem>
            <Button onClick={onFactSubmit} type='submit'>
              Получить факт
            </Button>
          </FormItem>
        </form>
        <form action=''>
          <FormItem
            bottom={isValidName ? '' : 'Имя введено некорректно'}
            status={isValidName ? 'default' : 'error'}>
            <Textarea
              onChange={onNameChange}
              name='name'
              value={name}></Textarea>
          </FormItem>
          <FormItem>
            <Paragraph>Возраст: {age}</Paragraph>
          </FormItem>
          <FormItem>
            <Button type='submit' onClick={onNameSubmit}>
              Отправить
            </Button>
          </FormItem>
        </form>
      </Div>
    </AppRoot>
  );
}

export default App;
