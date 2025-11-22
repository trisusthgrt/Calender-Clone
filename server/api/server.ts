import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';

import { calendar_v3 } from '@googleapis/calendar/build/v3'
import { calendar } from '@googleapis/calendar';

type Calendar = calendar_v3.Calendar;

const {
	API_KEY,
	CALENDAR_ID,
	CALENDAR_REGION
} = process.env;
const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());

// Get the available holiday events based on the region value.
// By default the region value is en.usa. 
app.get('/api/:region', async function (req: Request, res: Response) {
	const { region } = req.params;
	try {
		const calendarInstance: Calendar = calendar({
			version: 'v3',
			auth: API_KEY,
		});

		// Set date range to fetch holidays for a wider period (5 years back and 5 years forward)
		const now = new Date();
		const timeMin = new Date(now.getFullYear() - 5, 0, 1).toISOString(); // 5 years ago, January 1st
		const timeMax = new Date(now.getFullYear() + 5, 11, 31).toISOString(); // 5 years ahead, December 31st

		const allEvents: calendar_v3.Schema$Event[] = [];
		let nextPageToken: string | undefined = undefined;

		// Handle pagination to get ALL holidays (Google Calendar API returns max 2500 per page)
		do {
			const holidayListParams: calendar_v3.Params$Resource$Events$List = {
				calendarId: `${region || CALENDAR_REGION}#${CALENDAR_ID}`,
				timeMin: timeMin,
				timeMax: timeMax,
				maxResults: 2500, // Maximum per page
				singleEvents: true, // Expand recurring events
				pageToken: nextPageToken, // Get next page if available
			};

			const apiResponse = await calendarInstance.events.list(holidayListParams);
			const eventResults: calendar_v3.Schema$Events = apiResponse.data;
			
			if (eventResults.items) {
				allEvents.push(...eventResults.items);
			}
			
			nextPageToken = eventResults.nextPageToken || undefined;
		} while (nextPageToken);

		// Return all events combined
		const eventResults: calendar_v3.Schema$Events = {
			items: allEvents,
			summary: `Holidays for ${region || CALENDAR_REGION}`,
		};
		
		res.json(eventResults);
	} catch (error) {
		console.error('Error fetching holiday events:', error);
		res.status(400).json({ 
			error: 'Failed to fetch holiday events',
			message: error instanceof Error ? error.message : 'Unknown error',
			details: error
		});
	}
})

app.listen(PORT, () => {
	console.log(`Running the server on port ${PORT}`)
})