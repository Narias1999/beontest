import people_data from '../data/people_data.json';


export class PeopleProcessing {
    getById(id: number) {
        return people_data.find((p) => p.id === id);
    }

    getAll(page = 1, pageSize = 10) {
        const validatedPage = page < 1 ? 1 : page;
        const offset = (validatedPage - 1) * pageSize;
        return {
            data: people_data.slice(offset, offset + pageSize),
            pagination: {
                page: validatedPage,
                totalPages: Math.ceil(people_data.length / pageSize),
            }
        }
    }
}
