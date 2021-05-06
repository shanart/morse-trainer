import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    symbols: Array<string> = [
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+"
    ]

    

    private PWMToSeconds(value: number): number {
        return value / 12;
    }

    private SecondsToPWM(value: number): number {
        return value * 12;
    }
}
