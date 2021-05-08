import { Component, OnDestroy, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 


@Component({
    selector: '#app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

    // milisecond
    minimum_speed: number = 5000;
    maximum_speed: number = 1000;

    interval_speed: number = 1000;
    running: boolean = false;
    interval_id;
    currentCharacter: BehaviorSubject<string> = new BehaviorSubject<string>(this.getRandomCharacter());
    html_input_value: number = 0;
    speed: BehaviorSubject<number> = new BehaviorSubject<number>(1000);
    
    ngOnDestroy() {}
    ngOnInit() {
        this.currentCharacter.next(this.getRandomCharacter());
    }

    symbols: Array<string> = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+"
    ]

    onInputChange($event) {
        const current_value = parseInt($event.target.value);
        const speed_in_milliseconds = Math.floor((current_value/100) * this.minimum_speed);
        this.interval_speed = speed_in_milliseconds;
        this.speed.next(speed_in_milliseconds);

        if ($event.target.value.length) {
            this.startCounter(); 
        }
    }

    startCounter() {
        const self = this;
        this.stopCounter();
        let i = 0;
        this.running = true;
        this.interval_id = setInterval(function () {
            self.currentCharacter.next(self.getRandomCharacter());
            i++;
        }, this.interval_speed);
    }

    stopCounter() {
        this.currentCharacter.next("0");
        this.running = false;
        clearInterval(this.interval_id);
    }

    getRandomCharacter() {
        const randomIndex = Math.floor(Math.random() * this.symbols.length);
        return this.symbols[randomIndex];
    }

    
    startGlobalTimer() {
        
    }
    
    stopGlobalTimer() {
        
    }

    private PWMToSeconds(value: number): number {
        return value / 12;
    }

    private SecondsToPWM(value: number): number {
        return value * 12;
    }
}
''