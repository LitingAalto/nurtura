import path from 'path';

const dataDir = path.join(process.cwd(), 'data'); // Absolute path to data directory

// Helper function to read JSON data from a file
async function readData(dataType, id) {
    const filePath = path.join(dataDir, dataType, `${id}.json`);
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading ${dataType} data for ID ${id}:`, error);
        return null; // Or throw the error, depending on your needs
    }
}

// Helper function to write JSON data to a file
async function writeData(dataType, id, data) {
    const filePath = path.join(dataDir, dataType, `${id}.json`);
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8'); // Pretty-print JSON
    } catch (error) {
        console.error(`Error writing ${dataType} data for ID ${id}:`, error);
        throw error; // Re-throw the error to be handled upstream
    }
}

// Helper function to get all data from a directory
async function getAllData(dataType) {
    const dirPath = path.join(dataDir, dataType);
    try {
        const files = await fs.readdir(dirPath);
        const data = await Promise.all(
            files.map(async (file) => {
                const filePath = path.join(dirPath, file);
                const fileContent = await fs.readFile(filePath, 'utf-8');
                return JSON.parse(fileContent);
            })
        );
        return data;
    } catch (error) {
        console.error(`Error reading all ${dataType} data:`, error);
        return [];
    }
}

export async function getUser(id) {
    return await readData('users', id);
}

export async function getAllUsers() {
    return await getAllData('users');
}

export async function createUser(id, userData) {
    await writeData('users', id, userData);
}

export async function updateUser(id, userData) {
    await writeData('users', id, userData);
}

export async function deleteUser(id) {
    const filePath = path.join(dataDir, 'users', `${id}.json`);
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.error(`Error deleting user data for ID ${id}:`, error);
        throw error;
    }
}

export async function getPlant(id) {
    return await readData('plants', id);
}

export async function getAllPlants() {
    return await getAllData('plants');
}

export async function createPlant(id, plantData) {
    await writeData('plants', id, plantData);
}

export async function updatePlant(id, plantData) {
    await writeData('plants', id, plantData);
}

export async function deletePlant(id) {
    const filePath = path.join(dataDir, 'plants', `${id}.json`);
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.error(`Error deleting plant data for ID ${id}:`, error);
        throw error;
    }
}
