import { calendar_v3 } from '@googleapis/calendar';
import { CalendarType } from '../contexts/StoreContext/types/calendar';
import { ScheduleType } from '../contexts/StoreContext/types/schedule';
import { DateTimeInputs } from '../contexts/CalendarConfigContext/index.model';

import { uniqueID } from '../util/reusable-funcs';
import { getRandomColorOption } from '../util/color-options';

import { ExternalHolidayEvent } from '../components/MainContent/index.model';

interface ConvertExternalEventsToCalendarProps {
	holidayCalendar: calendar_v3.Schema$Events
	calendarId: number
	regionCode: string
}

export async function getHolidayEventsByRegion(region: string) {
	const holidayApiUrl = `${process.env.REACT_APP_HOLIDAY_API_URL}/${region}`;
	if (!holidayApiUrl) {
		throw new Error('REACT_APP_HOLIDAY_API_URL env var not set.');
	}

	try {
		const response = await fetch(holidayApiUrl);
		const data = await response.json();

		return data;
	} catch (error) {
		console.error('Error fetching holiday events:', error);
		throw error;
	}
}

export function convertExternalEventsToCalendar(props: ConvertExternalEventsToCalendarProps) {
	const { holidayCalendar, regionCode, calendarId } = props;
	const {
		summary,
		timeZone,
		description,
	} = holidayCalendar;

	return {
		id: calendarId,
		name: summary || '',
		colorOption: getRandomColorOption(),
		selected: true,
		removable: true,
		type: 'holiday' as CalendarType,
		timeZone: timeZone || '',
		description: description || '',
		region: regionCode,
	}
}


function extractLocation(organizer: { displayName?: string | null } | null | undefined): string {
	if (!organizer?.displayName) return '';
	const splitResult = organizer.displayName.split(' in ');
	return splitResult.length > 1 ? splitResult[1].trim() : '';
}


function formatDateToString(dateObj: Date): string {
	const year = dateObj.getFullYear();
	const month = String(dateObj.getMonth() + 1).padStart(2, '0');
	const day = String(dateObj.getDate()).padStart(2, '0');
	return `${year}${month}${day}`;
}


function parseHolidayDate(start: { date?: string | null; dateTime?: string | null } | undefined): string {
	if (!start) return '';
	
	if (start.date) {
		const [year, month, day] = start.date.split('-').map(Number);
		const dateObj = new Date(year, month - 1, day);
		dateObj.setDate(dateObj.getDate() - 1);
		return formatDateToString(dateObj);
	}
	
	if (start.dateTime) {
		const dateObj = new Date(start.dateTime);
		dateObj.setDate(dateObj.getDate() - 1);
		return formatDateToString(dateObj);
	}
	
	return '';
}


export function convertExternalEventToSchedule(
	externalEvent: ExternalHolidayEvent,
) {
	const locationName = extractLocation(externalEvent.organizer);
	const date = parseHolidayDate(externalEvent.start);
	const holidayStartTime = 24; // 6:00 AM
	const holidayEndTime = 24;

	return {
		id: uniqueID(),
		title: externalEvent.summary || '',
		description: externalEvent.description || '',
		calendarId: externalEvent.calendarId,
		calendarType: 'holiday' as CalendarType,
		dateTime: {
			allDay: false,
			once: true,
			date,
			time: { start: holidayStartTime, end: holidayEndTime },
		} as DateTimeInputs,
		type: 'event' as ScheduleType,
		isExternal: true,
		location: locationName,
		colorOption: getRandomColorOption(),
	}
}