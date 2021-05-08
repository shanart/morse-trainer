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
    symbols: Array<string> = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+"
    ]
    currentCharacter: BehaviorSubject<string> = new BehaviorSubject<string>(this.getRandomCharacter());
    html_input_value: number = 20;
    speed: BehaviorSubject<number> = new BehaviorSubject<number>(2000);

    session_timer;
    session_timer_time: number = 0;
    session_length: number = 900;
    session_timer_end: number = 900;

    ngOnDestroy() {}
    ngOnInit() {
    }

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
        this.stopCounter();
        const self = this;
        let i = 0;
        this.running = true;
        this.interval_id = setInterval(function () {
            self.currentCharacter.next(self.getRandomCharacter());
            i++;
        }, this.interval_speed);

        this.startGlobalTimer();
    }

    stopCounter() {
        // this.currentCharacter.next("0");
        this.running = false;
        clearInterval(this.interval_id);
        clearInterval(this.session_timer);
    }

    getRandomCharacter() {
        const randomIndex = Math.floor(Math.random() * this.symbols.length);
        return this.symbols[randomIndex];
    }

    
    startGlobalTimer() {
        clearInterval(this.session_timer);
        const self = this;
        this.session_timer = setInterval(function () {
            self.session_timer_end -= 1;
            if (self.session_timer_end <= 0) {
                self.stopCounter();
                self.session_timer_end = self.session_length;
            }
        }, 1000);
    }
    
    show_end_time() {
        const endtime = this.session_timer_end;
        const minutes = Math.floor(endtime/60);
        const _seconds = endtime - minutes * 60;
        const seconds = _seconds < 10? `0${_seconds}`: _seconds;
        return `${minutes} : ${seconds}`;
    }
}