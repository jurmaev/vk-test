import { Button, FormItem, Paragraph, Textarea } from '@vkontakte/vkui';
import { FormEvent, useRef, useState } from 'react';
import { fetchAge } from '../api';
import { FetchedName } from '../types';

export function AgeForm() {
  const [name, setName] = useState('');
  const [isValidName, setIsValidName] = useState(true);
  const [age, setAge] = useState('');
  const [fetchedNames, setFetchedNames] = useState<FetchedName[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function onNameChange(evt: FormEvent<HTMLTextAreaElement>) {
    const currentName = evt.currentTarget.value.trim();
    setName(currentName);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (validateName(currentName)) {
      timeoutRef.current = setTimeout(fetchAndSetAge, 3000);
    }
    setIsValidName(validateName(currentName));
  }

  function validateName(value: string) {
    return /^[a-zA-Z]+$/.test(value);
  }

  async function fetchAndSetAge() {
    if (!fetchedNames.find((fetchedName) => fetchedName.name === name)) {
      const fetchedAge = await fetchAge(name);
      setAge(fetchedAge.age.toString());
      setFetchedNames([...fetchedNames, fetchedAge]);
    } else {
      const fetchedName = fetchedNames.find(
        (fetchedName) => fetchedName.name === name
      )!;
      setAge(fetchedName.age.toString());
    }
  }

  function onNameSubmit(evt: FormEvent) {
    evt.preventDefault();
    if (validateName(name)) {
      fetchAndSetAge();
    }
    setIsValidName(validateName(name));
  }

  return (
    <form>
      <FormItem
        bottom={isValidName ? '' : 'Имя введено некорректно'}
        status={isValidName ? 'default' : 'error'}>
        <Textarea onChange={onNameChange} name='name' value={name}></Textarea>
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
  );
}
