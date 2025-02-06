export function calculatePregnancyWeek(dueDate: Date): number {
    const today = new Date();
    const diffTime = Math.abs(dueDate.getTime() - today.getTime());
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return 40 - diffWeeks;
}

export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
}