import { EventData, Page } from '@nativescript/core';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    // Simple initialization for now
    console.log('Home page loaded');
}