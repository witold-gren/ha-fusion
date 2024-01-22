import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import dotenv from 'dotenv';
dotenv.config();

export const POST: RequestHandler = async ({ request }) => {
	try {
		const hassUrl = process.env.HASS_URL;
		const { clientId } = await request.json();

		const response = await fetch(`${hassUrl}/auth/login_flow`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				client_id: clientId,
				handler: ['homeassistant', null],
				redirect_uri: clientId
			})
		});

		const data = await response.json();
		return json(data);
	} catch (err: any) {
		error(500, err.message);
	}
};
