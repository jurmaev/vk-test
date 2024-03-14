import { Button, FormItem, Textarea } from '@vkontakte/vkui';
import { FormEvent, useRef } from 'react';
import { fetchFact } from '../api';

export function FactForm() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

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

  return (
    <form>
      <FormItem>
        <Textarea getRef={textareaRef} name='fact'></Textarea>
      </FormItem>
      <FormItem>
        <Button onClick={onFactSubmit} type='submit'>
          Получить факт
        </Button>
      </FormItem>
    </form>
  );
}
