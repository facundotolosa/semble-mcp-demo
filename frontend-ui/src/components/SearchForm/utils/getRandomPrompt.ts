const PROMPTS = [
	'all patients',
	'John Doe',
	'find every patient with the last name Smith',
	'show me Maria Garcia',
	'the first 5 patients',
	'the patient with email peter.jones@clinic.com',
	'anybody named Lee',
	'the second page of results, 2 per page',
	"I'm looking for Michael Brown",
	"search for every patient with 'garcia' in their name",
	'the details for jess.martinez@company.com',
	'the first 3 patients',
	'show me all the patients named Wilson',
	"can you find a patient with 'lopez' in their name?",
	'I need the first patient whose last name is Rodriguez',
	"find anyone with 'tech.co' in their email",
	'the first 10 patients',
	'find me Nancy Gonzalez',
	'the user with email samantha.s@work.com'
];

export const getRandomPrompt = (): string => {
	const randomIndex = Math.floor(Math.random() * PROMPTS.length);
	return PROMPTS[randomIndex];
};
