import { Fact } from '../types';

export async function fetchFact(): Promise<Fact> {
  return fetch('https://catfact.ninja/fact').then((response) =>
    response.json()
  );
}
