import {
  Injectable,
  signal
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private activeRequests = new Set<string>();

  loading = signal(false);

  private showTimeout?: ReturnType<typeof setTimeout>;

  private readonly debounceTime = 150;

  show(requestId: string) {

    this.activeRequests.add(requestId);

    clearTimeout(this.showTimeout);

    this.showTimeout = setTimeout(() => {

      if (this.activeRequests.size > 0) {
        this.loading.set(true);
      }

    }, this.debounceTime);
  }

  hide(requestId: string) {

    this.activeRequests.delete(requestId);

    if (this.activeRequests.size === 0) {

      clearTimeout(this.showTimeout);

      this.loading.set(false);
    }
  }

  clear() {

    this.activeRequests.clear();

    clearTimeout(this.showTimeout);

    this.loading.set(false);
  }
}