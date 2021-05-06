import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    // milisecond
    interval_speed: number = 1;
    running: boolean = false;
    interval_id;
    session_timer;
    session_length: number = 1000 * 60 * 15; // 15 minutes
    currentCharacter: BehaviorSubject<string> = new BehaviorSubject<string>("0");
    @ViewChild('word_per_minute', {static: true}) wpm: ElementRef;

    symbols: Array<string> = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+"
    ]

    getIntervalSpeed() {
        return this.interval_speed;
    }

    onInputChange($event) {
        // console.log($event.target.value);
        if ($event.target.value.length) {
            this.interval_speed = parseInt($event.target.value);
            this.startCounter(); 
        }
    }

    startCounter() {
        this.stopCounter();
        let i = 0;
        const self = this;
        this.running = true;
        this.interval_id = setInterval(function () {
            self.currentCharacter.next(self.getRandomCharacter());
            i++;
        }, 1000/this.interval_speed);
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

    ngOnDestroy() {}
    ngOnInit() {}

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
