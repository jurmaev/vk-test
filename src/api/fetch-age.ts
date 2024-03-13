import { Age } from '../types';

export async function fetchAge(name: string): Promise<Age> {
  return fetch(`https://api.agify.io?name=${name}`).then((response) =>
    response.json()
  );
}
