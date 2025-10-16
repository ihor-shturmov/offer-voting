import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // noop
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {
      // noop
    }
  }

  getJSON<T>(key: string): T | null {
    const raw = this.get(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  setJSON(key: string, value: unknown): void {
    this.set(key, JSON.stringify(value));
  }
}
