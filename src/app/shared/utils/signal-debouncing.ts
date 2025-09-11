import { Signal } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { debounceTime } from "rxjs";

export const signalDebouncing = (signal : Signal<any>, time: number) => {
    const observabele$ = toObservable(signal);
    observabele$.pipe(debounceTime(time));
    return toSignal(observabele$);
    
}