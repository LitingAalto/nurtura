import { Observable } from '@nativescript/core';
import { calculatePregnancyWeek } from '../utils/date.util';
import { getRandomTip } from '../data/tips.data';

export class PregnancyModel extends Observable {
    private _dueDate: Date;
    private _currentWeek: number;
    private _dailyTip: string;

    constructor(dueDate?: Date) {
        super();
        try {
            this._dueDate = dueDate || new Date();
            this._currentWeek = calculatePregnancyWeek(this._dueDate);
            this._dailyTip = getRandomTip();
        } catch (error) {
            console.error('Error initializing PregnancyModel:', error);
            // Set default values if there's an error
            this._dueDate = new Date();
            this._currentWeek = 0;
            this._dailyTip = 'Take care of yourself!';
        }
    }

    get dueDate(): Date {
        return this._dueDate;
    }

    get currentWeek(): number {
        try {
            return this._currentWeek;
        } catch (error) {
            console.error('Error getting currentWeek:', error);
            return 0;
        }
    }

    get dailyTip(): string {
        try {
            return this._dailyTip;
        } catch (error) {
            console.error('Error getting dailyTip:', error);
            return 'Take care of yourself!';
        }
    }

    refreshTip(): void {
        try {
            this._dailyTip = getRandomTip();
            this.notifyPropertyChange('dailyTip', this._dailyTip);
        } catch (error) {
            console.error('Error refreshing tip:', error);
        }
    }
}