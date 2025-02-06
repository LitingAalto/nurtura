import { Observable, Frame, NavigationEntry } from '@nativescript/core';
import { PregnancyModel } from '../../models/pregnancy.model';

export class HomeViewModel extends Observable {
    private _pregnancyModel: PregnancyModel;

    constructor() {
        super();
        try {
            // Initialize with a sample due date (9 months from now)
            const dueDate = new Date();
            dueDate.setMonth(dueDate.getMonth() + 9);
            this._pregnancyModel = new PregnancyModel(dueDate);
        } catch (error) {
            console.error('Error initializing HomeViewModel:', error);
            // Initialize with default values if there's an error
            this._pregnancyModel = new PregnancyModel(new Date());
        }
    }

    get currentWeek(): number {
        try {
            return this._pregnancyModel.currentWeek;
        } catch (error) {
            console.error('Error getting currentWeek:', error);
            return 0;
        }
    }

    get dueDate(): Date {
        try {
            return this._pregnancyModel.dueDate;
        } catch (error) {
            console.error('Error getting dueDate:', error);
            return new Date();
        }
    }

    get dailyTip(): string {
        try {
            return this._pregnancyModel.dailyTip;
        } catch (error) {
            console.error('Error getting dailyTip:', error);
            return 'Remember to take care of yourself!';
        }
    }

    private navigate(pageName: string) {
        try {
            const frame = Frame.topmost();
            if (frame) {
                const navigationEntry: NavigationEntry = {
                    moduleName: `views/${pageName}/${pageName}-page`,
                    transition: {
                        name: 'slide'
                    }
                };
                frame.navigate(navigationEntry);
            }
        } catch (error) {
            console.error(`Error navigating to ${pageName}:`, error);
        }
    }

    onTrackSymptoms() {
        console.log("Track Symptoms tapped");
        // this.navigate('symptoms');
    }

    onViewCalendar() {
        console.log("Calendar tapped");
        // this.navigate('calendar');
    }

    onBabyDevelopment() {
        console.log("Baby Development tapped");
        // this.navigate('development');
    }

    onViewResources() {
        console.log("Resources tapped");
        // this.navigate('resources');
    }
}